export type CustomUser = {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;

  image: string;
  role: string;
  bio: string | null;
  theme: string;
};

export type ServerData = {
  name: string;
  status: string;
  cpu: number;
  mem: number;
  uptime: number;
  vmid: number;
};
