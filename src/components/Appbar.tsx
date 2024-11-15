"use client";

import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Appbar = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // State to track loading

  const logout = async () => {
    setIsLoading(true); // Show loading text
    try {
      await axios.get("/api/users/logout");
      router.push("/signin");
      toast.success("Logout Successfully");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false); // Hide loading text
    }
  };

  return (
    <div className="border-b flex justify-between px-10 py-4 mb-4">
      <Link
        href={"/cars/list"}
        className="flex flex-col justify-center cursor-pointer font-bold italic"
      >
        Dashboard
      </Link>

      <div className="flex justify-center ">
        <Link href={"/cars/create"}>
          <button className="bg-transparent mr-5 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded text-xl  dark:text-gray-300">
            Add Car
          </button>
        </Link>

        <button
          onClick={logout}
          type="button"
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? "Loading..." : "Logout"}
        </button>
      </div>
    </div>
  );
};

export default Appbar;
