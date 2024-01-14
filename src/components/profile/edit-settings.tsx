"use client";

import { Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
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

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateUser({
        id: user.id,
        theme: valueTheme as Theme,
      })
        .then(() => {
          // TODO: Dynamically render updated info
          toast({ title: "Settings updated" });
          setTheme(valueTheme);
        })
        .catch(() => {
          toast({
            title: "Something went wrong",
            description: "Please try again later",
            variant: "destructive",
          });
        });
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
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-2">
          <div className="space-y-2">
            <Label>Theme</Label>
            <Select
              onValueChange={(value) => {
                setValueTheme(value);
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
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-end">
          <Button disabled={isPending} type="submit" variant="outline">
            {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Save"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
