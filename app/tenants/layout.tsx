import { FilePlus2, History } from "lucide-react";

import NavBar from "@/components/molecules/navbar";

export default function TenantLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navOptions = [
    {
      icon: FilePlus2,
      link: "/invoice",
    },
    {
      icon: History,
      link: "/invoice/history",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-start w-full min-w-screen h-full min-h-screen">
      {/* <NavBar data={navOptions} /> */}
      {children}
    </div>
  );
}
