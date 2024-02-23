import { OrderType, ProductCheckoutType } from "@/utils/type";
import { NextResponse } from "next/server";
import path from "path";
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
import fs from "fs";
const dotenv = require("dotenv");
dotenv.config();

type RequestBody = {
  statusType:
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "order placed";
  orderDetails: OrderType;
};
export async function POST(req: Request) {
  const { orderDetails, statusType }: RequestBody = await req.json();
  console.log(orderDetails, "orderDetails", statusType, "statusType");
  const subjectMessage =
    statusType === "order placed"
      ? "placed"
      : statusType === "processing"
      ? "processed"
      : statusType === "shipped"
      ? "shipped"
      : statusType === "delivered"
      ? "delivered"
      : "cancelled";
  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: "exclusivedreamsllc01@gmail.com",
      pass: "unjiuoddajvxtsxq",
    },
  });
const emailDir = fs.readdirSync(path.resolve("./src/views"));  
console.log(emailDir, "emailDir");
const handlebarsOptions = {
  viewEngine: {
    partialsDir: path.resolve("./src/views"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./src/views"),
  extName: ".hbs",
};
  transporter.use("compile", hbs(handlebarsOptions));
  const mailOptions = {
    from: "exclusivedreamsllc01@gmail.com",
    to: orderDetails.email,
    subject: `Your Exclusive Dreams Order ${orderDetails.orderId} has been ${subjectMessage}`,
    context: {
      orderNo: orderDetails.orderId,
      status: statusType,
      name: orderDetails.shipping.name,
      shipping: orderDetails.shipping,
      orderItems: orderDetails.totalItems,
      totalAmount: orderDetails.amount.toLocaleString("en-us", {
        currency: "usd",
      }),
    },
  };
  try {
    const res = await transporter.sendMail(mailOptions);
    console.log(res, "response from server");
    if (res.messageId) {
      return NextResponse.json({ message: res.messageId });
    } else {
      return NextResponse.json({ error: res }, { status: 500 });
    }
  } catch (err) {
    console.log(err, "error");
  }
}
