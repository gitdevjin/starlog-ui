import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import gitHubLogo from "@/assets/github-mark.svg";
import { useSignInWithEmail } from "@/hooks/mutations/auth/use-sign-in-with-email";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/const";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signInWithEmail, isPending: isSignInWithEmailPending } =
    useSignInWithEmail({
      onSuccess: () => {
        toast.info("Login Success", {
          position: "top-center",
        });

        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.me });

        navigate("/");
      },
      onError: (error) => {
        toast.error(error.message, {
          position: "top-center",
        });
      },
    });

  const handleSignIn = () => {
    signInWithEmail({ email, password });
  };

  return (
    <div className="flex flex-col gap-8 sm:px-12 sm:py-6">
      <div className="text-xl font-bold">Sign-In Page</div>
      <div className="flex flex-col gap-2">
        <Input
          disabled={isSignInWithEmailPending}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="py-6"
          type="email"
          placeholder="example@abcd.com"
        />
        <Input
          disabled={isSignInWithEmailPending}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="py-6"
          type="password"
          placeholder="password"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button
          disabled={isSignInWithEmailPending}
          onClick={handleSignIn}
          className="w-full"
        >
          Sign-In
        </Button>
        <Button
          disabled={isSignInWithEmailPending}
          onClick={handleSignIn}
          className="w-full"
          variant={"outline"}
        >
          <img src={gitHubLogo} alt="" className="h-4 w-4" />
          Sign-In with GitHub
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <Link className="text-muted-foreground hover:underline" to={"/sign-up"}>
          Not a member yet? Sign-up
        </Link>
        <Link
          className="text-muted-foreground hover:underline"
          to={"/forget-password"}
        >
          Forgot your password?
        </Link>
      </div>
    </div>
  );
}
