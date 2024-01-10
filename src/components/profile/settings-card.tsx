"use client";

import { FormEvent, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Loader2 } from "lucide-react";

import { updateUser } from "@/server/user";
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
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

type Theme = "dark" | "light";

interface SettingsCardProps {
  userTheme: string;
}

export const SettingsCard = ({ userTheme }: SettingsCardProps) => {
  const { setTheme } = useTheme();

  const [valueTheme, setValueTheme] = useState<string>(userTheme);

  const [isPending, startTransition] = useTransition();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateUser({
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
        <CardDescription>Customize your experience here.</CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-2">
          <div className="space-y-2">
            <Label>Theme</Label>
            <Select
              onValueChange={(value) => {
                setValueTheme(value);
              }}
              defaultValue={userTheme}
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
