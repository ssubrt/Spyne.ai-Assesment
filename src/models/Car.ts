import mongoose, { Schema, Document, Model } from 'mongoose';

interface ICar extends Document {
  title: string;
  description: string;
  tags: string[];
  images: string[];
  carType: string;
  company: string;
  dealer: string;
  createdAt: Date;
}

const CarSchema: Schema<ICar> = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  images: [
    {
      type: String,
      validate: [arrayLimit, '{PATH} exceeds the limit of 10'],
    },
  ],
  carType: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  dealer: {
    type: String,
    required: true,
  },
 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Function to enforce a limit of 10 images
function arrayLimit(val: string[]) {
  return val.length <= 10;
}

const Car: Model<ICar> =  mongoose.models.Car || mongoose.model<ICar>('Car', CarSchema);
export default Car;
