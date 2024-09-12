"use client";

import Image from "next/image";
import { home, logo } from "@/public/images/webp";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  return (
    <>
      <section className="md:max-w-2xl mx-auto text-center h-screen flex items-center justify-center md:px-0 px-5">
        <div>
          <Image src={logo} className="w-10 mx-auto" alt="image" />
          <h3 className="md:text-5xl text-4xl font-semibold mb-5">
            Welcome <br /> to Farm Riders
          </h3>
          <Image src={home} className="md:w-3/4 mx-auto" alt="image" />
          <div className="space-y-4 mt-5">
            <h4 className="font-bold md:text-2xl text-xl">
              Elevating harvests to highways
            </h4>
            <p>
              Connect, transport, and trade with ease. Farm Riders links
              farmers, aggregators, and drivers for seamless logistics and
              resource buying
            </p>
          </div>
          <button
            className="bg-primary text-white px-20 py-3 rounded-lg mt-10"
            onClick={() => router.push("/auth/sign-up")}
          >
            Get Started
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;
