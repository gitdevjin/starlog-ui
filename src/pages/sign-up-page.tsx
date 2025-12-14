import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignUp } from "@/hooks/mutations/auth/use-sign-up";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { mutate: signUp, isPending: isSignUpPending } = useSignUp({
    onSuccess: () => {
      toast.info("Sign Up Successful!", {
        position: "top-center",
      });
      navigate("/sign-in");
    },
    onError: (error: Error) => {
      toast.error(error.message, {
        position: "top-center",
      });
    },
  });

  const handleSignUpClick = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    signUp({ email, password });
  };

  return (
    <div className="flex flex-col gap-8 sm:px-12 sm:py-6">
      <div className="text-xl font-bold">Sign-Up Page</div>
      <div className="flex flex-col gap-2">
        <Input
          disabled={isSignUpPending}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="py-6"
          type="email"
          placeholder="example@abcd.com"
        />
        <Input
          disabled={isSignUpPending}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="py-6"
          type="password"
          placeholder="password"
        />
      </div>
      <div>
        <Button
          disabled={isSignUpPending}
          onClick={handleSignUpClick}
          className="w-full"
        >
          Sign-Up
        </Button>
      </div>
      <div>
        <Link className="text-muted-foreground hover:underline" to={"/sign-in"}>
          If you are already member? Sign-in
        </Link>
      </div>
    </div>
  );
}
