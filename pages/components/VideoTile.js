import { React, useEffect, useRef } from "react";
import {
  useHMSActions,
  useHMSStore,
  selectLocalPeer,
  selectCameraStreamByPeerID,
} from "@100mslive/react-sdk";

function VideoTile({ peer, isLocal }) {
  const hmsActions = useHMSActions();
  const videoRef = useRef(null);
  const videoTrack = useHMSStore(selectCameraStreamByPeerID(peer.id));
  const localPeer = useHMSStore(selectLocalPeer);
  const stage = localPeer.roleName === "stage";
  const viewer = localPeer.roleName === "viewer";

  useEffect(() => {
    (async () => {
      if (videoRef.current && videoTrack) {
        if (videoTrack.enabled) {
          await hmsActions.attachVideo(videoTrack.id, videoRef.current);
        } else {
          await hmsActions.detachVideo(videoTrack.id, videoRef.current);
        }
      }
    })();
  }, [hmsActions, videoTrack]);
  return (
    <div>
      <video
        ref={videoRef}
        autoPlay={true}
        playsInline
        muted={false}
        style={{ width: "calc(85vw - 100px)" }}
        className={`object-cover h-40 w-40 rounded-lg mt-12 shadow-lg" ${
          isLocal ? "mirror" : ""
        }`}
      ></video>
    </div>
  );
}

export default VideoTile;
