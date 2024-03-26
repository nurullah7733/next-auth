import bcrypt from "bcrypt";
import connectDB from "@/utils/db/db";
import UserModel from "@/models/userModel/userModel";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;
  await connectDB();

  if (!email) {
    return NextResponse.json("Email is required", { status: 400 });
  }

  try {
    const exitsUser = await UserModel.findOne({ email });
    if (exitsUser) {
      return NextResponse.json("User already exists", { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 5);
    await UserModel.create({
      email,
      provider: "credentials",
      password: hashedPassword,
    });

    return NextResponse.json("User create success", { status: 200 });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json("Failed to create user", { status: 500 });
  }
}
