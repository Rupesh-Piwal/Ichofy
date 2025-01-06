import { SignedOut, UserButton } from "@clerk/clerk-react";
// import { LayoutDashboardIcon } from "lucide-react";
// import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons ";
import Logo from "./logo/Logo";
// import { useAuthStore } from "@/stores/useAuthStore";
// import { cn } from "@/lib/utils";
// import { buttonVariants } from "./ui/button";

const Topbar = () => {
  //   const { isAdmin } = false
  //   console.log({ isAdmin });

  return (
    <div
      className="flex items-center justify-between p-3 stickytop-0 bg-black
      backdrop-blur-md z-10
    "
    >
      <div className="flex gap-2 items-center">
        <Logo />
      </div>
      <div className="flex items-center gap-4">
        {/* {isAdmin && (
          <Link
            to={"/admin"}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            <LayoutDashboardIcon className="size-4  mr-2" />
            Admin Dashboard
          </Link>
        )} */}

        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  );
};
export default Topbar;
