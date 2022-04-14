import React from "react";

function Login() {
  return (
    <div className=" h-screen flex justify-center items-center bg-slate-800">
      <div className=" flex flex-col gap-6 mt-8">
        <input
          type="text"
          placeholder="John Doe"
          className=" focus:outline-none flex-1 px-2 py-3 rounded-md text-black border-2 border-blue-600"
        />
        <input
          type="text"
          placeholder="Select Role"
          className=" focus:outline-none flex-1 px-2 py-3 rounded-md text-black border-2 border-blue-600"
        />
        <button className="flex-1 text-white bg-blue-600 py-3 px-10 rounded-md">
          Join
        </button>
      </div>
    </div>
  );
}

export default Login;
