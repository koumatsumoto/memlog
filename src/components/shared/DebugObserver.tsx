import { useEffect } from "react";
import { useRecoilSnapshot } from "recoil";

export const DebugObserver = () => {
  const snapshot = useRecoilSnapshot();
  useEffect(() => {
    console.log("[app/state] debug", snapshot);
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.log(node.key, snapshot.getLoadable(node));
    }
  }, [snapshot]);

  return null;
};
