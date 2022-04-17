import React from "react";
import {
  useHMSActions,
  useHMSStore,
  selectPeers,
  selectLocalPeer,
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
  selectPermissions,
  selectIsLocalScreenShared,
} from "@100mslive/react-sdk";

function Controls({ switches }) {
  const hmsActions = useHMSActions();
  const localPeer = useHMSStore(selectLocalPeer);
  const stage = localPeer.roleName === "stage";
  const peers = useHMSStore(selectPeers);
  const isLocalAudioEnabled = useHMSStore(selectIsLocalAudioEnabled);
  const isLocalVideoEnabled = useHMSStore(selectIsLocalVideoEnabled);
  const isLocalScreenShared = useHMSStore(selectIsLocalScreenShared);
  let toggler = false;

  const SwitchAudio = async () => {
    //toggle audio enabled
    await hmsActions.setLocalAudioEnabled(!isLocalAudioEnabled);
  };
  const ScreenShare = async () => {
    //toggle screenshare enabled
    await hmsActions.setScreenShareEnabled(!isLocalScreenShared);
  };
  const SwitchVideo = async () => {
    //toggle video enabled
    await hmsActions.setLocalVideoEnabled(!isLocalVideoEnabled);
  };

  const ExitRoom = () => {
    hmsActions.leave();
    //exit a room
  };

  const permissions = useHMSStore(selectPermissions);

  const endRoom = async () => {
    //end the meeting
    try {
      const lock = false; // A value of true disallow rejoins
      const reason = "Meeting is over";
      await hmsActions.endRoom(lock, reason);
    } catch (error) {
      // Permission denied or not connected to room
      console.error(error);
    }
  };

  return (
    <div className=" w-full h-full flex flex-row gap-2 justify-center items-center text-white font-semibold">
      <button
        className=" uppercase px-5 py-2 hover:bg-blue-600"
        onClick={SwitchVideo}
      >
        {isLocalVideoEnabled ? "Off Video" : "On Video"}
      </button>
      <button
        className=" uppercase px-5 py-2 hover:bg-blue-600"
        onClick={SwitchAudio}
      >
        {isLocalAudioEnabled ? "Off Audio" : "On Audio"}
      </button>
      {stage ? (
        <>
          <button
            className=" uppercase px-5 py-2 hover:bg-blue-600"
            onClick={ScreenShare}
          >
            Screen Share
          </button>
          {permissions.endRoom ? (
            <button
              className=" uppercase px-5 py-2 hover:bg-blue-600"
              onClick={endRoom}
            >
              Exit Meeting
            </button>
          ) : null}
        </>
      ) : (
        <>
          <button
            className=" uppercase px-5 py-2 hover:bg-blue-600"
            onClick={ExitRoom}
          >
            Exit Meeting
          </button>
        </>
      )}
      <button
        className=" uppercase px-5 py-2 hover:bg-blue-600"
        onClick={() => {
          switches(!toggler);
          toggler = true;
        }}
      >
        Switch view
      </button>
    </div>
  );
}

export default Controls;
