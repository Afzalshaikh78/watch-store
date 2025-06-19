import { IoBagOutline, IoFilterOutline } from "react-icons/io5";
import { useFilterStore } from "../store/store";

interface NavigationProps {
  toggleSideBar: () => void;
}

const Navigation = ({ toggleSideBar }: NavigationProps) => {
  const { searchQuery, setSearchQuery } = useFilterStore();
  return (
    <div
      className="mt-[2rem]   w-[50%] md:w-[90%] 
     flex justify-between items-center"
    >
      <h1 className="logo">
        <IoFilterOutline
          size={27}
          className="ml-[4rem] cursor-pointer"
          onClick={toggleSideBar}
        />
      </h1>
      <nav>
        <ul className="flex items-center m- mr-[2rem] space-x-4">
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search..." className="border m-2 w-80 px-2 py-2 rounded-2xl " />
        </ul>
      </nav>
      <IoBagOutline size={24} />
    </div>
  );
};

export default Navigation;
