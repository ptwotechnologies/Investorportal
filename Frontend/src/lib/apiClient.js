// API Client Configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Global API Client
class ApiClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.defaultHeaders = {
            "Content-Type": "application/json",
        };
    }

    // Set authorization token
    setAuthToken(token) {
        this.defaultHeaders["Authorization"] = `Bearer ${token}`;
    }

    // Remove authorization token
    removeAuthToken() {
        delete this.defaultHeaders["Authorization"];
    }

    // Get token from localStorage
    getStoredToken() {
        if (typeof window !== "undefined") {
            return localStorage.getItem("auth-token");
        }
        return null;
    }

    // Build URL with query parameters
    buildUrl(endpoint, params) {
        const url = new URL(endpoint, this.baseURL);
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.append(key, value);
            });
        }
        return url.toString();
    }

    // Main request method
    async request(endpoint, config = {}) {
        const {
            method = "GET",
            body,
            headers = {},
            params,
        } = config;

        // Add stored token if available
        const token = this.getStoredToken();
        if (token && !this.defaultHeaders["Authorization"]) {
            this.defaultHeaders["Authorization"] = `Bearer ${token}`;
        }

        const url = this.buildUrl(endpoint, params);
        
        const fetchOptions = {
            method,
            headers: {
                ...this.defaultHeaders,
                ...headers,
            },
            credentials: 'include', // Include cookies for session-based auth
        };

        // Add body for POST, PUT, PATCH requests
        if (body && method !== "GET") {
            fetchOptions.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(url, fetchOptions);
            
            // Parse response
            let data;
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else {
                data = await response.text();
            }

            // Handle errors
            if (!response.ok) {
                // Check if the response contains an error message
                const errorMessage = data?.error || data?.message || `Request failed with status ${response.status}`;
                throw new Error(errorMessage);
            }

            return data;
        } catch (error) {
            throw error;
        }
    }

    // Convenience methods
    async get(endpoint, params) {
        return this.request(endpoint, { method: "GET", params });
    }

    async post(endpoint, body, headers) {
        return this.request(endpoint, { method: "POST", body, headers });
    }

    async put(endpoint, body, headers) {
        return this.request(endpoint, { method: "PUT", body, headers });
    }

    async patch(endpoint, body, headers) {
        return this.request(endpoint, { method: "PATCH", body, headers });
    }

    async delete(endpoint) {
        return this.request(endpoint, { method: "DELETE" });
    }
}

// Create and export a singleton instance
export const apiClient = new ApiClient(API_URL);

// Export the class for testing or creating custom instances
export default ApiClient;