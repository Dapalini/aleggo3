import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import { createUser } from '@/types/userTypes';

export async function GET() {
  try {
    await connectMongoDB();
    const User = await createUser();
    const users = await User.find();
    console.log("In server function", users);
    return NextResponse.json({ message: "Users gotten", users }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, company, postTitle, role, email, homeAddress, workTelephone, privateTelephone, dutiesSkills, userNotes } = body;

    console.log("It is happening!!", dutiesSkills, body);

    // Validate user data
    if (!name || !role || !email) {
      return NextResponse.json({ message: "Name, role, and email are required fields" }, { status: 400 });
    }

    await connectMongoDB();
    const User = await createUser();

    // Check if the user already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 });
    }

    // Create user document
    const user = await User.create({
      name,
      company: company || '', // Default to empty string if undefined
      postTitle: postTitle || '', // Default to empty string if undefined
      role,
      email,
      homeAddress: homeAddress || '', // Default to empty string if undefined
      workTelephone: workTelephone || '', // Default to empty string if undefined
      privateTelephone: privateTelephone || '', // Default to empty string if undefined
      dutiesSkills: dutiesSkills || [], // Default to empty array if undefined
      userNotes: userNotes || '' // Default to empty string if undefined
    });

    console.log("After creation", user);

    return NextResponse.json({ message: "User created", user }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}
