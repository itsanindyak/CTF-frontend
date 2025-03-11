"use client";

import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { Form, FormControl, FormField, FormItem } from "@/components/Form";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

// Define form schema with validation
const formSchema = z.object({
  Team_Name: z.string().min(4, { message: "Team name is required" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Team_Name: "",
    },
  });

  const showErrors = (errors: FieldErrors<FormValues>) => {
    toast.error(errors["Team_Name"]?.message);
  };

  const login = async (data: FormValues) => {
    const backendURL = process.env.NEXT_PUBLIC_URL;
    if (!backendURL) {
      throw new Error("Please set backend URL in environment variables");
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${backendURL}/login`, data);

      localStorage.setItem("TOKEN", response.data.token);
      toast.success(response.data.msg);

      router.push("/");
    } catch (error: any) {
      console.error("Login Error:", error);
      toast.error(error.response?.data?.msg || "Something went wrong");

      const errorMessage = error.response?.data?.msg || "Something went wrong";

      // Redirect to signup if user is not found
      if (error.response?.status === 400) {
        toast.error("User not found. Redirecting to signup...");
        router.push("/register"); // Redirect to signup page
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    console.log("Form data:", data);
    login(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, showErrors)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="Team_Name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Enter team name"
                  {...field}
                  className="text-lg md:text-xl p-4 h-8 md:h-11 font-light"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="pt-5 flex justify-center ">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#f5f5dc] sm:text-2xl text-amber-900 border border-amber-800 hover:bg-amber-100 px-8 py-2 rounded-md font-medium transition-all"
          >
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Play!!"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
