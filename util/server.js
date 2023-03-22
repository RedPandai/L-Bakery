const server =
  process.env.NODE_ENV === "production"
    ? "https://jingyang-l-bakery.vercel.app"
    : "http://localhost:3000";
export default server;
