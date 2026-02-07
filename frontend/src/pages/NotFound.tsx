import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative z-10 max-w-md text-center px-6">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <SearchX className="h-8 w-8 text-muted-foreground" />
        </div>

        <h1 className="text-5xl font-bold tracking-tight">404</h1>

        <p className="mt-4 text-lg text-muted-foreground">
          This page wandered off your task list.
        </p>

        <p className="mt-2 text-sm text-muted-foreground">
          The link <span className="font-mono">{location.pathname}</span> doesn’t exist.
        </p>

        <div className="mt-8">
          <Button asChild size="lg">
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
