import axios from "axios";
import { toast } from "react-hot-toast";

const API_BASE_URL = "https://farm-riders-python-implementation.onrender.com";

export async function registerUser(credentials) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/register`,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
    toast.success("Registration successful");
  } catch (error) {
    console.error("Registration failed:", error.response.data.message);
    toast.error(error.response.data.message);
    throw new Error("Registration failed");
  }
}

export async function loginUser(credentials) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
    toast.success("Login successful");
  } catch (error) {
    console.error("Login failed:", error);
    toast.error(error.response.data.message);
    throw new Error("Login failed");
  }
}
