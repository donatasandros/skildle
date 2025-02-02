import { FloatingPaths } from "@/components/background-paths";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen py-24 relative px-20">
      <div className="absolute inset-0 opacity-10 -z-[1]">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>
      {children}
    </div>
  );
}
