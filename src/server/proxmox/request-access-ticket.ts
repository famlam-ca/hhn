"use server";

import axios from "axios";
import qs from "qs";

const credentials = qs.stringify({
  username: process.env.PROXMOX_API_USERNAME,
  password: process.env.PROXMOX_API_PASSWORD,
});

const config = {
  method: "post",
  maxBodyLength: Infinity,
  url: `${process.env.PROXMOX_API_URL}/access/ticket`,
  data: credentials,
};

export const getAccessTicket = () => {
  return axios
    .request(config)
    .then((res) => {
      const { CSRFPreventionToken, ticket } = res.data.data;
      return {
        csrfToken: CSRFPreventionToken,
        accessTicket: ticket,
      };
    })
    .catch((error: any) => {
      console.error("Failed to retrieve access ticket: ", error); // debug
      throw new Error("Failed to retrieve access ticket", { cause: error });
    });
};
