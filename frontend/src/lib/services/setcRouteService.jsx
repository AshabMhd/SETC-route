import api from "../api";
import { authService } from "./auth";

const handleExtractionError = (error, searchText) => {
  if (error?.message) {
    throw new Error(`Location extraction failed: ${error.message}`);
  }
  return { from: searchText, to: "" };
};

export const setcRouteService = {
  async getRoutes(searchText = "") {
    try {
      let from = "";
      let to = "";
      const trimmedSearchText = searchText ? searchText.trim() : "";

      if (trimmedSearchText) {
        try {
          const extractionResponse = await fetch(
            "http://localhost:5500/extract",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ text: trimmedSearchText }),
            }
          );

          if (extractionResponse.ok) {
            const extractedData = await extractionResponse.json();
            from = extractedData.from || "";
            to = extractedData.to || "";
          }
        } catch (error) {
          ({ from, to } = handleExtractionError(error, trimmedSearchText));
        }
      }

      // Build query parameters
      const queryParams = new URLSearchParams();
      if (from) queryParams.append("from", from.trim());
      if (to) queryParams.append("to", to.trim());

      // Fetch custom routes from our database
      const customRoutesEndpoint = `setcroutes${
        queryParams.toString() ? `?${queryParams.toString()}` : ""
      }`;

      const customRoutesResponse = await fetch(
        api.buildUrl(customRoutesEndpoint),
        {
          headers: {
            ...api.headers,
            ...authService.getAuthHeaders(),
          },
        }
      );

      if (!customRoutesResponse.ok) {
        throw new Error(
          "Failed to connect to the route management service. Please try again later."
        );
      }

      const customRoutes = await customRoutesResponse.json();

      // For admin panel, only show custom routes
      if (!searchText) {
        return Array.isArray(customRoutes) ? customRoutes : [];
      }

      // Try to get routes from data.gov.in API
      let apiRoutes = [];
      if (from || to) {
        try {
          const apiKey =
            "579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b";
          const govApiUrl = new URL(
            "https://api.data.gov.in/resource/1f10d3eb-a425-4246-8800-3f72bf7ad2b0"
          );

          govApiUrl.searchParams.append("api-key", apiKey);
          govApiUrl.searchParams.append("format", "json");
          if (from) {
            govApiUrl.searchParams.append(
              "filters[from]",
              from.trim().toUpperCase()
            );
          }
          if (to) {
            govApiUrl.searchParams.append(
              "filters[to]",
              to.trim().toUpperCase()
            );
          }

          const response = await fetch(govApiUrl.toString(), {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });

          if (response.ok) {
            const data = await response.json();
            apiRoutes = data.records || [];
          } else {
            throw new Error(
              `External API error: ${response.status} - ${response.statusText}`
            );
          }
        } catch (apiError) {
          throw new Error(
            `Failed to fetch routes from external API: ${apiError.message}`
          );
        }
      }

      const routes = [...apiRoutes, ...customRoutes];

      if (routes.length === 0 && searchText) {
        throw new Error(
          "No routes found matching your search criteria. Please try different locations."
        );
      }

      return routes;
    } catch (error) {
      throw error.message
        ? error
        : new Error("Unable to fetch routes. Please try again later.");
    }
  },

  async addRoute(routeData) {
    try {
      const response = await fetch(api.buildUrl("setcroutes"), {
        method: "POST",
        headers: {
          ...api.headers,
          ...authService.getAuthHeaders(),
        },
        body: JSON.stringify(routeData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `Failed to add route: ${response.status} - ${response.statusText}`
        );
      }

      return response.json();
    } catch (error) {
      throw new Error(`Error adding route: ${error.message}`);
    }
  },

  async updateRoute(id, routeData) {
    if (!id) {
      throw new Error("Route ID is required for updating");
    }

    try {
      // Clean up the data before sending
      const cleanData = { ...routeData };
      delete cleanData._id;
      delete cleanData.__v;
      delete cleanData.createdAt;
      delete cleanData.updatedAt;

      const response = await fetch(api.buildUrl(`setcroutes/${id}`), {
        method: "PUT",
        headers: {
          ...api.headers,
          ...authService.getAuthHeaders(),
        },
        body: JSON.stringify(cleanData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `Failed to update route: ${response.statusText}`
        );
      }

      return data;
    } catch (error) {
      throw new Error(`Error updating route: ${error.message}`);
    }
  },

  async deleteRoute(id) {
    if (!id) {
      throw new Error("Route ID is required for deletion");
    }

    try {
      const response = await fetch(api.buildUrl(`setcroutes/${id}`), {
        method: "DELETE",
        headers: {
          ...api.headers,
          ...authService.getAuthHeaders(),
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `Failed to delete route: ${response.status} - ${response.statusText}`
        );
      }

      return response.json();
    } catch (error) {
      throw new Error(`Error deleting route: ${error.message}`);
    }
  },
};
