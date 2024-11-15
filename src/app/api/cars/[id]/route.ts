import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import { ObjectId } from 'mongodb';
import Car from '@/models/Car';

// Adjust the context type to match the Next.js 13+ API
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect(); 

    console.log('params id:', params.id);

    const car = await Car.findById(params.id);
    if (!car) {
      return NextResponse.json({ message: 'Car not found' }, { status: 404 });
    }

    return NextResponse.json(car);
  } catch (error) {
    console.error('Error fetching car details:', error);
    return NextResponse.json({ message: 'Error fetching car details' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect(); 

    const { title, description, tags, images } = await req.json();

    const updatedCar = await Car.findByIdAndUpdate(
      params.id,
      { title, description, tags, images },
      { new: true }
    );

    if (!updatedCar) {
      return NextResponse.json({ message: 'Car not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Car updated successfully', car: updatedCar });
  } catch (error) {
    console.error('Error updating car:', error);
    return NextResponse.json({ message: 'Error updating car' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();

    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ message: 'Invalid car ID' }, { status: 400 });
    }

    const result = await Car.findByIdAndDelete(params.id);

    if (!result) {
      return NextResponse.json({ message: 'Car not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error('Error deleting car:', error);
    return NextResponse.json({ message: 'Error deleting car' }, { status: 500 });
  }
}
