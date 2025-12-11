import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUpClick = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-xl font-bold">Sign-Up Page</div>
      <div className="flex flex-col gap-2">
        <Input
          //   disabled={isPendingSignUp}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="py-6"
          type="email"
          placeholder="example@abcd.com"
        />
        <Input
          //   disabled={isPendingSignUp}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="py-6"
          type="password"
          placeholder="password"
        />
      </div>
      <div>
        <Button
          //   disabled={isPendingSignUp}
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
