import mongooseConnection from "@/config/connectDB";
import { validateFieldMaxLength,validate } from "@/helpers/validateField";
import Client from "@/models/client.models";
import { NextRequest, NextResponse } from "next/server";

function generateSlug(title:string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')  // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '')  // Remove non-word characters
    .replace(/\-\-+/g, '-');  // Replace multiple hyphens with a single hyphen
}

export async function POST(reques: NextRequest) {
  const { name, email, password, mobile, clientType } = await reques.json();
  try {

    validateFieldMaxLength(name, "name", 3, 100);
    validate(email, "email");
    validate(mobile, "mobile");
    validateFieldMaxLength(password, "password", 6, 20);
    validate(clientType, "clientType");

    await mongooseConnection();

    const client = await Client.findOne({ email });

    if (client) {
      return NextResponse.json(
        {
          error: "Email already exists",
        },
        { status: 400 }
      );
    }

    const roles = await Client.find();
    const findUnique = roles?.find((role) => role.role == "admin");

    if (!findUnique) {
      await Client.create({
        name,
        email,
        password,
        mobile,
        clientType,
        role: "admin",
        slug: generateSlug(name),
      });

      return NextResponse.json(
        { message: "client created you are admin now" },
        { status: 201 }
      );
    }

    await Client.create({ name,
      email,
      password,
      mobile,
      clientType,
      slug: generateSlug(name),
     });

    return NextResponse.json({ message: "Client created" }, { status: 201 });

    
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
