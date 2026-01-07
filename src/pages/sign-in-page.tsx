import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import gitHubLogo from "@/assets/github-mark.svg";
import { useSignInWithEmail } from "@/hooks/mutations/auth/use-sign-in-with-email";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { API_SERVER_URL, QUERY_KEYS } from "@/lib/const";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signInWithEmail, isPending: isSignInWithEmailPending } =
    useSignInWithEmail({
      onSuccess: async () => {
        toast.info("Login Success", {
          position: "top-center",
        });

        const response = await fetch(`${API_SERVER_URL}/user/me`, {
          method: "GET",
          credentials: "include",
        });

        const user = await response.json();

        queryClient.setQueryData(QUERY_KEYS.user.me, user);

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
    <div className="bg-muted/40 flex flex-1 items-center justify-center px-4">
      <div className="bg-background w-full max-w-md rounded-2xl p-8 shadow-lg">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Sign in to your account
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          <Input
            disabled={isSignInWithEmailPending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email address"
            className="h-12"
          />

          <Input
            disabled={isSignInWithEmailPending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="h-12"
          />
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3">
          <Button
            disabled={isSignInWithEmailPending}
            onClick={handleSignIn}
            className="h-12 w-full"
          >
            Sign in
          </Button>

          <Button
            disabled={isSignInWithEmailPending}
            onClick={handleSignIn}
            variant="outline"
            className="flex h-12 w-full items-center justify-center gap-2"
          >
            <img src={gitHubLogo} alt="GitHub logo" className="h-4 w-4" />
            Continue with GitHub
          </Button>
        </div>

        {/* Footer links */}
        <div className="mt-6 flex flex-col gap-2 text-center text-sm">
          <Link
            className="text-muted-foreground hover:text-foreground hover:underline"
            to="/forget-password"
          >
            Forgot your password?
          </Link>

          <Link
            className="text-muted-foreground hover:text-foreground hover:underline"
            to="/sign-up"
          >
            Don’t have an account? <span className="font-medium">Sign up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
