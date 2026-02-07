import { Button } from "@/components/ui/button";
import { CheckCircle2, Zap, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background overflow-hidden">
            {/* Header */}
            <header className="flex items-center justify-between px-8 py-5 max-w-7xl mx-auto">
                <h1 className="text-xl font-semibold tracking-tight">
                    Taskify
                </h1>

                <div className="flex items-center gap-4">
                    <Button variant="ghost" onClick={() => navigate("/login")}>
                        Login
                    </Button>
                    <Button onClick={() => navigate("/signup")}>
                        Get Started
                    </Button>
                </div>
            </header>

            {/* Hero */}
            <section className="relative flex flex-col items-center text-center px-6 pt-28">
                {/* Glow */}
                <div className="absolute -top-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />

                <h2 className="text-4xl sm:text-6xl font-bold tracking-tight max-w-4xl">
                    Organize your tasks.
                    <span className="text-primary block mt-3">
                        Stay focused. Get things done.
                    </span>
                </h2>

                <p className="mt-6 text-muted-foreground max-w-xl text-lg">
                    A clean, distraction-free task manager that helps you plan,
                    track, and finish what matters.
                </p>

                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                    <Button size="lg" onClick={() => navigate("/signup")}>
                        Start for free
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        onClick={() => navigate("/login")}
                    >
                        I already have an account
                    </Button>
                </div>
            </section>

            {/* Features */}
            <section className="mt-32 px-6 max-w-6xl mx-auto">
                <div className="grid gap-8 sm:grid-cols-3">
                    <Feature
                        icon={<Zap className="h-6 w-6" />}
                        title="Fast & Simple"
                        description="Create, update, and manage tasks with minimal clicks and zero clutter."
                    />
                    <Feature
                        icon={<CheckCircle2 className="h-6 w-6" />}
                        title="Stay Organized"
                        description="Track progress clearly and always know what’s pending or done."
                    />
                    <Feature
                        icon={<ShieldCheck className="h-6 w-6" />}
                        title="Secure & Personal"
                        description="Your tasks stay private and securely tied to your account."
                    />
                </div>
            </section>

            {/* CTA */}
            <section className="mt-36 px-6 pb-24">
                <div className="max-w-4xl mx-auto rounded-2xl border bg-card px-8 py-16 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent" />

                    <h3 className="relative text-3xl sm:text-4xl font-semibold">
                        Ready to be more productive?
                    </h3>
                    <p className="relative mt-4 text-muted-foreground text-lg">
                        Start managing your tasks better today.
                    </p>

                    <Button
                        size="lg"
                        className="relative mt-8"
                        onClick={() => navigate("/signup")}
                    >
                        Create your free account
                    </Button>
                </div>
            </section>
        </div>
    );
}

function Feature({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="rounded-xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-4 text-primary">{icon}</div>
            <h4 className="text-lg font-semibold">{title}</h4>
            <p className="mt-2 text-sm text-muted-foreground">
                {description}
            </p>
        </div>
    );
}
