// import { Button } from "@/components/ui/button";
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";
// import { loginUser } from "@/lib/user.api";
// import { Eye, EyeOff, Loader2, LockKeyhole, Mail } from "lucide-react";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// const Login = () => {
//     const loading = false;
//     const navigate = useNavigate();

//     const [seePassword, setSeePassword] = useState(false);
//     const [input, setInput] = useState({
//         email: "",
//         password: "",
//     });

//     const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setInput({ ...input, [name]: value });
//     };

//     const loginSubmitHandler = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             await loginUser(input);
//             navigate("/tasks");
//         } catch (error) {
//             toast.error(error instanceof Error ? error.message : "Login failed");
//         }
//     };

//     return (
//         <div className="relative min-h-screen flex items-center justify-center px-4
//             bg-gradient-to-br from-background via-orange-50/40 to-background overflow-hidden">

//             {/* soft ambient glow */}
//             <div className="absolute -top-40 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2
//                 rounded-full bg-orange-300/20 blur-3xl" />

//             <Card className="
//                 relative z-10 w-full max-w-md
//                 rounded-2xl border
//                 bg-card/90 backdrop-blur
//                 shadow-[0_18px_45px_-20px_rgba(251,146,60,0.35)]
//             ">
//                 <CardHeader className="px-8 pt-8 text-center space-y-2">
//                     <CardTitle className="text-3xl font-semibold tracking-tight">
//                         Welcome back
//                     </CardTitle>
//                     <CardDescription>
//                         Sign in to continue your work
//                     </CardDescription>
//                 </CardHeader>

//                 <CardContent className="px-8 pb-8">
//                     <form onSubmit={loginSubmitHandler} className="space-y-5">
//                         {/* Email */}
//                         <div className="space-y-2">
//                             <Label>Email</Label>
//                             <div className="relative">
//                                 <Input
//                                     type="email"
//                                     name="email"
//                                     required
//                                     placeholder="you@example.com"
//                                     value={input.email}
//                                     onChange={changeEventHandler}
//                                     className="
//                                         pl-11
//                                         focus-visible:ring-orange-400/30
//                                         focus-visible:border-orange-400
//                                     "
//                                 />
//                                 <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
//                             </div>
//                         </div>

//                         {/* Password */}
//                         <div className="space-y-2">
//                             <Label>Password</Label>
//                             <div className="relative">
//                                 <Input
//                                     type={seePassword ? "text" : "password"}
//                                     name="password"
//                                     required
//                                     placeholder="••••••••"
//                                     value={input.password}
//                                     onChange={changeEventHandler}
//                                     className="
//                                         pl-11 pr-11
//                                         focus-visible:ring-orange-400/30
//                                         focus-visible:border-orange-400
//                                     "
//                                 />
//                                 <LockKeyhole className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
//                                 <button
//                                     type="button"
//                                     onClick={() => setSeePassword(!seePassword)}
//                                     className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
//                                 >
//                                     {seePassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                                 </button>
//                             </div>
//                         </div>

//                         {/* Submit */}
//                         <Button
//                             type="submit"
//                             disabled={loading}
//                             className="
//                                 w-full
//                                 bg-primary text-primary-foreground
//                                 shadow-md shadow-orange-500/20
//                                 hover:shadow-lg hover:shadow-orange-500/30
//                             "
//                         >
//                             {loading ? (
//                                 <>
//                                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                     Signing in…
//                                 </>
//                             ) : (
//                                 "Sign in"
//                             )}
//                         </Button>

//                         <div className="text-center text-sm">
//                             <Link
//                                 to="/signup"
//                                 className="text-primary hover:underline"
//                             >
//                                 Don’t have an account? Sign up
//                             </Link>
//                         </div>

//                         <Separator />

//                         <p className="text-center text-sm text-muted-foreground">
//                             Stay focused. Stay productive.
//                         </p>
//                     </form>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// };

// export default Login;



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
import { loginUser } from "@/lib/user.api";
import { Eye, EyeOff, Loader2, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const loading = false;
  const navigate = useNavigate();

  const [seePassword, setSeePassword] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const loginSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(input);
      navigate("/tasks");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 bg-background overflow-hidden">
      {/* Primary glow (same language as landing hero) */}
      <div className="absolute -top-32 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />

      <Card className="relative z-10 w-full max-w-md rounded-2xl border bg-card/95 backdrop-blur shadow-lg">
        <CardHeader className="px-8 pt-10 text-center space-y-3">
          <CardTitle className="text-3xl font-semibold tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription className="text-base">
            Sign in to continue staying productive
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8 pb-10">
          <form onSubmit={loginSubmitHandler} className="space-y-6">
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
              disabled={loading}
              size="lg"
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </Button>

            <div className="text-center text-sm">
              <Link
                to="/signup"
                className="text-primary hover:underline"
              >
                Don’t have an account? Create one
              </Link>
            </div>

            <Separator />

            <p className="text-center text-sm text-muted-foreground">
              Organize your tasks. Stay focused.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
