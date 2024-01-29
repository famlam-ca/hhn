"use server";

const username = process.env.PROXMOX_API_USERNAME!;
const password = process.env.PROXMOX_API_PASSWORD!;

const urlencoded = new URLSearchParams();
urlencoded.append("username", username);
urlencoded.append("password", password);

const requestOptions = {
  method: "POST",
  body: urlencoded,
  redirect: "follow" as RequestRedirect,
};

export const fetchAccessTicket = async () => {
  const url = `${process.env.PROXMOX_API_URL}access/ticket`;

  try {
    const res = await fetch(url, requestOptions);
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch access ticket:", {
        cause: `${data.message}`,
      });
    }

    const csrfToken = data.data.CSRFPreventionToken;
    const accessTicket = data.data.ticket;

    return { csrfToken, accessTicket };
  } catch (error) {
    console.error("Error in fetchAccessTicket: ", error); // debug
    throw new Error("Error in fetchAccessTicket: ", { cause: error });
  }
};
