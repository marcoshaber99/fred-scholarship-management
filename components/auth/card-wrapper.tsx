"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-full max-w-[650px] shadow-lg rounded-lg overflow-hidden ">
      <CardHeader className="p-6">
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent className="p-6">{children}</CardContent>
      {/* {showSocial && (
        <CardFooter className="bg-gray-50 p-4 border-t border-gray-200">
          <Social />
        </CardFooter>
      )} */}
      <CardFooter className="flex justify-between items-center p-4 font-normal">
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
