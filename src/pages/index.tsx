// pages/index.js

import { useEffect } from "react";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the target page, e.g., /dashboard
    router.push("/dashboard");
  }, [router]);

  return null; // Or return a loading indicator if needed
};

export default Home;
