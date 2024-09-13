import Image from "next/image";

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center space-y-6 py-8">
      <div className="flex items-center justify-center">
        <Image
          src="/logo.svg"
          alt="Frederick Sports Club Logo"
          width={120}
          height={120}
          className="rounded-full"
        />
      </div>
      <p className="text-lg">Scholarship Management Portal</p>
      <p className="text-muted-foreground text-sm  font-normal">{label}</p>
    </div>
  );
};
