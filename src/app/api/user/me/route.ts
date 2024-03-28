import { connect } from "@/dbConfig/db";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  // Get the token from the request
  const userid = getDataFromToken(request);
  const user = User.findById({ _id: userid }).select("-password");
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ user }, { status: 200 });
}
