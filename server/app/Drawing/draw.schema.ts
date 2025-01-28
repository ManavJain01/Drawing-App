import mongoose, { Schema, Document } from 'mongoose';

// Drawing interface to type the Mongoose model
interface IDrawing extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  drawing: string;
  textItems: Array<Object>;
  createdAt: Date;
}

const drawingSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    drawing: { type: String, required: true },
    textItems: { type: Object },
    createdAt: { type: Date, default: Date.now },
  },
);

const Drawing = mongoose.model<IDrawing>('Drawing', drawingSchema);

export default Drawing;
