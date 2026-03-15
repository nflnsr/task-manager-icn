"use server";

import { cookies } from "next/headers";

async function getRefreshToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")?.value;

  return token;
}

async function setRefreshToken(refreshToken: string) {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "refreshToken",
    value: refreshToken,
    httpOnly: true,
  });
}

async function clearRefreshToken() {
  const cookieStore = await cookies();
  cookieStore.delete("refreshToken");
}

async function hitRefreshToken() {
  const refreshToken = await getRefreshToken();
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/users/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `refreshToken=${refreshToken}`,
    },
  });

  return response.json();
}


export { getRefreshToken, setRefreshToken, clearRefreshToken, hitRefreshToken };