import mongooseConnection from "@/config/connectDB";
import { validate, validateFieldMaxLength } from "@/helpers/validateField";
import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request: NextRequest) {
    const { name, email, password, mobile } = await request.json();
    try {
        validateFieldMaxLength(name, "name", 3, 100);
        validate(email, "email");
        // validate(mobile, "mobile");
        validateFieldMaxLength(password, "password", 6, 40);

        await mongooseConnection();

        const findUserEmail = await User.findOne({ email });

        if(findUserEmail) {
            return NextResponse.json(
                {
                    error: "Email already exists",
                },
                { status: 400 },
            );
        }

        const create = await User.create({
            name,
            email,
            password,
            mobile,
        });

        if (!create) {
            return NextResponse.json(
                {
                    error: "failed to create user",
                },
                { status: 400 },
            );
        }

        return NextResponse.json(
            {
                result: create,
                message: "success",
            },
            { status: 201 },
        );
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
