"use client";

import { useSelectedLayoutSegment } from "next/navigation";

const RenderParallelRoute = ({ children }: { children: React.ReactNode }) => {
  const selectedLayout = useSelectedLayoutSegment();

  return <div>{selectedLayout === "events" ? <></> : children}</div>;
};

export default RenderParallelRoute;
