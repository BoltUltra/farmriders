"use client";

export const checkAuthToken = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authToken");
    return !!token;
  }
  return false;
};
