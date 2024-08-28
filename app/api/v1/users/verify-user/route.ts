import { mailBody } from "@/helpers/mailBody";
import { sendEmails } from "@/helpers/mailService";
import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
    const { email, vcode,sendAgain } = await request.json();

    try {
        const user = await User.findOne({
            email: email,
        });
        if (!user) {
            return NextResponse.json(
                { error: "User not found." },
                { status: 404 },
            );
        }


       if(sendAgain == 'sendAgain'){
         // check already active account
         if (user?.verifyed === "active") {
            return NextResponse.json(
                {
                    error: "User already verified.",
                    message: "User already verified.",
                },
                { status: 404 },
            );
        }

        const randomNumber = Math.floor(100000 + Math.random() * 9000).toString();
        const verify = await User.findByIdAndUpdate(
            user._id,
            {
                $set: {
                    vcode: randomNumber,
                },
            },

            { new: true },
        );

        const htmlBody = mailBody({ code: verify.vcode, email: verify.email });

        // Send verification code
           await sendEmails(
            verify?.email,
            "Verification Code",
            htmlBody,
        );
        

        return NextResponse.json(
            { result: "success", message: "Code sent successfully. Please check your email." },
            { status: 200 },
        );
       }else{
        
         // check already active account
         if (user?.verifyed === "active") {
            return NextResponse.json(
                {
                    error: "User already verified.",
                    message: "User already verified.",
                },
                { status: 404 },
            );
        }

        if (user?.vcode !== vcode) {
            return NextResponse.json(
                { error: "Code not matched.", message: "Code not matched." },
                { status: 404 },
            );
        }

        const verify = await User.findByIdAndUpdate(
            user._id,
            {
                $set: {
                    verifyed: "active",
                },
            },

            { new: true },
        );

        if (!verify) {
            return NextResponse.json(
                { error: "User not found.", message: "User not found." },
                { status: 404 },
            );
        }

        return NextResponse.json(
            { result: "success", message: "User verified." },
            { status: 200 },
        );
       }
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message },
            { status: 500 },
        );
    }
}
