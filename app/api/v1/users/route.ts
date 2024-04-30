import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  try {
    return NextResponse.json(
      {
        message: "success",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
