"use server";

import jwt from "jsonwebtoken";
import { v4 } from "uuid";

import { getSelf, getUser } from "@/lib/services/user-service";

export const createUserToken = async (ownerIdentity: string) => {
  let self;
  self = await getSelf();
  if (!self) {
    const id = v4();
    const username = `guest-${Math.floor(Math.random() * 1000000)}`;
    self = { id, username };
  }

  // TODO: Change error to return statement
  const { user: owner } = await getUser({ userId: ownerIdentity });
  if (!owner) {
    throw new Error("Owner not found");
  }

  const isOwner = self.id === owner.id;

  const payload = {
    identity: isOwner ? `owner-${self.id}` : self.id,
  };

  const token = jwt.sign(payload, "en8Q6TLAdn55gDG3GD7Pj0Z3L6iyH6E6");

  return await Promise.resolve(token);
};
