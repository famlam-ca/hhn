"use client";

import { useEffect, useState } from "react";

import { getAllUsers } from "@/lib/user-service";

import { Admin } from "./_components/admin";
import { Users } from "./_components/columns";

async function getData(): Promise<Users[]> {
  const userData = await getAllUsers();
  return userData;
}

const AdminPage = () => {
  const [data, setData] = useState<Users[]>([]);

  useEffect(() => {
    const getUserData = async () => {
      const userData = await getData();
      setData(userData);
    };

    getUserData();
  }, []);

  return <Admin data={data} />;
};

export default AdminPage;
