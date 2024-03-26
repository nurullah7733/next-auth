"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const session = useSession();
  const [error, setError] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!email) {
      setError("Email is required");
    } else if (!password) {
      setError("Password is required");
    } else {
      let result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      console.log(result, "result");

      if (result?.error === "CredentialsSignin") {
        setError("Invalid Credentials");
      } else {
        setError(result?.error as string);
      }
      if (result?.ok) {
        router.replace("/dashboard");
      }
    }
  };

  const GithubSignin = () => {
    signIn("github");
  };

  const GoogleSignin = () => {
    signIn("google");
  };

  const FacebookSignin = () => {
    signIn("facebook");
  };

  return (
    <div className="mx-auto container   py-2">
      <div className="    flex justify-center w-full">
        <div className="bg-red-300 p-10">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
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
                value="Login"
                className="border bg-slate-50 text-black"
              />
            </div>
          </form>
          <p className="py-2 flex justify-center">---------or----------</p>
          <div className="flex gap-2">
            <button className="border p-2 " onClick={FacebookSignin}>
              Facebook
            </button>
            <button className="border p-2 " onClick={GoogleSignin}>
              Google
            </button>
            <button className="border p-2 " onClick={GithubSignin}>
              Github
            </button>
          </div>
          <Link href={"/register"} className="flex justify-center pt-3">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
