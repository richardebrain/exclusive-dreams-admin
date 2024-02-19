import { NextResponse } from "next/server";

const nodemailer = require("nodemailer");
type RequestBody = {
  to: string;
  subject: string;
  text: string;
  html: string;
};
export async function POST(req: Request) {
  const body: RequestBody = await req.json();
  console.log(body, "body");
  let message = {
    from: "exclusivedreamsllc01@gmail.com",
    to: body.to,
    subject: body.subject,
    text: body.text,
    html: body.html,
    date: new Date(),
  };

  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: "exclusivedreamsllc01@gmail.com",
      pass: "unjiuoddajvxtsxq",
    },
  });

  try {
    const res = await transporter.sendMail(message);
    console.log(res, "response from server");
    if (res.messageId) {
      return NextResponse.json({ message: res.messageId });
    } else {
      return NextResponse.json({ error: res }, { status: 500 });
    }
  } catch (err) {
    console.log(err);
  }
}
