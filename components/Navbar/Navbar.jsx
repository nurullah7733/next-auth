"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
const Navbar = () => {
  const session = useSession();

  return (
    <div className="bg-green-300">
      <div className=" container mx-auto px-4">
        <div className="flex justify-between py-2">
          <div>
            <Link href="/">
              <h1 className="text-3xl font-bold">Next Auth</h1>
            </Link>
          </div>
          <div>
            <ul className="flex justify-between py-2 gap-3">
              <Link href="/">
                <li>Home</li>
              </Link>

              <Link href="/dashboard">
                <li>Dashboard</li>
              </Link>
              {session.status === "authenticated" ? (
                <p>{session.data?.user?.email}</p>
              ) : (
                <Link href="/login">
                  <li>Login</li>
                </Link>
              )}

              {session.status === "authenticated" && (
                <>
                  <li className="cursor-pointer" onClick={() => signOut()}>
                    Logout
                  </li>
                  <li className="">
                    <img
                      width={30}
                      height={30}
                      className="rounded-full"
                      src={session.data?.user?.image}
                    />
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
