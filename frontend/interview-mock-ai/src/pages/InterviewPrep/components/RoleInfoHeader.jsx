import React from "react";

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}) => {
  return (
    <div className="bg-white relative overflow-hidden rounded-xl shadow-sm">
      <div className="container mx-auto px-6 md:px-10">
        <div className="h-[220px] flex flex-col justify-center relative z-10">
          <div className="flex items-start">
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">{role}</h2>
                  <p className="text-lg text-gray-600 mt-2">{topicsToFocus}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-6">
            <div className="text-sm font-semibold text-white bg-black px-4 py-2 rounded-full shadow-md">
                Experience: {experience} {experience === 1 ? "Year" : "Years"}
            </div>
            <div className="text-sm font-semibold text-white bg-black px-4 py-2 rounded-full shadow-md">
                {questions} Q&A
            </div>
            <div className="text-sm font-semibold text-white bg-black px-4 py-2 rounded-full shadow-md">
                Last Updated: {lastUpdated}
            </div>
            </div>

        </div>

        {/* Animated Blobs */}
        <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
          <div className="absolute w-36 h-36 bg-lime-400 blur-[70px] top-0 left-0 animate-blob1 opacity-40" />
          <div className="absolute w-36 h-36 bg-teal-400 blur-[70px] top-10 right-10 animate-blob2 opacity-40" />
          <div className="absolute w-28 h-28 bg-cyan-300 blur-[60px] bottom-0 left-1/3 animate-blob3 opacity-40" />
          <div className="absolute w-28 h-28 bg-fuchsia-300 blur-[60px] bottom-5 right-5 animate-blob1 opacity-30" />
        </div>
      </div>
    </div>
  );
};

export default RoleInfoHeader;
