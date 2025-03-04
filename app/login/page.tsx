import React from "react";
import "./index.css";
import Image from "next/image";
import LoginForm from "./components/Form";
const page = () => {
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

        <div className="p-12 w-11/12 sm:w-9/12 flex flex-col gap-y-3 sm:gap-y-4">
          <p className="pb-6 text-3xl sm:text-4xl md:text-5xl font-[Unlock]">
            Login
          </p>
          <LoginForm />
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
