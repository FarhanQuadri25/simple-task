"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, Eye, EyeOff, Lock, User, Shield } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { useState, useTransition } from "react";
import { api } from "@/lib/api";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const DUMMY_CREDENTIALS = {
  username: "m2m",
  password: "m123",
};

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (
        data.username === DUMMY_CREDENTIALS.username &&
        data.password === DUMMY_CREDENTIALS.password
      ) {
        localStorage.setItem("isAuthenticated", "true");
        api.post("visit").catch(console.error);
        toast.success("Login successful! Redirecting to dashboard...");
        router.push("/");
      } else {
        toast.error(
          "Invalid credentials. Please check your username and password."
        );
      }
    });
  }

  return (
    <div className="min-h-screen dark:bg-[#171717] bg-gray-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-[#171717] dark:via-[#1a1a1a] dark:to-[#0d0d0d] bg-gradient-to-br from-gray-100 via-gray-50 to-white" />
      <div className="absolute inset-0 dark:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] dark:from-blue-900/10 from-blue-200/20 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-5xl">
        <div className="dark:bg-[#1f1f1f] bg-white dark:border-[#333333] border-gray-200 rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          {/* Left Panel - Branding */}
          <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 text-white p-10 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_25%,_rgba(255,255,255,0.05)_50%,_transparent_75%)]" />

            <div className="relative text-center space-y-6">
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-2xl w-fit mx-auto border border-white/20">
                <Shield className="h-12 w-12 text-white" />
              </div>
              <div className="space-y-3">
                <h2 className="text-3xl font-bold">Task Manager</h2>
                <p className="text-blue-100 text-lg leading-relaxed max-w-sm">
                  Professional task management platform designed for modern
                  teams
                </p>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-blue-200">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Secure & Reliable</span>
              </div>
            </div>
          </div>

          {/* Right Panel - Sign In Form */}
          <div className="dark:bg-[#262626] bg-gray-50 p-8 lg:p-12 flex flex-col justify-center">
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <div className="bg-blue-600/20 p-4 rounded-2xl w-fit mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-400" />
              </div>
              <h1 className="text-2xl font-bold dark:text-white text-gray-900 mb-2">
                Task Manager
              </h1>
            </div>

            {/* Form Header */}
            <div className="text-center mb-8">
              <div className="bg-blue-600/20 p-4 rounded-2xl w-fit mx-auto mb-6 hidden lg:block">
                <Lock className="h-8 w-8 text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r dark:from-white dark:to-gray-300 from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
                Welcome Back
              </h2>
              <p className="dark:text-gray-400 text-gray-600 text-base">
                Sign in to access your dashboard and manage your tasks
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium dark:text-gray-200 text-gray-700">
                        Username
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <User className="h-5 w-5 dark:text-gray-400 text-gray-500" />
                          </div>
                          <Input
                            placeholder="Enter your username"
                            className="pl-12 h-12 dark:bg-[#1a1a1a] bg-white dark:border-[#404040] border-gray-300 dark:text-white text-gray-900 focus:dark:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium dark:text-gray-200 text-gray-700">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 dark:text-gray-400 text-gray-500" />
                          </div>
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="pl-12 pr-12 h-12 dark:bg-[#1a1a1a] bg-white dark:border-[#404040] border-gray-300 dark:text-white text-gray-900 focus:dark:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                            {...field}
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-4 flex items-center hover:dark:bg-[#404040] hover:bg-gray-200 rounded-r-lg transition-colors duration-200"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5 dark:text-gray-400 text-gray-500 hover:dark:text-gray-300 hover:text-gray-700" />
                            ) : (
                              <Eye className="h-5 w-5 dark:text-gray-400 text-gray-500 hover:dark:text-gray-300 hover:text-gray-700" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl border-0 dark:shadow-lg shadow-md dark:shadow-blue-600/25 shadow-blue-500/20 transition-all duration-200 hover:shadow-xl hover:dark:shadow-blue-600/30 hover:shadow-blue-500/30 mt-8"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      Sign In
                    </>
                  )}
                </Button>
              </form>
            </Form>

            <Separator className="my-8 dark:bg-[#404040] bg-gray-200" />

            {/* Footer */}
            <div className="text-center mt-4">
              <p className="text-xs dark:text-gray-500 text-gray-400">
                © {new Date().getFullYear()} Task Manager All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
