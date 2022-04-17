import { React, useState, useEffect } from "react";
import { selectIsConnectedToRoom, useHMSActions, useHMSStore } from "@100mslive/react-sdk";
import Room from "./Room";

function Login() {
  

  const endpoint = "https://prod-in.100ms.live/hmsapi/videome.app.100ms.live/";
  
  const hmsActions = useHMSActions();
  const [inputValues, setInputValues] = useState("");
  const [selectValues, setSelectValues] = useState("viewer");
  const isConnected = useHMSStore(selectIsConnectedToRoom)


  useEffect(() => {
    window.onunload = () => {
      hmsActions.leave();
    };
  }, [hmsActions]);

  const handleInputChange = (e) => {
    setInputValues(e.target.value);
  };
  const handleSelect = (e) => {
    setSelectValues(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fetchtoken = async () => {
      const response = await fetch(`${endpoint}api/token`, {
        method: "POST",
        body: JSON.stringify({
          user_id: "1234",
          role: selectValues, //stage
          type: "app",
          room_id: "625c74c4903d857ab8eccace",
        }),
      });
      const { token } = await response.json();
      return token;
    };
    const token = await fetchtoken(inputValues)
    hmsActions.join({
      userName: inputValues,
      authToken: token,
      settings: {
        isAudioMuted: true,
      },
    });
  };

  return (
    <>
    {!isConnected? (

    <div className=" h-screen flex justify-center items-center bg-slate-800">
      <div className=" flex flex-col gap-6 mt-8">
        <input
          type="text"
          placeholder="John Doe"
          value={inputValues}
          onChange={handleInputChange}
          className=" focus:outline-none flex-1 px-2 py-3 rounded-md text-black border-2 border-blue-600"
        />
        <select
          type="text"
          placeholder="Select Role"
          value={selectValues}
          onChange={handleSelect}
          className=" focus:outline-none flex-1 px-2 py-3 rounded-md text-black border-2 border-blue-600"
        >
          <option>stage</option>
          <option>viewer</option>
          </select>
        <button
          className="flex-1 text-white bg-blue-600 py-3 px-10 rounded-md"
          onClick={handleSubmit}
        >
          Join
        </button>
      </div>
    </div>
    ):(
    <Room/>
    )}
    </>
  );
}

export default Login;
