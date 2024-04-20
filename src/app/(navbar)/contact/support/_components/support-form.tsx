"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { revalidatePath } from "next/cache";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Wrapper } from "@/components/wrapper";
import { sendSupportTicketEmail } from "@/lib/services/email-service";
import { useSession } from "@/providers/session-provider";
import { SupportFormSchema } from "@/types/support-form-schema";

export const SupportForm = () => {
  const { user } = useSession();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof SupportFormSchema>>({
    resolver: zodResolver(SupportFormSchema),
    defaultValues: {
      username: user ? user.username : "",
      email: user ? user.email : "",
      name: user ? `${user.first_name} ${user.last_name}` : "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SupportFormSchema>) => {
    startTransition(async () => {
      const res = await sendSupportTicketEmail({
        username: values.username,
        name: values.name,
        email: values.email,
        subject: values.subject,
        message: values.message,
      });
      if (!res.success) {
        toast({
          title: res.message,
          variant: "destructive",
        });
      } else if (res.success) {
        toast({
          title: res.message,
          description: res.description,
        });

        form.reset();
      }
    });
  };

  const input_style =
    "block w-full h-10 rounded-md border-0 bg-background/50 py-1.5 shadow-sm ring-1 ring-inset ring-ring placeholder:text-muted focus:bg-background focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6";

  return (
    <MaxWidthWrapper className="flex min-h-[calc(100vh-3.5rem)] w-full items-center justify-center">
      <Wrapper>
        <div className="mx-auto mb-10 flex flex-col items-center justify-center space-y-4">
          <Link href="/" className="z-40 flex items-center gap-2">
            <Icons.logo className="h-8 w-8 fill-text" />
            <h2 className="text-xl font-bold">
              H<span className="text-primary">HN</span>
            </h2>
          </Link>
          <h1 className="text-center text-3xl font-bold leading-9 tracking-tight md:text-4xl lg:text-5xl">
            Contact Support
          </h1>
          <span className="text-center text-muted-foreground">
            <p>
              Have a question or need help? Send us a message and we&apos;ll get
              back to you as soon as possible.
            </p>
            {!!user && (
              <p>
                Since you are logged in we have auto filled your details for
                you.
              </p>
            )}
          </span>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex justify-center gap-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="John Doe"
                          {...field}
                          className={`${input_style}`}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <input
                          type="text"
                          placeholder="Name..."
                          {...field}
                          className={`${input_style}`}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email <span className="text-alert">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        required
                        type="text"
                        placeholder="example@domain.ca"
                        {...field}
                        className={`${input_style}`}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Subject <span className="text-alert">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        required
                        type="text"
                        placeholder="Subject..."
                        {...field}
                        className={`${input_style}`}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Message <span className="text-alert">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        required
                        placeholder="What seems to be the problem?..."
                        {...field}
                        className={`${input_style} resize-none`}
                      />
                    </FormControl>
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
                  "Submit Ticket"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </Wrapper>
    </MaxWidthWrapper>
  );
};
