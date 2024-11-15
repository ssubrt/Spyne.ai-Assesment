"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /signup on component mount
    router.push("/signup");
  }, [router]);

  return (
    <div>
      <Navbar />
    </div>
  );
}
