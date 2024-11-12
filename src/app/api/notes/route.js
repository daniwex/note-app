import { connectMongoose } from "../../db/database";
import note from "../../db/schema/note";
import { cookies } from "next/headers";
import { decrypt } from "../../lib/session";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  try {
    await connectMongoose();
    const newNote = await note.find({user:session.userId});
    NextResponse.json({notes:newNote},{status:200})
  } catch (error) {
    console.log(error);
  }
};

export const POST = async (req) => {
  const { noteTitle, noteTags, noteBody } = await req.json();
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  try {
    await connectMongoose();
    const newNote = await new note({
      user: session.userId,
      title: noteTitle,
      tags: [...tags, ...noteTags],
      body: noteBody,
    });
    newNote.save();
    NextResponse.json({message:"note successfully saved"},{status:200})
  } catch (error) {
    console.log(error);
  }
};
