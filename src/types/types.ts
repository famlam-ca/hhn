export type CustomUser = {
  id: string;
  display_name: string;
  username: string;
  first_name: string | null;
  last_name: string | null;
  email: string;

  image: string;
  role: string;
  bio: string;
  theme: string;
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
