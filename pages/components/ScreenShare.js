import {React, useEffect, useRef} from "react";
import {
  useHMSActions,
  useHMSStore,
  selectScreenShareByPeerID,
} from "@100mslive/react-sdk";

const ScreenShare = ({peer, isLocal }) => {
  const hmsActions = useHMSActions();
  const screenRef = useRef(null);
  const screenTrack = useHMSStore(selectScreenShareByPeerID(peer.id));
  
  useEffect(() => {
      (async () => {
        if (screenRef.current && screenTrack) {
          if (screenTrack.enabled) {
            await hmsActions.attachVideo(screenTrack.id, screenRef.current);
          } else {
            await hmsActions.detachVideo(screenTrack.id, screenRef.current);
          }
        }
      })();
    }, [screenTrack]);

  return (
      <div className="flex h-full">
      <div className="relative h-full">
        <video
          ref={screenRef}
          autoPlay={true}
          playsInline
          muted={false}
          className={`h-full ${
            isLocal ? "" : ""
          }`}
        ></video>
      </div>
    </div>

  );

}


export default ScreenShare;
