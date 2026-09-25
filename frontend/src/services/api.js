const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL;

console.log("API BASE URL:", API_BASE_URL);

const request = async (endpoint, options = {}) => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
            ...options,

            headers: {
                "Content-Type": "application/json",

                ...(token && {
                    Authorization: `Bearer ${token}`
                }),

                ...options.headers,
            },
        }
    );

    console.log("REQUEST URL:", `${API_BASE_URL}${endpoint}`);
    console.log("STATUS:", response.status);
    console.log(
        "CONTENT TYPE:",
        response.headers.get("content-type")
    );

    // Read response as text first
    const text = await response.text();

    console.log("RAW RESPONSE:", text);

    // Convert JSON only when there is actually a response
    let data = {};

    if (text) {
        try {
            data = JSON.parse(text);
        } catch (error) {
            console.error("Invalid JSON response:", text);
            throw new Error("Server returned invalid JSON");
        }
    }

    if (!response.ok) {
        throw new Error(
            data.message || "API request failed"
        );
    }

    return data;
};

export const api = {

    get: (endpoint) => {
        return request(endpoint);
    },

    post: (endpoint, data) => {
        return request(endpoint, {
            method: "POST",
            body: JSON.stringify(data),
        });
    },

    put: (endpoint, data) => {
        return request(endpoint, {
            method: "PUT",
            body: JSON.stringify(data),
        });
    },

    delete: (endpoint) => {
        return request(endpoint, {
            method: "DELETE",
        });
    },

};