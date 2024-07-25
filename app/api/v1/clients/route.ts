import mongooseConnection from "@/config/connectDB";
import Client from "@/models/client.models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(reques: NextRequest) {
  const { name, email, password, mobile, clientType } = await reques.json();

  if (name == "" || !name) {
    return NextResponse.json(
      {
        error: "name is required",
      },
      {
        status: 400,
      }
    );
  } else if (name.length > 30) {
    return NextResponse.json(
      {
        error: "name must be less than 30 characters",
      },
      {
        status: 400,
      }
    );
  } else if (email == "" || !email) {
    return NextResponse.json(
      {
        error: "email is required",
      },
      {
        status: 400,
      }
    );
  } else if (mobile == "" || !mobile) {
    return NextResponse.json(
      {
        error: "mobile is required",
      },
      {
        status: 400,
      }
    );
  } else if (mobile.length != 11) {
    return NextResponse.json(
      {
        error: "mobile must be 11 characters",
      },
      {
        status: 400,
      }
    );
  } else if (password == "" || !password) {
    return NextResponse.json(
      {
        error: "password is required",
      },
      {
        status: 400,
      }
    );
  } else if (password.length < 6) {
    return NextResponse.json(
      {
        error: "password must be at least 6 characters",
      },
      {
        status: 400,
      }
    );
  } else if (password.length > 20) {
    return NextResponse.json(
      {
        error: "password must be less than 20 characters",
      },
      { status: 400 }
    );
  } else if (clientType == "" || !clientType) {
    return NextResponse.json(
      {
        error: "clientType is required",
      },
      {
        status: 400,
      }
    );
  }

  try {
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

    // if(user.role !== 'admin')

    if (!findUnique) {
      await Client.create({
        name,
        email,
        password,
        mobile,
        clientType,
        role: "admin",
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
      clientType, });

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
