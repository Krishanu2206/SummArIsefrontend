export const cookieconfig = {
  expires : new Date(Date.now() + 7 * 24 * 60 * 60), // 1 week
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};
// in nextjs these expiration periods are set in seconds