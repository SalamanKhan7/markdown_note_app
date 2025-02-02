import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://markdown-apis.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const markdownFileApis = {
  add: async (markdown) => {
    try {
      const response = await apiClient.post("/api/notes", {
        content: markdown,
      });
      return response.data;
    } catch (error) {
      console.error("Error adding note:", error);
      throw error;
    }
  },
  getAll: async () => {
    try {
      const response = await apiClient.get("/api/notes");
      return response.data;
    } catch (error) {
      console.error("Error fetching departments:", error);
      throw error;
    }
  },
  checkGrammer: async (text) => {
    try {
      const response = await apiClient.post("/api/grammar/check", {
        content: text,
      });
      return response.data;
    } catch (error) {
      console.error("Error adding department:", error);
      throw error;
    }
  },
};
