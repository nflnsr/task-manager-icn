"use server";

export async function serverFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/api`;
  const response = await fetch(`${baseUrl}${url}`, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json() as Promise<T>;
}
