// API configuration
const config = {
  // Base URL for API requests
  API_BASE_URL: "", // Empty because we're using Vite's proxy

  // Helper function to build API URLs
  buildUrl: (endpoint) => {
    const cleanEndpoint = endpoint.replace(/^\/?(api\/)?/, "");
    return `/api/${cleanEndpoint}`;
  },

  // Common headers for API requests
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },

  // Helper function to make API requests
  async fetchApi(endpoint, options = {}) {
    try {
      const url = this.buildUrl(endpoint);
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.headers,
          ...options.headers,
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `API request failed: ${response.statusText}`
        );
      }

      return response.status === 204 ? null : response.json();
    } catch (error) {
      throw error;
    }
  },
};

export default config;
