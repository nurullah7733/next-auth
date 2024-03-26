"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  let [error, setError] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    if (!email) {
      setError("Email is required");
    } else if (!password) {
      setError("Password is required");
    } else {
      setError("");
      const response = await fetch("/api/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 400) {
        setError(data);
      } else if (response.status === 200) {
        router.push("/login");
      } else {
        setError("Something went wrong");
      }
    }
  };
  return (
    <div>
      <div className="mx-auto   max-w-5xl py-5">
        <div className="bg-red-300 p-10">
          <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <p className="text-red-500">{error && error}</p>
            <div className="py-2 flex flex-col max-w-64">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="email"
                className="px-2 text-black"
              />
            </div>
            <div className="py-2 flex flex-col max-w-64">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="password"
                className="px-2 text-black"
              />
            </div>
            <div className="py-2 flex flex-col max-w-64">
              <input
                type="submit"
                value="Register"
                className="border bg-slate-50 text-black"
              />
            </div>
          </form>
          <Link href={"/login"}>Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
