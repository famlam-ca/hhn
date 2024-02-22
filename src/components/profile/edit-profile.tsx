"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ElementRef, useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { updateUser } from "@/server/user";
import { CustomUser } from "@/types/types";

import { EditImage } from "./edit-image";

interface ProfileProps {
  user: CustomUser;
}

export const EditProfile = ({ user }: ProfileProps) => {
  const pathname = usePathname();
  const closeRef = useRef<ElementRef<"button">>(null);
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const schema = z.object({
    display_name: z
      .string()
      .refine(
        (v) => /.{8,}/.test(v),
        "Display name must be at least 8 characters long",
      )
      .refine(
        (v) => /^[a-zA-Z0-9_.]+$/i.test(v),
        "Display Name must contain only letters, numbers, underscores, and periods",
      )
      .refine(
        (v) => /^.{1,20}$/.test(v),
        "Display name must be at most 20 characters long",
      )
      .refine(
        (v) => /^(?!.*[_.]{2,})[^._].*[^._]$/.test(v),
        "Display name cannot contain consecutive, leadning or trailing underscores or periods",
      ),
    email: z
      .string()
      .email()
      .refine(
        (v) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(v),
        "Must be a valid email address",
      ),
    bio: z
      .string()
      .refine((v) =>
        /^.{0,200}$/.test("Bio must be at most 200 characters long"),
      ),
    image: z
      .string()
      .url()
      .refine(
        (v) =>
          /^https:\/\/(utfs.io\/f\/[^\/]+\.png|www.famlam.ca\/logo\/[^\/]+\.png)$/.test(
            v,
          ),
        "Invalid image URL",
      ),
  });

  const defaultValues = {
    display_name: user.username,
    email: user.email,
    bio: user.bio,
    image: user.image,
  };

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    // console.log("Form values:", values); // debug

    const allValuesUnchanged = Object.entries(values).every(
      ([key, value]) =>
        defaultValues[key as keyof typeof defaultValues] === value,
    );

    if (allValuesUnchanged) {
      toast({
        title: "No changes have been submitted.",
        description: "Becuase no changes have been made.",
      });
      return;
    }

    startTransition(() => {
      updateUser({
        id: user.id,
        email: values.email,
        display_name: values.display_name,
        bio: values.bio,
        image: values.image,
      })
        .then(() => {
          toast({ title: "Profile updated" });
          closeRef?.current?.click?.();
        })
        .catch(() =>
          toast({
            title: "Something went wrong",
            description: "Please try again later",
            variant: "destructive",
          }),
        );

      if (values.email !== user.email) {
        if (self) {
          signOut();
        }
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          {pathname !== `/admin/${user.username}/edit` ? (
            <span>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </span>
          ) : (
            <span>Make changes to {user.username}&apos;s profile here.</span>
          )}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="display_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Display Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormDescription>
                    You&apos;ll be logged out once you change your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isPending}
                      placeholder="User bio"
                      {...field}
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>Edit your profile image</FormLabel>
                  <FormControl>
                    <EditImage userId={user.id} initialImage={user.image} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex flex-col items-end">
            <Button disabled={isPending} type="submit" variant="outline">
              {isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
