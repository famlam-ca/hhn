export type Role = "admin" | "superuser" | "user";
export type Theme = "dark" | "light";

export type CustomUser = {
  id: string;
  display_name: string;
  username: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  isEmailVerified: boolean;

  image: string;
  role: Role;
  bio: string;
  theme: Theme;
};

export type FakeUser = {
  id: string;
  display_name: string;
  username: string;
  role: string;
};

export type ServerType = "lxc" | "qemu";

export interface ServerData {
  name: string;
  status: string;
  cpu: number;
  cpus: number;
  mem: number;
  maxmem: number;
  uptime: number;
  vmid: number;
  type?: ServerType;
}

export type NodeData = {
  id: string;
  node: string;
  type: string;
  status: string;
  cpu: number;
  maxcpu: number;
  mem: number;
  maxmem: number;
  disk: number;
  maxdisk: number;
  uptime: number;
};

export type EmailTemplates =
  | "TestEmail"
  | "VerifyEmail"
  | "ResetPassword"
  | "PasswordWasReset"
  | "SupportTicket";
