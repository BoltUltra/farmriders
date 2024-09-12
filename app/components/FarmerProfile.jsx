"use client";

import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { z } from "zod";
import { Cloudinary } from "@cloudinary/url-gen";
import { CloudinaryUploadWidget } from ".";
import Image from "next/image";
import { document, step1, step2, vehicle } from "../public/images/webp";
import { logo } from "@/public/images/webp";
import {
  driverProfileUpdate,
  farmersProfileUpdate,
} from "../services/dataService";
import { useRouter } from "next/navigation";

// Updated validation schema
const profileSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  gender: z.enum(["male", "female"], {
    errorMap: () => ({ message: "Gender is required" }),
  }),
  nin: z.string().length(11, "NIN must be 11 digits"),
  drivers_license_number: z.string(),
  documents: z.object({
    selfie_photo: z.string().url().optional(),
    nin_photo: z.string().url().optional(),
    drivers_license_photo: z.string().url().optional(),
  }),
});

const step1Schema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  gender: z.enum(["male", "female"], {
    errorMap: () => ({ message: "Gender is required" }),
  }),
  nin: z.string().length(11, "NIN must be 11 digits"),
  documents: z.object({
    selfie_photo: z.string().url().optional(),
  }),
});

const step2Schema = z.object({
  drivers_license_number: z.string(),
  documents: z.object({
    nin_photo: z.string().url().optional(),
    drivers_license_photo: z.string().url().optional(),
  }),
});

const FarmerProfile = () => {
  const [publicId, setPublicId] = useState("");
  const [cloudName] = useState("hzxyensd5");
  const [uploadPreset] = useState("aoh4fpwm");
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    nin: "",
    drivers_license_number: "",
    documents: {
      selfie_photo: "",
      nin_photo: "",
      drivers_license_photo: "",
    },
  });

  const [uploadState, setUploadState] = useState({
    selfie_photoUploaded: false,
    nin_photoUploaded: false,
    drivers_license_photoUploaded: false,
  });

  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
  });

  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const myImage = cld.image(publicId);

  const [showVehicleInfo, setShowVehicleInfo] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "file") {
      // No longer handling file changes directly
    } else if (name === "has_vehicle") {
      setShowVehicleInfo(checked);
      setFormData((prevState) => ({
        ...prevState,
        has_vehicle: checked,
        vehicle_info: checked ? prevState.vehicle_info : {},
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const [uploadStep, setUploadStep] = useState(0);

  const handleFileUpload = (path) => (url) => {
    const keys = path.split(".");
    setFormData((prevState) => {
      const updatedState = { ...prevState };
      let current = updatedState;

      // Navigate to the correct nested object
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!current[key]) {
          current[key] = {};
        }
        current = current[key];
      }

      // Set the URL at the correct field
      current[keys[keys.length - 1]] = url;

      return updatedState;
    });

    // Update upload state
    setUploadState((prevState) => ({
      ...prevState,
      [`${path.replace(/\./g, "_")}_Uploaded`]: true,
    }));

    // Move to the next upload step
    setUploadStep(uploadStep + 1);
    toast.success("File uploaded successfully");
  };

  const handleNextStep = () => {
    let validationResult;

    // Validate based on the current step
    if (currentStep === 1) {
      validationResult = step1Schema.safeParse(formData);
    } else if (currentStep === 2) {
      validationResult = step2Schema.safeParse(formData);
    }

    if (!validationResult.success) {
      validationResult.error.errors.forEach((error) =>
        toast.error(error.message)
      );
      return;
    }

    // Move to the next step if validation passes
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const validationResult = profileSchema.safeParse(formData);
    if (!validationResult.success) {
      validationResult.error.errors.forEach((error) => {
        toast.error(error.message);
      });
      return;
    }

    const credentials = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      gender: formData.gender,
      nin: formData.nin,
      drivers_license_number: formData.drivers_license_number,
      documents: {
        selfie_photo: formData.documents.selfie_photo,
        nin_photo: formData.documents.nin_photo,
        drivers_license_photo: formData.documents.drivers_license_photo,
      },
    };

    setIsLoading(true);

    try {
      const data = await farmersProfileUpdate(credentials);
      console.log("Profile Updated:", data);
      toast.success("Profile Updated!");
      localStorage.clear();
      router.push("/auth/login");
      // router.push("/dashboard/dash");
    } catch (error) {
      console.error("Profile Update failed:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
    // // Log form data to console
    // console.log("Form data:", credentials);
    // toast.success("Form data logged to console");
  };

  return (
    <>
      <Toaster />
      <Image src={logo} className="w-20 mx-auto py-10" alt="image" />
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 w-full md:px-20 px-5 my-10"
      >
        {currentStep === 1 && (
          <div className="grid md:grid-cols-2 items-center">
            <div>
              <p>Step 1 of 3</p>
              <h3 className="mb-5 font-bold text-3xl">
                Let&apos;s get to know you
              </h3>
              <Image src={step1} className="w-3/4" alt="image" />
            </div>
            <div className="md:px-20 space-y-5">
              <div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="selfie_photo" className="form-label pb-2">
                    Profile Picture
                  </label>
                  {uploadStep === 0 && (
                    <div className="flex">
                      <div className="bg-input px-10 py-3 rounded-lg flex">
                        {!uploadState.selfie_photoUploaded ? (
                          <CloudinaryUploadWidget
                            title={"Upload Selfie Photo"}
                            uwConfig={{
                              cloudName: "hzxyensd5",
                              uploadPreset: "aoh4fpwm",
                            }}
                            onUploadSuccess={(url) =>
                              handleFileUpload("documents.selfie_photo")(url)
                            }
                          />
                        ) : (
                          <p>
                            Image uploaded: {formData.documents.selfie_photo}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {uploadStep !== 0 && (
                  <div className="">
                    {formData.documents.selfie_photo && (
                      <Image
                        src={formData.documents.selfie_photo}
                        alt="Selfie Image"
                        width={100}
                        height={100}
                        className="rounded-full"
                      />
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="firstname" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  className="form-input"
                  placeholder="First name"
                  value={formData.firstname}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="lastname" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  className="form-input"
                  placeholder="Last name"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <select
                  name="gender"
                  id="gender"
                  className="form-input"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="nin" className="form-label">
                  NIN
                </label>
                <input
                  type="text"
                  name="nin"
                  id="nin"
                  className="form-input"
                  placeholder="NIN"
                  value={formData.nin}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div className="grid md:grid-cols-2 items-center">
            <div>
              <p>Step 3 of 3</p>
              <h3 className="mb-5 font-bold text-3xl">
                License & Verification
              </h3>
              <Image src={document} className="w-3/4" alt="image" />
            </div>
            <div className="md:px-20 space-y-5">
              <div className="flex flex-col space-y-2">
                <label htmlFor="drivers_license_number" className="form-label">
                  Driver&apos;s License Number
                </label>
                <input
                  type="text"
                  name="drivers_license_number"
                  id="drivers_license_number"
                  className="form-input"
                  placeholder="Driver's License Number"
                  value={formData.drivers_license_number}
                  onChange={handleChange}
                />
              </div>

              <div>
                <div className="flex flex-col space-y-2">
                  <label
                    htmlFor="drivers_license_photo"
                    className="form-label pb-2"
                  >
                    Driver&apos;s License Photo
                  </label>
                  {uploadStep === 1 && (
                    <div className="bg-[#c4eec8] h-40 flex items-center justify-center rounded-2xl border-2 border-primary border-dashed">
                      {!uploadState.drivers_license_photoUploaded ? (
                        <CloudinaryUploadWidget
                          title={"Upload Driver's License Photo"}
                          uwConfig={{
                            cloudName: "hzxyensd5",
                            uploadPreset: "aoh4fpwm",
                          }}
                          onUploadSuccess={(url) =>
                            handleFileUpload("documents.drivers_license_photo")(
                              url
                            )
                          }
                        />
                      ) : (
                        <p>
                          Image uploaded:{" "}
                          {formData.documents.drivers_license_photo}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {uploadStep !== 1 && (
                  <div className="bg-[#c4eec8] h-40 flex items-center justify-center rounded-2xl border-2 border-primary border-dashed">
                    {formData.documents.drivers_license_photo ? (
                      <p>File Uploaded</p>
                    ) : (
                      <p>Upload Driver&apos;s License Photo</p>
                    )}
                  </div>
                )}
              </div>

              <div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="nin_photo" className="form-label pb-2">
                    NIN Photo
                  </label>
                  {uploadStep === 2 && (
                    <div className="bg-[#c4eec8] h-40 flex items-center justify-center rounded-2xl border-2 border-primary border-dashed">
                      {!uploadState.nin_photoUploaded ? (
                        <CloudinaryUploadWidget
                          title={"Upload NIN Photo"}
                          uwConfig={{
                            cloudName: "hzxyensd5",
                            uploadPreset: "aoh4fpwm",
                          }}
                          onUploadSuccess={(url) =>
                            handleFileUpload("documents.nin_photo")(url)
                          }
                        />
                      ) : (
                        <p>Image uploaded: {formData.documents.nin_photo}</p>
                      )}
                    </div>
                  )}
                </div>

                {uploadStep !== 2 && (
                  <div className="bg-[#c4eec8] h-40 flex items-center justify-center rounded-2xl border-2 border-primary border-dashed">
                    {formData.documents.nin_photo ? (
                      <p>File Uploaded</p>
                    ) : (
                      <p>Upload NIN Photo</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-2 ">
          <div></div>
          <div className="flex justify-between space-x-5 md:px-20">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevStep}
                className="bg-gray-500 text-white px-4 py-3 rounded w-full"
              >
                Previous
              </button>
            )}
            {currentStep < 2 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className={`bg-green-500 text-white px-4 py-3 rounded w-full ${
                  isLoading
                    ? "opacity-50 cursor-not-allowed flex items-center justify-center"
                    : ""
                }`}
              >
                {isLoading ? <div class="loader"></div> : "Next"}
              </button>
            ) : (
              <button
                type="submit"
                className={`bg-green-500 text-white px-4 py-3 rounded w-full ${
                  isLoading
                    ? "opacity-50 cursor-not-allowed flex items-center justify-center"
                    : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? <div class="loader"></div> : "Submit"}
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default FarmerProfile;
