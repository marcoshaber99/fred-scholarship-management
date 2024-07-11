// components/auth/header.tsx

import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center space-y-4">
      <div className="flex items-center space-x-4">
        <Image
          src="/fu_logo.png"
          alt="Frederick Sports Club Logo"
          width={350}
          height={350}
          className="rounded-full"
        />
      </div>
      <p className="text-slate-600 text-lg font-medium">
        Scholarship Management Portal
      </p>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
