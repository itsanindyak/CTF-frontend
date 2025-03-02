import React from "react";
import "./index.css";
import Image from "next/image";

interface tableRowData {
  position: number;
  team: string;
  points: string;
}

const page = () => {
  const tableData: tableRowData[] = [
    { position: 1, team: "ThunderHub", points: "450" },
    { position: 2, team: "SkyNet", points: "420" },
    { position: 3, team: "BlazeCrew", points: "390" },
    { position: 4, team: "EchoPulse", points: "360" },
    { position: 5, team: "FrostByte", points: "340" },
    { position: 6, team: "QuantumLeap", points: "320" },
    { position: 7, team: "SolarFlare", points: "300" },
    { position: 8, team: "NeonWave", points: "280" },
    { position: 9, team: "GigaForce", points: "260" },
    { position: 10, team: "PixelStorm", points: "240" },
    { position: 11, team: "VortexSync", points: "220" },
    { position: 12, team: "IronPeak", points: "200" },
    { position: 13, team: "CloudRiser", points: "180" },
    { position: 14, team: "AquaPulse", points: "160" },
    { position: 15, team: "StarForge", points: "140" },
    { position: 16, team: "LunarShift", points: "120" },
    { position: 17, team: "FireGrid", points: "100" },
    { position: 18, team: "WindChaser", points: "80" },
    { position: 19, team: "EarthCore", points: "60" },
    { position: 20, team: "CosmoLink", points: "40" },
  ];

  return (
    <div className="h-fit bg-amber-50 p-10 ">
      <div className="flex flex-col items-center justify-center ">
        <div className="w-full m-[50px] text-black flex justify-center gap-x-3">
          <Image
            src="/coin.png"
            alt="logo"
            width={100}
            height={100}
            className="h-15 w-15"
          />
          <p className=" text-4xl sm:text-5xl md:text-6xl font-[Unlock]">
            LeaderBoard
          </p>
        </div>
        <div className="max-w-[350px] sm:max-w-xl md:max-w-4xl w-full bg-style rounded-lg relative  overflow-hidden shadow-xl">
          {/* Table container with scroll functionality */}
          <div className="max-h-[600px] overflow-y-auto custom-scrollbar pb-8 font-[Unlock]">
            <table className="w-full border-collapse rounded-lg">
              <thead className="sticky top-0 z-10 bg-[#43392C] rounded-lg ">
                <tr>
                  <th className="py-4 px-6 text-center text-amber-50 text-sm md:text-xl ">
                    Position
                  </th>
                  <th className="py-4 px-6 text-center text-amber-50 text-sm md:text-xl   ">
                    Team
                  </th>
                  <th className="py-4 px-6 text-center text-amber-50 text-sm md:text-xl  ">
                    Points
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b px-8 text-center text-sm md:text-lg  hover:bg-amber-100/50 transition-colors"
                  >
                    <td className="py-3 px-6 text-black font-light">
                      {row.position}
                    </td>
                    <td className="py-3 px-6 text-black ">{row.team}</td>
                    <td className="py-3 px-6 text-black ">{row.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
