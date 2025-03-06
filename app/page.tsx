"use client";
import React, { useEffect } from "react";
import "./index.css";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/register");
    }
  }, [router]); // Runs only once after the component mounts

  return (
    <div className=" pb-7 relative min-h-screen  flex flex-row overflow-hidden bg font-[Unlock]">
      <div className=" pt-4 w-11/12 lg:w-9/12 flex flex-col items-center gap-y-2 bg-[#F5F0E8] rounded-br-4xl">
        <div className="my-8 flex flex-col md:flex-row w-8/12 md:w-full justify-center items-center gap-x-5 gap-y-2.5">
          <Image src="/Xpedition.png" width={200} height={200} alt="logo" />

          <div className="w-full md:w-fit flex justify-end gap-x-2 md:gap-x-5">
            <p>By</p>
            <Image
              src="/sccse_logo.png"
              width={120}
              height={120}
              alt="logo"
              className=""
            />
          </div>
        </div>
        <div className="flex flex-col w-full h-full justify-center items-center gap-y-4">
          <Link href="/leaderboard" className="w-6/12 sm:w-7/12">
            <Button
              size="lg"
              className="w-full bg-[#f5f5dc] text-2xl sm:text-4xl text-amber-900 border border-amber-800 hover:bg-amber-100 px-8 py-2 sm:py-8 rounded-md font-medium transition-all"
            >
              Day 1
            </Button>
          </Link>

          <Link href="/day2" className="w-6/12 sm:w-7/12">
            <Button className="w-full bg-[#f5f5dc] text-2xl sm:text-4xl text-amber-900 border border-amber-800 hover:bg-amber-100 px-8 py-2 sm:py-8 rounded-md font-medium transition-all">
              Day 2
            </Button>
          </Link>
        </div>
      </div>

      <div className="invisible lg:visible absolute top-[40%] left-[65%] md:right-[20%] w-[150px] md:w-[250px] ">
        <Image
          src="/Group 17.png"
          width={100}
          height={100}
          alt="map"
          className="h-auto w-full"
        />
        <div className="absolute -top-[45%] -right-[45%] w-[120px] md:w-[160px] ">
          <Image
            src="/treasure_box .png"
            width={100}
            height={100}
            alt="treasure_box"
            className="h-auto w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
