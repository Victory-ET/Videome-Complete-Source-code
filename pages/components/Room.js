import React from "react";
import Controls from "./RoomControls.js/Controls";
import {
  useHMSActions,
  selectHMSMessages,
  useHMSStore,
  selectLocalPeer,
  selectPeers,
} from "@100mslive/react-sdk";

import VideoTile from "./VideoTile";
import VideoSpaces from "./VideoSpaces";
import ScreenShare from "./ScreenShare";

function Room() {
  const localPeer = useHMSStore(selectLocalPeer);
  const stage = localPeer.roleName === "stage";
  const viewer = localPeer.roleName === "viewer";
  const peers = useHMSStore(selectPeers);
  const hmsActions = useHMSActions();
  const allMessages = useHMSStore(selectHMSMessages); // get all messages
  // hmsActions.sendBroadcastMessage("hello"); // send a message
  const [inputValues, setInputValues] = React.useState("");
  const [visible, isVisible] = React.useState(false);
  const handleInputChange = (e) => {
    setInputValues(e.target.value);
  };

  const sendMessage = () => {
    hmsActions.sendBroadcastMessage(inputValues);
    setInputValues("");
  };

  const setVisibility =(dat)=>{
    isVisible(dat)
  }

  return (
    <div className=" relative h-screen flex justify-center items-center px-12 bg-slate-800 flex-row gap-8 overflow-hidden">
      <div className=" bg-slate-600 shadow-md w-3/5 rounded-2xl">
        <span className="flex flex-col w-full h-full">
          <div className="flex justify-center items-center w-full rounded-2xl">
            {/* Share screen */}
            {stage
              ? null
              : peers &&
                peers
                  .filter((peer) => !peer.isLocal)
                  .map((peer) => {
                    return (
                      <>
                        <ScreenShare isLocal={false} peer={peer} />
                      </>
                    );
                  })}
          </div>
          <span className=" h-2/5 w-full flex flex-col gap-8 py-3 px-5">
            <div className=" flex flex-row w-full gap-28">
              <div className=" text-white w-3/5">
                <h3 className=" text-4xl font-black">Live</h3>
                <h2 className=" text-2xl font-semibold">
                  Live Conference meeting
                </h2>
                <span className="text-2xl mt-4">
                  Welcome {localPeer && localPeer.name}
                </span>
                {/* display users name */}
              </div>
              <div className=" h-40 rounded-xl w-32 flec justify-center items-center">
                {stage
                  ? localPeer && <VideoTile peer={localPeer} isLocal={true} />
                  : peers &&
                    peers
                      .filter((peer) => !peer.isLocal)
                      .map((peer) => {
                        return (
                          <>
                            <VideoTile isLocal={false} peer={peer} />
                          </>
                        );
                      })}
                {/* Room owner video chat */}
              </div>
            </div>
            <div className="w-max px-4 bg-slate-500 h-12 rounded-md z-20">
              {/* Controls */}
              <Controls switches={setVisibility} />
            </div>
          </span>
        </span>
      </div>
      <span className=" z-10 rounded-md w-1/4 h-5/6">
        <div className=" relative h-full w-full pb-20">
          {/* Chat interface */}
          <div className=" relative w-full h-full bg-slate-700 overflow-y-scroll">
            {allMessages.map((msg) => (
              <div
                className="flex flex-col gap-2 bg-slate-900 m-3 py-2 px-2 rounded-md"
                key={msg.id}
              >
                <span className="text-white text-2xl font-thin opacity-75">
                  {msg.senderName}
                  {console.log(msg.time)}
                </span>
                <span className="text-white text-xl">{msg.message}</span>
              </div>
            ))}
          </div>
          <div className=" absolute w-full rounded-2xl bottom-0 bg-slate-900 py-3 px-5 flex flex-row gap-4">
            <input
              type="text"
              placeholder="Write a Message"
              value={inputValues}
              onChange={handleInputChange}
              required
              className=" focus:outline-none flex-1 px-2 py-3 rounded-md text-white bg-slate-900"
            />
            <button
              className=" btn flex-1 text-white bg-blue-600 py-3 px-10 rounded-md"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </span>
      {/* section for attendees videos chat interface */}
      {visible ? (
        <div className=" absolute h-full w-1/2 top-0 right-0 bg-slate-900 z-10 py-3 px-6 grid grid-cols-3 gap-3 overflow-y-auto">
          {localPeer && <VideoSpaces peer={localPeer} isLocal={true} />}
          {peers &&
            peers
              .filter((peer) => !peer.isLocal)
              .map((peer) => {
                return (
                  <>
                    <VideoSpaces isLocal={false} peer={peer} />
                  </>
                );
              })}
        </div>
      ) : null}
    </div>
  );
}

export default Room;
