import { LucideProps } from "lucide-react";
import Link from "next/link";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type NavBarValueDataType = {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  link: string;
};

const NavBar = ({ data }: { data: NavBarValueDataType[] }) => {
  return (
    <nav className="flex fixed top-0 py-3 pl-3 pr-10 bg-slate-100 w-full h-[65px] shadow-lg z-50 items-center justify-end gap-6">
      {data.map((ele) => (
        <Link
          href={ele.link}
          key={ele.link}
          className="flex items-center justify-center text-gray-600 hover:text-blue-600"
        >
          <ele.icon className="cursor-pointer" />
        </Link>
      ))}
    </nav>
  );
};

export default NavBar;
