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
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);


  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: "",
    },
  });

  const showErrors = (errors: FieldErrors<FormValues>) => {
    toast.error(errors["teamName"]?.message)
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
        <FormField
              control={form.control}
              name="teamName"
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
