import { connect } from "@/dbConfig/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.TOKEN_SECRET!,
      {
        expiresIn: "30d",
      }
    );
    const response = NextResponse.json(
      { message: "logged in seccessfully", success: true },
      { status: 200 }
    );
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
