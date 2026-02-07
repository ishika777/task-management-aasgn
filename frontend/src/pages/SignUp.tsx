import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { signupUser } from "@/lib/user.api";
import {
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  User,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Signup = () => {
  const loading = false;
  const navigate = useNavigate();

  const [seePassword, setSeePassword] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const signupSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signupUser(input);
      navigate("/tasks");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Signup failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 bg-background overflow-hidden">
      {/* Primary glow */}
      <div className="absolute -top-32 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />

      <Card className="relative z-10 w-full max-w-md rounded-2xl border bg-card/95 backdrop-blur shadow-lg">
        <CardHeader className="px-8 pt-10 text-center space-y-3">
          <CardTitle className="text-3xl font-semibold tracking-tight">
            Create your account
          </CardTitle>
          <CardDescription className="text-base">
            Start organizing your tasks effortlessly
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8 pb-10">
          <form onSubmit={signupSubmitHandler} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label>Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  name="name"
                  required
                  placeholder="Your name"
                  value={input.name}
                  onChange={changeEventHandler}
                  className="pl-11 focus-visible:ring-primary/30"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label>Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="pl-11 focus-visible:ring-primary/30"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label>Password</Label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  type={seePassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="••••••••"
                  value={input.password}
                  onChange={changeEventHandler}
                  className="pl-11 pr-11 focus-visible:ring-primary/30"
                />
                <button
                  type="button"
                  onClick={() => setSeePassword(!seePassword)}
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                >
                  {seePassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account…
                </>
              ) : (
                "Create account"
              )}
            </Button>

            <div className="text-center text-sm">
              <Link
                to="/login"
                className="text-primary hover:underline"
              >
                Already have an account? Sign in
              </Link>
            </div>

            <Separator />

            <p className="text-center text-sm text-muted-foreground">
              Free to use. No credit card required.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
