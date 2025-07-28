import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const name = formData.get("name") as string;
    const lastname = formData.get("lastname") as string;
    const birthdate = formData.get("birthdate") as string;
    const nationalCode = formData.get("nationalCode") as string;
    const nationalCard = formData.get("nationalCard") as File;

    console.log({ name, lastname, birthdate, nationalCode, nationalCard });

    // Here you can add your registration logic
    // For example, save to database, validate data, etc.

    return NextResponse.json({ 
      success: true,
      message: "ثبت نام با موفقیت انجام شد" 
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { 
        success: false,
        message: "خطا در ثبت نام" 
      },
      { status: 400 }
    );
  }
}
