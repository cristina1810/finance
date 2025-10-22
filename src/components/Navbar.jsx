import { Menu, Settings } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex items-center  bg-background-light p-4 pb-2 justify-between sticky top-0 z-10">
      <div className="text-dark-gray flex size-12 items-center">
        <span className="material-symbols-outlined text-3xl">
          <Menu></Menu>
        </span>
      </div>
      <h1 className="text-text-light text-lg font-bold flex-1 text-center">
        Bienvenido, Usuario
      </h1>
    </div>
  );
};
export default Navbar;
