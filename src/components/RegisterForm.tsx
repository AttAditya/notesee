import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useRef } from "react"
import { useQuery } from "@tanstack/react-query"
import { LoaderCircle } from "lucide-react"
import { googleQuery, loginQuery } from "@/api/auth"
import { userLoggedIn } from "@/utils/auth"

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const {
    fetchStatus: googleStatus,
    refetch: googleRefetch,
  } = useQuery({
    queryKey: ["user-google"],
    queryFn: async () => {
      return await googleQuery();
    },
    enabled: false,
  });

  const {
    fetchStatus: loginStatus,
    refetch: loginRefetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      if (!emailRef.current?.value || !passwordRef.current?.value)
        return;
      
      return await loginQuery(
        emailRef.current?.value || "",
        passwordRef.current?.value || ""
      );
    },
    enabled: false,
  });

  const handleGoogleLogin = async () => {
    googleRefetch();
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginRefetch();
  };

  useEffect(() => {
    if (userLoggedIn()) window.location.href = "/dashboard";
  }, [loginStatus]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Greetings!</CardTitle>
          <CardDescription>
            Register with your Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button
                  onClick={handleGoogleLogin}
                  variant="outline"
                  className="w-full cursor-pointer"
                  disabled={googleStatus === "fetching"}
                  type="button"
                >
                  {googleStatus === "fetching"
                    ? <LoaderCircle className="animate-spin" />
                    : (<>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                          d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                          fill="currentColor"
                          />
                      </svg>
                      Register with Google
                    </>)
                  }
                </Button>
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    ref={emailRef}
                    id="email"
                    type="email"
                    placeholder="user@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    ref={passwordRef}
                    id="password"
                    type="password"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={loginStatus === "fetching"}
                >
                  {loginStatus === "fetching"
                    ? <LoaderCircle className="animate-spin" />
                    : "Register"
                  }
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/auth/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
