"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loading } from "../components";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const currentUser = localStorage.getItem("currentUser");

    if (token && currentUser) {
      const parsedUser = JSON.parse(currentUser);

      if (parsedUser.has_completed_profile) {
        setIsAuthenticated(true);

        if (parsedUser.role === "driver") {
          router.push("/dashboard/driver");
        } else if (parsedUser.role === "farmers") {
          router.push("/dashboard/farmer");
        } else if (parsedUser.role === "aggregator") {
          router.push("/dashboard/farmer");
        }
      } else {
        if (parsedUser.role === "driver") {
          router.push("/complete-profile/driver");
        } else if (parsedUser.role === "farmer") {
          router.push("/complete-profile/farmer");
        } else if (parsedUser.role === "aggregator") {
          router.push("/complete-profile/farmer");
        }
      }
    } else {
      setIsAuthenticated(false);
      router.push("/auth/login");
    }

    setLoading(false);
  }, [router]);

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
