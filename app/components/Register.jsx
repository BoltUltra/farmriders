"use client";

import Image from "next/image";
import { logo } from "@/public/images/webp";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { toast, Toaster } from "react-hot-toast";
import { Eye, EyeSlash } from "iconsax-react";
import { register } from "../public/images/webp";
import { registerUser } from "../services/authService";
import { useRouter } from "next/navigation";

const registerSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    phone_number: z.string().min(11, "Phone number must be 11 digits"),
    role: z.enum(["farmers", "aggregator", "driver"], {
      errorMap: () => ({ message: "Role is required" }),
    }),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    cPassword: z.string(),
  })
  .refine((data) => data.password === data.cPassword, {
    path: ["cPassword"],
    message: "Passwords do not match",
  });

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    phone_number: "",
    role: "",
    password: "",
    cPassword: "",
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

    const validationResult = registerSchema.safeParse(formData);
    if (!validationResult.success) {
      validationResult.error.errors.forEach((error) => {
        toast.error(error.message);
      });
      return;
    }

    const formattedPhone = formData.phone_number.replace(/^0/, "+234");

    const credentials = {
      email: formData.email,
      phone_number: formattedPhone,
      role: formData.role,
      password: formData.password,
    };

    setIsLoading(true);

    try {
      const data = await registerUser(credentials);
      console.log("Registration successful:", data);
      toast.success("Registration successful!");
      router.push("/auth/login");
    } catch (error) {
      console.error("Registration failed:", error);
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
        <div className="text-center md:max-w-lg">
          <div className="">
            <Image src={logo} className="w-20 mx-auto mb-10" />
            <h3 className="font-bold md:text-3xl text-2xl">Join Farm Riders</h3>
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

            <div className="flex flex-col space-y-2">
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
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="role" className="form-label">
                Role
              </label>
              <div className="form-input focus:outline-primary">
                <select
                  name="role"
                  id="role"
                  className="w-full bg-transparent outline-none"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="">Role</option>
                  <option value="farmers">Farmer</option>
                  <option value="aggregator">Aggregator</option>
                  <option value="driver">Driver</option>
                </select>
              </div>
            </div>

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

            <div className="flex flex-col space-y-2 relative">
              <label htmlFor="cPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="cPassword"
                id="cPassword"
                className="form-input"
                placeholder="********"
                value={formData.cPassword}
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

            <button
              type="submit"
              className={`text-white bg-primary w-full py-3 rounded-lg ${
                isLoading
                  ? "opacity-50 cursor-not-allowed flex items-center justify-center"
                  : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? <div className="loader"></div> : "Register"}
            </button>
          </form>

          <div className="mt-10">
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-[1px] w-full bg-gray-200"></div>
              <p>or</p>
              <div className="h-[1px] w-full bg-gray-200"></div>
            </div>

            <p>
              Already have an account?{" "}
              <Link href="/auth/login" className="underline underline-offset-4">
                Login
              </Link>
            </p>
          </div>
        </div>
        <div className="md:block hidden">
          <Image src={register} className="" />
        </div>
      </section>
    </>
  );
};

export default Register;
