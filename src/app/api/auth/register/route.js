import { connectMongoose } from "@/app/db/database";
import bcrypt from "bcryptjs";
import user from "../../../db/schema/user"
import { NextResponse } from "next/server";

export async function POST(req, res) {

  if (req.method === "POST") {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" });
    }

    await connectMongoose();

    // Check if user already exists
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" },{status:400});
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await new user({
      email,
      password: hashedPassword,
    });


    try {
      newUser.save();
      return NextResponse.json({ message: "User registered successfully" },{status:200});
    } catch (error) {
      return NextResponse.json({ message: "Internal server error" },{status:500});
    }
  } else {
    return NextResponse.json({ message: "Method not allowed" }, {status:405});
  }
}
