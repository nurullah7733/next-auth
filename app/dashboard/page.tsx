import React from "react";
import { getServerSession } from "next-auth";

const Dashboard = async () => {
  const session = await getServerSession();

  return (
    <div>
      <h1 className="text-3xl py-5 mx-auto container ">
        Welcome to Dashboard: {session?.user?.email}
      </h1>
    </div>
  );
};

export default Dashboard;
