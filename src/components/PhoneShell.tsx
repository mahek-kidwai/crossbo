import type { ReactNode } from "react";

export function PhoneShell({ children }: { children: ReactNode }) {
  return (
    <div className="device-stage">
      <div className="phone">{children}</div>
    </div>
  );
}
