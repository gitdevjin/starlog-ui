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
    <div className="bg-muted/40 flex flex-1 items-center justify-center px-4">
      <div className="bg-background w-full max-w-md rounded-2xl p-8 shadow-lg">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            Create an account
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Join us and start exploring
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          <Input
            disabled={isSignUpPending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email address"
            className="h-12"
          />

          <Input
            disabled={isSignUpPending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="h-12"
          />
        </div>

        {/* Action */}
        <div className="mt-6">
          <Button
            disabled={isSignUpPending}
            onClick={handleSignUpClick}
            className="h-12 w-full"
          >
            Create account
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm">
          <Link
            className="text-muted-foreground hover:text-foreground hover:underline"
            to="/sign-in"
          >
            Already have an account?{" "}
            <span className="font-medium">Sign in</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
