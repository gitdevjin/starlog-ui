import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router";
import gitHubLogo from "@/assets/github-mark.svg";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col gap-8">
      <div className="text-xl font-bold">Sign-In Page</div>
      <div className="flex flex-col gap-2">
        <Input
          //   disabled={isPending}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="py-6"
          type="email"
          placeholder="example@abcd.com"
        />
        <Input
          //   disabled={isPending}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="py-6"
          type="password"
          placeholder="password"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Button
          //   disabled={isPending}
          //   onClick={handleSignInWithPwdClick}
          className="w-full"
        >
          Sign-In
        </Button>
        <Button
          //   disabled={isPending}
          //   onClick={handleSignInWithGithubClick}
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
