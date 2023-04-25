import { HelpCircle, BarChart2, Settings, Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-border py-5 h-[10vh] items-center inline-flex w-full justify-between">
      <Menu className="md:ml-4 ml-3" color="white" />
      <h3 className="md:text-4xl text-2xl font-bold self-center absolute left-[50%] translate-x-[-50%] ">
        Poydle
      </h3>
      <ul className=" inline-flex md:mr-4  mr-3 md:gap-2 gap-1 text-sm ">
        <HelpCircle color="white" className="" />
        <BarChart2 color="white" />
        <Settings color="white" />
      </ul>
    </header>
  );
};

export default Header;
