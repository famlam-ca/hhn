"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Icons } from "@/components/icons";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
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
import { toast } from "@/components/ui/use-toast";
import { Wrapper } from "@/components/wrapper";
import { sendResetPasswordEmail } from "@/lib/services/email-service";
import { ResetPasswordSchemaStep1 } from "@/types/user-schema";

export const SendResetPasswordEmail = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetPasswordSchemaStep1>>({
    resolver: zodResolver(ResetPasswordSchemaStep1),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetPasswordSchemaStep1>) => {
    startTransition(async () => {
      const res = await sendResetPasswordEmail(values);
      toast({
        title: res.message,
        description: res.description,
        variant: res.success ? "default" : "destructive",
      });
    });
  };

  const input_style =
    "block w-full h-10 rounded-md border-0 bg-background/50 py-1.5 shadow-sm ring-1 ring-inset ring-ring placeholder:text-muted focus:bg-background focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6";

  return (
    <MaxWidthWrapper className="flex min-h-screen w-full items-center justify-center">
      <Wrapper className="relative">
        <div className="mx-auto mb-10 flex flex-col items-center justify-center space-y-4">
          <Link href="/" className="z-40 flex items-center gap-2">
            <Icons.logo className="h-8 w-8 fill-text" />
            <h2 className="text-xl font-bold">
              H<span className="text-primary">HN</span>
            </h2>
          </Link>
          <h1 className="text-center text-3xl font-bold leading-9 tracking-tight md:text-4xl lg:text-5xl">
            Reset Password
          </h1>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        required
                        type="email"
                        placeholder="example@domain.ca"
                        {...field}
                        className={`${input_style}`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full uppercase shadow-md"
                disabled={isPending}
              >
                {isPending ? (
                  <div className="flex">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    <p>Loading...</p>
                  </div>
                ) : (
                  "Send Email"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </Wrapper>
    </MaxWidthWrapper>
  );
};
