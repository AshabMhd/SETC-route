import api from "../api";

class AuthService {
  async login(username, password) {
    try {
      const response = await fetch(api.buildUrl("auth/login"), {
        method: "POST",
        headers: {
          ...api.headers,
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Invalid credentials");
      }

      const data = await response.json();

      if (!data.token) {
        throw new Error("Authentication failed: No token received");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      return data;
    } catch (error) {
      console.error("[Auth Error]:", error);
      throw new Error(
        error.message ||
          "Unable to sign in. Please check your credentials and try again."
      );
    }
  }

  signout() {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    } catch (error) {
      console.error("[Signout Error]:", error);
      window.location.href = "/";
    }
  }

  getCurrentUser() {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch (error) {
      this.signout();
      return null;
    }
  }

  getToken() {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;

      // Check if token is expired
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.exp * 1000 < Date.now()) {
        this.signout();
        return null;
      }

      return token;
    } catch (error) {
      console.error("[GetToken Error]:", error);
      this.signout();
      return null;
    }
  }

  isAuthenticated() {
    return Boolean(this.getToken());
  }

  getAuthHeaders() {
    const token = this.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}

export const authService = new AuthService();
