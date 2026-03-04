export const getBaseUrl = () => {
  // In development, always use localhost
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  // In production, use custom domain if set, otherwise fall back to Vercel URL
  return (
    process.env.NEXT_PUBLIC_APP_URL ||
    `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  );
};
