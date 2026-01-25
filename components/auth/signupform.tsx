"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Social } from "./social";
import { SignupSchema, SignupSchemaType } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useTransition } from "react";
import { signup } from "@/actions/signup";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const searchParams = useSearchParams();
  const [loading, startLoading] = useTransition();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Your account is already linked to a social account"
      : "";
  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });
  const onSubmit = (values: SignupSchemaType) => {
    startLoading(() => {
      toast.loading("Signing up...");
      signup(values).then((response) => {
        toast.dismiss();
        if (response?.error) {
          toast.error(response.error);
          return;
        }
        toast.success(response?.success || "Signed up successfully!");
      });
    });
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome!</h1>
                <p className="text-balance text-muted-foreground">
                  Sign up to your Gemini Chatbot account
                </p>
                <p className="text-destructive text-balance">
                  {urlError && urlError}
                </p>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <div className="flex items-center">
                          <FormLabel htmlFor="name">Name</FormLabel>
                        </div>
                        <FormControl>
                          <Input
                            {...field}
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <div className="flex items-center">
                          <FormLabel htmlFor="password">Password</FormLabel>
                        </div>
                        <FormControl>
                          <Input
                            {...field}
                            id="password"
                            type="password"
                            placeholder="***********"
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    disabled={loading}
                    type="submit"
                    className="w-full disabled:cursor-not-allowed">
                    {loading && <Loader2 className="animate-spin" size={14} />}
                    {loading ? "Signing up..." : "Sign up"}
                  </Button>
                </form>
              </Form>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <Social />
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="underline underline-offset-4">
                  Log in
                </Link>
              </div>
            </div>
          </div>

          <div className="relative hidden bg-muted md:block">
            <Image
              fill
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
