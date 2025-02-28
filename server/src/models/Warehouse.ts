import mongoose, { Document, Schema } from 'mongoose';

export interface IWarehouse extends Document {
  name: string;
  manager: mongoose.Types.ObjectId;
  items: {
    name: string;
    category: string;
    quantity: number;
    criticalLevel: number;
  }[];
}

const WarehouseSchema = new Schema<IWarehouse>({
  name: { type: String, required: true },
  manager: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    name: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, default: 0 },
    criticalLevel: { type: Number, required: true }
  }]
});

export default mongoose.model<IWarehouse>('Warehouse', WarehouseSchema);