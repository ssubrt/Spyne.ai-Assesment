"use client";

import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SignupInput } from "./TypeCheck";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const [error, setError] = useState<string>("");

  const [postInputs, setPostInputs] = useState<SignupInput>({
    email: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    // Enable the button only if email and password are not empty
    setButtonDisabled(!(postInputs.email && postInputs.password));
  }, [postInputs]);

  async function sendRequest() {
    setIsLoading(true); // Show loading text
    try {
      const response = await axios.post(
        `/api/users/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      console.log("Login Success:", response.data);

      toast.success(
        type === "signup" ? "Signed Up, Welcome!" : "Signed In Successfully"
      );
      router.push("/cars/list");
    } catch (error) {
      console.error("Invalid Credentials:", error);
      setError("Invalid Credentials");
      toast.error("Error: Check Credentials");
    } finally {
      setIsLoading(false); // Reset loading text
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">
              {type === "signup" ? "Create an Account" : "Sign In to Your Account"}
            </div>

            <div className="text-slate-400">
              {type === "signin"
                ? "Don't have an account?"
                : "Already have an account?"}
              <Link
                className="pl-2 underline"
                href={type === "signin" ? "/signup" : "/signin"}
              >
                {type === "signin" ? "Sign up" : "Sign in"}
              </Link>
            </div>
          </div>

          <div className="pt-6">
            {type === "signup" && (
              <LabelledInput
                label="Name"
                placeholder="Your Name..."
                onChange={(e) => setPostInputs({ ...postInputs, name: e.target.value })}
              />
            )}

            <LabelledInput
              label="Email"
              placeholder="example@gmail.com"
              onChange={(e) => setPostInputs({ ...postInputs, email: e.target.value })}
            />

            <LabelledInput
              label="Password"
              type="password"
              placeholder="********"
              onChange={(e) => setPostInputs({ ...postInputs, password: e.target.value })}
            />

            <button
              type="button"
              onClick={sendRequest}
              className="w-full mt-8 text-white bg-gray-800 hover:bg-gray-900 
                        focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg 
                        text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700
                         dark:focus:ring-gray-700 dark:border-gray-700"
              disabled={buttonDisabled || isLoading} // Disable button during loading or if inputs are invalid
            >
              {isLoading ? "Loading..." : type === "signup" ? "Sign Up" : "Sign In"}
            </button>

            {error && (
              <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string; // Optional type for password input
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
  return (
    <div>
      <label
        className="block mb-2 text-sm font-bold text-gray-900 dark:text-white pt-4"
      >
        {label}
      </label>

      <input
        onChange={onChange}
        type={type || "text"}
        id={label.toLowerCase()}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
          rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
