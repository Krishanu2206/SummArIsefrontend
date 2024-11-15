import { getStrapiURL } from "@/lib/strapi-imagehelper";
import { RegisterUserProps, LoginUserProps } from "@/types/auth-types";
const baseUrl = getStrapiURL();

export async function registerUserService(userData: RegisterUserProps) {
  const url = new URL("/api/auth/local/register", baseUrl);

  try {
    const response = await fetch(url.href, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Registration Service Error:", error);
    throw error;
  }
}

export async function loginUserService(userData: LoginUserProps) {
  const url = new URL("/api/auth/local", baseUrl);

  try {
    const response = await fetch(url.href, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Login Service Error:", error);
    throw error;
  }
}

