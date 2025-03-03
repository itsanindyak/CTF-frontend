"use client";

import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/Form";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

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
    .string()
    .min(1, { message: "Team Leader Roll No is required" }),
  leaderName: z.string().min(1, { message: "Team Leader name is required" }),
  leaderDepartment: z
    .string()
    .min(1, { message: "Team Leader Department is required" }),
  leaderYear: z.string().min(1, { message: "Team Leader Year is required" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);


  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: "",
      leaderName: "",
      leaderEmail: "",
      leaderDepartment: "",
      leaderRollNo: "",
      leaderYear: "",
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

  
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    console.log("Form data:", data);

    toast.success("Login successful! Redirecting to game...");

    setTimeout(() => {
      setIsSubmitting(false);
      form.reset();
      // router.push('/game');
    }, 3000);
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
              name="leaderEmail"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@aot.edu"
                      {...field}
                       className="text-lg md:text-xl p-4 h-8 md:h-11 font-light"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="leaderRollNo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter roll number"
                      {...field}
                       className="text-lg md:text-xl p-4 h-8 md:h-11 font-light"
                    />
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-4">
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
              name="leaderDepartment"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter department"
                      {...field}
                       className="text-lg md:text-xl p-4 h-8 md:h-11 font-light"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="leaderYear"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter year"
                      {...field}
                       className="text-lg md:text-xl p-4 h-8 md:h-11 font-light"
                    />
                  </FormControl>
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
              "Play!!"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
