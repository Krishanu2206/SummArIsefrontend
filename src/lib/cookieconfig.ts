export const cookieconfig = {
  expires : new Date(Date.now() + 7 * 24 * 60 * 60), // 1 hour
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};