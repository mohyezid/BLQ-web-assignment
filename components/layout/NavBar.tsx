import Container from "../Component";
import SearchInput from "../SearchInput";
import { HiMenu } from "react-icons/hi";
import { LuArrowBigDown } from "react-icons/lu";

const NavBar = () => {
  return (
    <div className="sticky top-0 bg-white border-b-primary/10">
      <Container>
        <div className="flex justify-between items-center">
          <div className="flex justify-between items-center gap-3 cursor-pointer">
            <div className=" text-xl text-green-700">Testvalley </div>
            <HiMenu className="text-green-700 text-2xl" />
            <p className="text-green-700 text-2xl">测试谷</p>
          </div>
          <SearchInput />
          <div className="flex gap-3 items-center">
            <div className="flex gap-2">
              <LuArrowBigDown className="text-black-100 text-2xl" size={40} />
              <p className="text-black-100 text-2xl">测试谷</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
