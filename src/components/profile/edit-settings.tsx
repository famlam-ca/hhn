"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { updateUser } from "@/server/user";
import { CustomUser } from "@/types/types";

type Theme = "dark" | "light";

interface SettingsProps {
  user: CustomUser;
}

export const EditSettings = ({ user }: SettingsProps) => {
  const pathname = usePathname();
  const { setTheme } = useTheme();

  const [valueTheme, setValueTheme] = useState<string>(user.theme);
  const [isPending, startTransition] = useTransition();

  const schema = z.object({
    theme: z.enum(["dark", "light"]).optional(),
  });

  const defaultValues = {
    theme: user.theme as Theme,
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
        theme: values.theme,
      })
        .then(() => {
          // TODO: Dynamically render updated info
          toast({ title: "Profile settings updated." });
          setTheme(values.theme as Theme);
        })
        .catch(() =>
          toast({
            title: "Something went wrong",
            description: "Please try again later",
            variant: "destructive",
          }),
        );
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          {pathname !== `/admin/${user.username}/edit` ? (
            <span>Customize your experience here.</span>
          ) : (
            <span>Customize {user.username}&apos;s experience here.</span>
          )}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Theme</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={(value) => {
                        setValueTheme(value);
                        field.onChange(value);
                      }}
                      defaultValue={user.theme}
                    >
                      <SelectTrigger>
                        <div className="capitalize">{valueTheme}</div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Choose between dark and light mode.
                  </FormDescription>
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
