import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import connectMongo from "@/lib/Database";
import Invoice from "@/models/invoices";

import fs from "fs";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });

export async function POST(req: Request) {
  try {
    await connectMongo();

    const formData = await req.formData();
    const file = formData.get("invoice");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: "Invalid file upload" },
        { status: 400 }
      );
    }

    const UPLOAD_DIR = `public/uploads`;

    const buffer = Buffer.from(await file.arrayBuffer());

    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR);
    }

    fs.writeFileSync(path.resolve(UPLOAD_DIR, (file as File).name), buffer);

    const arrayBuffer = await file.arrayBuffer();

    const previewUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${file.name}`;

    const fileName = file.name;

    const result = await model.generateContent([
      {
        inlineData: {
          data: Buffer.from(arrayBuffer).toString("base64"),
          mimeType: "application/pdf",
        },
      },
      "Extract the given invoice and give me the data of the invoice in data type of JSON",
    ]);

    const rawSummary = result.response.text();
    let parsedSummary;

    try {
      const jsonString = rawSummary.replace(/```json|```/g, "").trim();
      parsedSummary = JSON.parse(jsonString);
    } catch (parseError) {
      console.error("Failed to parse the summary:", parseError);
      return NextResponse.json(
        { error: "Failed to parse the summary into JSON" },
        { status: 500 }
      );
    }

    const newInvoice = new Invoice({
      file_name: fileName,
      file_url: previewUrl,
      invoice_data: parsedSummary,
      marker: process.env.NEXT_PUBLIC_MARKER,
    });

    await newInvoice.save();

    return NextResponse.json({
      message: "Invoice saved successfully",
      data: {
        filename: fileName,
        file_url: previewUrl,
        invoice_data: parsedSummary,
      },
    });
  } catch (error) {
    console.error("Error processing file:", error);
    return NextResponse.json(
      { error: "Failed to process the uploaded file" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectMongo();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const invoices = await Invoice.aggregate([
      { $sort: { created_at: -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $match: {
          marker: process.env.NEXT_PUBLIC_MARKER,
        },
      },
    ]);

    const totalInvoices = await Invoice.countDocuments({
      marker: process.env.NEXT_PUBLIC_MARKER,
    });

    const totalPages = Math.ceil(totalInvoices / limit);

    return NextResponse.json(
      {
        data: invoices,
        pagination: {
          totalInvoices,
          totalPages,
          currentPage: page,
          perPage: limit,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return NextResponse.json(
      { error: "Failed to fetch invoices" },
      { status: 500 }
    );
  }
}
