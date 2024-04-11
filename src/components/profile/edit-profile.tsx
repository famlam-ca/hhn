"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { BadgeCheck, Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { ElementRef, useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Hint } from "@/components/hint";
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
import { toast } from "@/components/ui/use-toast";
import {
  invalidateAllUserSessions,
  sendNewVerificationEmail,
  signOut,
} from "@/lib/services/auth-service";
import { getSelf, updateUser } from "@/lib/services/user-service";
import { CustomUser } from "@/types";
import { EditProfileSchema } from "@/types/edit-user-schema";

import { EditImage } from "./edit-image";

interface ProfileProps {
  user: CustomUser;
}

export const EditProfile = ({ user }: ProfileProps) => {
  const pathname = usePathname();
  const closeRef = useRef<ElementRef<"button">>(null);

  const [isPending, startTransition] = useTransition();
  const isEmailVerified = user.isEmailVerified;

  const defaultValues = {
    display_name: user.display_name,
    email: user.email,
    bio: user.bio,
    image: user.image,
  };

  const form = useForm<z.infer<typeof EditProfileSchema>>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues,
  });

  const onSubmit = (values: z.infer<typeof EditProfileSchema>) => {
    const allValuesUnchanged = Object.entries(values).every(
      ([key, value]) =>
        defaultValues[key as keyof typeof defaultValues] === value,
    );

    if (allValuesUnchanged) {
      toast({
        title: "No changes have been submitted.",
      });
      return;
    }

    startTransition(async () => {
      const self = await getSelf();

      updateUser({
        id: user.id,
        email: values.email,
        display_name: values.display_name,
        bio: values.bio,
        image: values.image,
      })
        .then(() => {
          const updatedFields = [];
          if (values.display_name !== user.display_name) {
            updatedFields.push("Display name");
          }
          if (values.email !== user.email) {
            updatedFields.push("Email");
          }
          if (values.bio !== user.bio) {
            updatedFields.push("Bio");
          }

          let updatedFieldsStr = updatedFields.join(", ");
          if (updatedFields.length > 1) {
            const lastComma = updatedFieldsStr.lastIndexOf(",");
            updatedFieldsStr = `${updatedFieldsStr.substring(0, lastComma)} and${updatedFieldsStr.substring(lastComma + 1)}`;
          }

          toast({
            title: `${updatedFieldsStr} updated.`,
            description:
              values.email !== user.email &&
              `A new verification email was sent to ${values.email}.`,
          });
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
        await sendNewVerificationEmail(values.email);
        invalidateAllUserSessions(user.id);
        if (self.id === user.id) {
          signOut({ callbackUrl: "/auth/sign-in" });
        }
      }
    });
  };

  const onClick = async () => {
    const res = await sendNewVerificationEmail(user.email);

    if (res.error) {
      toast({
        title: res.error,
        variant: "destructive",
      });
    } else if (res.success) {
      toast({
        title: res.success,
      });
    }
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
                    <div className="relative">
                      <Input placeholder="Email" {...field} />
                      {isEmailVerified === true && (
                        <Hint label="Verified" side="left" asChild>
                          <BadgeCheck className="absolute right-2 top-1/4 h-5 w-5 text-primary" />
                        </Hint>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    <span className="flex justify-between">
                      You&apos;ll be logged out once you change your email.
                      {isEmailVerified === false && (
                        <Button
                          type="button"
                          variant="link"
                          onClick={() => onClick()}
                          className="h-4 p-0 text-sm"
                        >
                          Send new verification email
                        </Button>
                      )}
                    </span>
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
