import { Search } from "lucide-react";
import { Input } from "./ui/input";

const SearchInput = () => {
  return (
    <div className="relative sm:block hidden">
      <Search className="absolute h-4 w-4 top-3 left-4 text-muted-foreground" />
      <Input placeholder="在这里搜索" className="pl-10 bg-white" />
    </div>
  );
};

export default SearchInput;
