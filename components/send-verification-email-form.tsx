"use client";

import { sendVerificationEmailAction } from "@/actions/send-verification-email-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { CardWrapper } from "./auth/card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema } from "@/schemas";

export const SendVerificationEmailForm = () => {
  const [isPending, setIsPending] = useState(false);
  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(value: z.infer<typeof emailSchema>) {
    try {
      setIsPending(true);
      const res = await sendVerificationEmailAction(value.email);

      if (res.status === "success") {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Unexpected error occurred.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <CardWrapper
      headerLabel="Email not verified Please request a new verification email"
      backButtonLabel="Already verified your email?"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form
          className="max-w-sm w-full space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="john.doe@exmple.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isPending} className="w-full">
            Resend Verification Email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
