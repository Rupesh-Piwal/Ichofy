import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const SignInOAuthButtons = () => {
  const { signIn, isLoaded } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  const signInWithGoogle = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
  };

  return (
    <Button
      onClick={signInWithGoogle}
      variant={"secondary"}
      className="md:w-full  border-zinc-200 h-11 bg-gradient-to-r from-[#B5179E]/15 to-[#7209B7]/15"
    >
      <img src="/google.png" alt="Google" className="size-5" />
      <span className="hidden md:flex text-slate-400">
        Continue with Google
      </span>
    </Button>
  );
};
export default SignInOAuthButtons;
