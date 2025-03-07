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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";

// Define form schema with validation
const formSchema = z.object({
  teamName: z.string().min(4, { message: "Team name is required" }),
  leaderEmail: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .refine((email) => email.endsWith("@aot.edu.in"), {
      message: "Email must be from aot.edu.in domain",
    }),
  leaderRollNo: z
    .number()
    .min(0, { message: "Put roll number correctly" })
    .max(300, { message: "Put roll number correctly" }),
  leaderName: z.string().min(1, { message: "Team Leader name is required" }),
  leaderDepartment: z
    .string()
    .min(1, { message: "Team Leader Department is required" }),
  leaderYear: z.number().min(2020, { message: "Team Leader Year is required" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function SignUpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: "",
      leaderName: "",
      leaderEmail: "",
      leaderDepartment: "",
      leaderRollNo: undefined,
      leaderYear: undefined,
    },
  });

  const showErrors = (errors: FieldErrors<FormValues>) => {
    console.log("Validation Errors:", errors); // Debugging

    const priorityOrder: (keyof FormValues)[] = [
      "teamName",
      "leaderEmail",
      "leaderRollNo",
      "leaderName",
      "leaderDepartment",
      "leaderYear",
    ];

    for (const field of priorityOrder) {
      if (errors[field]) {
        toast.error(errors[field]?.message as string); // Ensure message is a string
        break; // Stop after showing the highest-priority error
      }
    }
  };

  const signup = async (data: FormValues) => {
    const backendURL = process.env.URL;
    if (!backendURL) {
      throw new Error("Please set backend url in enviourment");
    }
    try {
      axios.post(`${backendURL}`, data).then((responce) => {
        // console.log(responce);

        localStorage.setItem("TOKEN", responce.data.token);
        toast.success(responce.data.msg);
        setIsSubmitting(false);
        setTimeout(() => {
          router.push("/");
        }, 1500);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    signup(data);

    // toast.success("Login successful! Redirecting to game...");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, showErrors)}
        className="space-y-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 space-y-4 lg:text-2xl">
          {/* Left Column */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="teamName"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel className="flex sm:text-lg">
                    Team name<span className="text-red-500 ml-0.5">*</span>
                  </FormLabel> */}
                  <FormControl>
                    <Input
                      placeholder="Enter team name"
                      {...field}
                      className="text-lg md:text-xl p-4 h-8 md:h-11 font-light"
                    />
                  </FormControl>
                  {/* <FormMessage className="min-h-[1.5rem]"/> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="leaderName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter leader's name"
                      {...field}
                      className="text-lg md:text-xl p-4 h-8 md:h-11 font-light"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="leaderEmail"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@aot.edu.in"
                      {...field}
                      className="text-lg md:text-xl p-4 h-8 md:h-11 font-light"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="leaderRollNo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="numebr"
                      placeholder="Enter roll number"
                      {...field}
                      className="text-lg md:text-xl p-4 h-8 md:h-11 font-light"
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? Number(e.target.value) : undefined
                        )
                      }
                    />
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="leaderDepartment"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="text-lg md:text-xl p-4 h-8 md:h-11 font-light">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white text-lg md:text-xl">
                      <SelectItem
                        value="CSE"
                        className="text-lg md:text-xl font-[Unlock]"
                      >
                        CSE
                      </SelectItem>
                      <SelectItem
                        value="ECE"
                        className="text-lg md:text-xl font-[Unlock]"
                      >
                        ECE
                      </SelectItem>
                      <SelectItem
                        value="EE"
                        className="text-lg md:text-xl font-[Unlock]"
                      >
                        EE
                      </SelectItem>
                      <SelectItem
                        value="EEE"
                        className="text-lg md:text-xl font-[Unlock]"
                      >
                        EEE
                      </SelectItem>
                      <SelectItem
                        value="ME"
                        className="text-lg md:text-xl font-[Unlock]"
                      >
                        ME
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="leaderYear"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={field.value ? String(field.value) : undefined}
                  >
                    <FormControl>
                      <SelectTrigger className="text-lg md:text-xl p-4 h-8 md:h-11 font-light">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white text-lg md:text-xl">
                      <SelectItem
                        value="2024"
                        className="text-lg md:text-xl font-[Unlock]"
                      >
                        2024
                      </SelectItem>
                      <SelectItem
                        value="2023"
                        className="text-lg md:text-xl font-[Unlock]"
                      >
                        2023
                      </SelectItem>
                      <SelectItem
                        value="2022"
                        className="text-lg md:text-xl font-[Unlock]"
                      >
                        2022
                      </SelectItem>
                      <SelectItem
                        value="2021"
                        className="text-lg md:text-xl font-[Unlock]"
                      >
                        2021
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="pt-5 flex justify-center ">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#f5f5dc] sm:text-2xl text-amber-900 border border-amber-800 hover:bg-amber-100 px-8 py-2 rounded-md font-medium transition-all"
          >
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Register"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
