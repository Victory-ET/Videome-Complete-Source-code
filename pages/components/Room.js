import React from "react";
import Controls from "./RoomControls.js/Controls";

function Room() {
  return (
    <div className=" h-screen flex justify-center items-center px-12 bg-slate-800 flex-row gap-8">
      <div className=" h-5/6 bg-slate-600 shadow-md w-3/5 rounded-2xl">
        <span className="flex flex-col w-full h-full">
          <div className=" h-3/5 bg-slate-50 w-full rounded-2xl">
            {/* Share screen */}
          </div>
          <span className=" h-2/5 w-full flex flex-col gap-8 py-3 px-5">
            <div className=" flex flex-row w-full gap-28">
              <div className=" text-white w-3/5">
                <h3 className=" text-4xl font-black">Live</h3>
                <h2 className=" text-2xl">Live Conference meeting</h2>
              </div>
              <div className=" h-40 rounded-xl w-32 border border-black">
                {/* Room owner video chat */}
              </div>
            </div>
            <div className="w-max px-4 bg-slate-500 h-12 rounded-md">
              {/* Controls */}
              <Controls/>
            </div>
          </span>
        </span>
      </div>
      <span className=" z-10 rounded-md w-1/4 h-5/6">
        <div className=" relative h-full w-full">
          {/* Chat interface */}
          <div className=" relative w-full h-full bg-slate-700"></div>
          <div className=" absolute w-full rounded-2xl bottom-0 bg-slate-900 py-3 px-5 flex flex-row gap-4">
            <input
              type="text"
              placeholder="Write a Message"
              className=" focus:outline-none flex-1 px-2 py-3 rounded-md text-white bg-slate-900"
            />
            <button className=" btn flex-1 text-white bg-blue-600 py-3 px-10 rounded-md">
              Send
            </button>
          </div>
        </div>
      </span>
    </div>
  );
}

export default Room;
