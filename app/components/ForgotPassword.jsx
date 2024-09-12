"use client";

import Image from "next/image";
import { logo, forgotPassword } from "@/public/images/webp";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { toast, Toaster } from "react-hot-toast";

// Zod schema for validation
const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const result = forgotPasswordSchema.safeParse(formData);

    if (result.success) {
      toast.success("Password reset email sent!");
      console.log("Form data: ", formData); // Log the email (for password reset)
    } else {
      result.error.errors.forEach((error) => {
        toast.error(error.message); // Display validation errors
      });
    }
  };

  return (
    <>
      <Toaster />
      <section className="md:grid grid-cols-2 py-10 md:pl-20 px-5 relative pt-10 items-center">
        <div className="text-center md:max-w-lg w-full">
          <div className="">
            <Image
              src={logo}
              className="w-20 mx-auto mb-10"
              alt="Farm Riders Logo"
            />
            <h3 className="font-bold md:text-3xl text-2xl">Forgot Password?</h3>
            <p className="text-sm max-w-sm mx-auto">
              All good. Enter your registered email or phone number and we’ll
              send you a code to reset.
            </p>
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

            <button
              type="submit"
              className="text-white bg-primary w-full py-3 rounded-lg"
            >
              Send Reset Link
            </button>
          </form>

          <div className="mt-10">
            <p>
              Remember your password?{" "}
              <Link href="/auth/login" className="underline underline-offset-4">
                Login
              </Link>
            </p>
          </div>
        </div>
        <div className="md:block hidden">
          <Image src={forgotPassword} className="" alt="Forgot Password" />
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
