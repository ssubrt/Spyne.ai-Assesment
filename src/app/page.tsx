"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { ProgressBar } from "react-loader-spinner";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /signup on component mount
    router.push("/signup");
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <ProgressBar
        visible={true}
        height="80"
        width="80"
        barColor="#4fa94d"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
