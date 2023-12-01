import Image from "next/image";
import Link from "next/link";
import { Cloud, LifeBuoy, Mail, Phone, Settings, User } from "lucide-react";

import { Avatar, AvatarFallback } from "../ui/Avatar";
import { Button } from "../ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/DropdownMenu";
import { Icons } from "../Icons";
import { SignOut } from "../auth/Button";
import { ThemeToggle } from "@/hooks/useTheme";

interface UserAccountNavProps {
  email: string | undefined;
  imageUrl: string;
  name: string;
  role: string;
}

const UserAccountNav = ({
  email,
  imageUrl,
  name,
  role,
}: UserAccountNavProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Button
          variant="ghost"
          className="aspect-square h-8 w-6 rounded-full bg-transparent ring-2 ring-primary ring-offset-2"
        >
          <Avatar className="relative h-8 w-8">
            {imageUrl ? (
              <div className="relative aspect-square h-full w-full">
                <Image
                  fill
                  src={imageUrl}
                  alt="profile picture"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <AvatarFallback>
                <Icons.user className="h-4 w-4 text-text" />
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-background" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            {name && <p className="text-sm font-medium text-text">{name}</p>}
            {email && (
              <p className="w-[200px] truncate text-xs text-muted">{email}</p>
            )}
            {role && <p className="text-xs capitalize text-muted">{role}</p>}
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <p className="text-muted">Account</p>
          </DropdownMenuLabel>

          <DropdownMenuItem asChild>
            <Link href="/account/profile">
              <User className="mr-2 h-5 w-5" />
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/account/inbox">
              <Mail className="mr-2 h-5 w-5" />
              Email
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/account/settings">
              <Settings className="mr-2 h-5 w-5" />
              Settings
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <ThemeToggle className="w-full" />
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <p className="text-muted">Support</p>
          </DropdownMenuLabel>

          <DropdownMenuItem asChild>
            <Link href="/contact">
              <LifeBuoy className="mr-2 h-5 w-5" />
              Support
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/contact">
              <Phone className="mr-2 h-5 w-5" />
              Contact
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem disabled={role !== "admin"}>
            <Cloud className="mr-2 h-5 w-5" />
            API
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <SignOut className="w-full" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
