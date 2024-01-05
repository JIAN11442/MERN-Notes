import { useRouter } from "next/navigation";

import Button from "./Button";

import useUser from "@/utils/useUser";

const Navbar = () => {
  const router = useRouter();
  const userState = useUser();
  const handleMainRefresh = () => {
    router.refresh();
  };

  return (
    <div
      className="
        flex
        flex-block
        items-center
        justify-between
        bg-gradient-to-r
        from-indigo-900
        to-blue-500
        px-4
        py-3
        shadow-md
      "
    >
      {/* Navbar Title */}
      <div
        onClick={handleMainRefresh}
        className="
          flex
          text-lg
          text-white
          font-semibold
          cursor-pointer
        "
      >
        Cool Notes App
      </div>

      {/* SignUp || LogIn */}

      <div>
        {/* SignUp */}
        <Button
          onClick={userState.signup}
          className="
            py-1
            border-0
            outline-none
            bg-transparent
            text-white
            font-medium
          "
        >
          Sign up
        </Button>

        {/* LogIn */}
        <Button
          onClick={userState.login}
          className="
            py-1
            border-0
            outline-none
            bg-transparent
            text-white
            font-medium
          "
        >
          Log in
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
