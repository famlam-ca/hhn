"use client";

import { useEffect, useState } from "react";

import { getAllUsers } from "@/server/user";

import { Admin } from "./_components/admin";
import { Users } from "./_components/columns";

async function getData(): Promise<Users[]> {
  const userData = await getAllUsers();
  return userData;
}

const AdminPage = () => {
  const [data, setData] = useState<Users[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getData();
      setData(userData);
    };

    fetchUserData();
  }, []);

  return <Admin data={data} />;
};

export default AdminPage;
