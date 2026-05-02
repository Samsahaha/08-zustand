import { TanStackProvider } from "@/components/TanStackProvider/TanStackProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <TanStackProvider>{children}</TanStackProvider>;
}
