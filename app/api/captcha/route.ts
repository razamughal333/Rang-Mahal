import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request, response: Response) {
  const secretKey = process?.env?.RECAPTCHA_SECRET_KEY;

  const postData = await request.json();
  const { gRecaptchaToken, phone } = postData;

  console.log(
    "gRecaptchaToken,phone",
    gRecaptchaToken?.slice(0, 10) + "...",
    phone
  );

  let res: any;
  const formData = `secret=${secretKey}&response=${gRecaptchaToken}`;
  try {
    res = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  } catch (e) {
    console.log("recaptcha error:", e);
  }

  if (res && res.data?.success && res.data?.score > 0.5) {
    // Save data to the database from here
    console.log("Saving data to the database:", phone);
    console.log("res.data?.score:", res.data?.score);

    return NextResponse.json({
      success: true,
      phone,
      score: res.data?.score,
    });
  } else {
    console.log("fail: res.data?.score:", res.data?.score);
    return NextResponse.json({ success: false, phone, score: res.data?.score });
  }
}
