import { NextResponse } from "next/server";
import connectMongo from "@/lib/Database";
import { Types } from "mongoose";
import Invoice from "@/models/invoices"; // Import the Invoice model

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await connectMongo(); // Connect to MongoDB
    console.log("id", id);
    // Fetch the specific invoice by ID
    const invoice = await Invoice.findOne({ _id: new Types.ObjectId(id) });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    // Return the invoice data in the response
    return NextResponse.json({
      message: "Invoice fetched successfully",
      data: invoice,
    });
  } catch (error) {
    console.error("Error fetching invoice:", error);
    return NextResponse.json(
      { error: "Failed to fetch invoice" },
      { status: 500 }
    );
  }
}
