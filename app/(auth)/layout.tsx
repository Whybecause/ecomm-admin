import React from "react";

export default function AutLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-center h-full">{children}</div>;
}
