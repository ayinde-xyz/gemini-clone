"use client";
import { ResetPasswordSchemaType, ResetPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { resetPassword } from "@/lib/auth-client";
import { toast } from "sonner";

interface ResetPasswordFormProps {
  token: string;
}

export function ResetPasswordForm({
  className,
  token,
  ...props
}: React.ComponentProps<"div"> & ResetPasswordFormProps) {
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = (values: ResetPasswordSchemaType) => {
    const { password } = values;

    startTransition(async () => {
      await resetPassword({
        token,
        newPassword: password,
        fetchOptions: {
          onRequest: () => {
            toast.loading("Resetting password...");
          },
          onError: (error) => {
            toast.dismiss();
            toast.error(`Error resetting password: ${error.error.message}`);
          },
          onSuccess: () => {
            toast.dismiss();
            toast.success("Password reset successfully! You can now log in.");
            router.push("/auth/login");
          },
        },
      });
    });
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className=" p-0 ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Reset your Password</h1>
                  <p className="text-balance text-muted-foreground">
                    Please Enter your new password to continue
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="password"
                          type="password"
                          placeholder="Enter your new password"
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="confirmPassword">Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm your password"
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full disabled:cursor-not-allowed">
                  {loading && <Loader2 className="animate-spin" size={14} />}
                  {loading ? "Resetting..." : "Reset Password"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
