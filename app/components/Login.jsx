"use client";

import Image from "next/image";
import { login, logo, signup } from "@/public/images/webp";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { toast, Toaster } from "react-hot-toast";
import { Eye, EyeSlash } from "iconsax-react";
import { loginUser } from "../services/authService";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationResult = loginSchema.safeParse(formData);
    if (!validationResult.success) {
      validationResult.error.errors.forEach((error) => {
        toast.error(error.message);
      });
      return;
    }

    const credentials = {
      email: formData.email,
      password: formData.password,
    };

    setIsLoading(true);

    try {
      const data = await loginUser(credentials);
      console.log("Login successful:", data);
      if (data.success && data.data.token) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("currentUser", JSON.stringify(data.data));

        const currentUser = data.data;

        if (
          currentUser.role === "driver" && // Driver Check
          currentUser.has_completed_profile
        ) {
          router.push("/dashboard");
          toast.success("Login successful!");
        } else if (
          currentUser.role === "driver" &&
          !currentUser.has_completed_profile
        ) {
          router.push("/complete-profile/driver");
        } else if (
          currentUser.role === "farmers" && //Farmer Check
          currentUser.has_completed_profile
        ) {
          router.push("/dashboard");
          toast.success("Login successful!");
        } else if (
          currentUser.role === "farmers" &&
          !currentUser.has_completed_profile
        ) {
          router.push("/complete-profile/farmer");
        } else if (
          currentUser.role === "aggregator" && //Aggregator Check
          currentUser.has_completed_profile
        ) {
          router.push("/dashboard");
          toast.success("Login successful!");
        } else if (
          currentUser.role === "aggregator" &&
          !currentUser.has_completed_profile
        ) {
          router.push("/complete-profile/farmer");
        }

        toast.success("Login successful!");
      } else {
        toast.error("Login failed.");
      }
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Toaster />
      <section className="md:grid grid-cols-2 py-10 md:pl-20 px-5 relative pt-10 items-center">
        <div className="text-center md:max-w-lg w-full">
          <div className="">
            <Image src={logo} className="w-20 mx-auto mb-10" />
            <h3 className="font-bold md:text-3xl text-2xl">
              Login to Farm Riders
            </h3>
            <p className="text-sm">Please enter your details</p>
          </div>

          <form className="text-left mt-10 space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* <div className="flex flex-col space-y-2">
              <label htmlFor="phone_number" className="form-label">
                Phone
              </label>
              <input
                type="text"
                name="phone_number"
                id="phone_number"
                className="form-input"
                placeholder="Enter your phone number"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </div> */}

            <div className="flex flex-col space-y-2 relative">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="form-input"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
              />
              <div
                className="absolute right-3 top-10 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeSlash size="24" color="#555555" />
                ) : (
                  <Eye size="24" color="#555555" />
                )}
              </div>
            </div>
            <Link
              href="/auth/forgot-password"
              className="underline underline-offset-4 flex justify-end"
            >
              Forgot Password?
            </Link>
            <button
              type="submit"
              className={`text-white bg-primary w-full py-3 rounded-lg ${
                isLoading
                  ? "opacity-50 cursor-not-allowed flex items-center justify-center"
                  : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? <div class="loader"></div> : "Login"}
            </button>
          </form>

          <div className="mt-10">
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-[1px] w-full bg-gray-200"></div>
              <p>or</p>
              <div className="h-[1px] w-full bg-gray-200"></div>
            </div>

            <p>
              Don't have an account?{" "}
              <Link
                href="/auth/sign-up"
                className="underline underline-offset-4"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
        <div className="md:block hidden">
          <Image src={login} className="" />
        </div>
      </section>
    </>
  );
};

export default Login;
