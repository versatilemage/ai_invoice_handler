import { ReusableTime } from ".";
import { Document } from "mongoose";

export interface invoicesHandlerType extends ReusableTime, Document {
    file_name: string;
    file_url: string;
    invoice_data: Record<string, any>;
    marker: string;
}
