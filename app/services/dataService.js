import axios from "axios";
import { toast } from "react-hot-toast";

const API_BASE_URL = "https://farm-riders-python-implementation.onrender.com";

export async function driverProfileUpdate(credentials) {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.patch(
      `${API_BASE_URL}/user/driver/profile`,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Profile Update failed:",
      error.response?.data?.message || error.message
    );
    toast.error(error.response?.data?.message || "Profile Update failed");
    throw new Error("Profile Update failed");
  }
}

export async function farmersProfileUpdate(credentials) {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.patch(
      `${API_BASE_URL}/user/profile`,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Profile Update failed:",
      error.response?.data?.message || error.message
    );
    toast.error(error.response?.data?.message || "Profile Update failed");
    throw new Error("Profile Update failed");
  }
}
