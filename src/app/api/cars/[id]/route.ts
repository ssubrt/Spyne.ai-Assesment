import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import { ObjectId } from 'mongodb';
import Car from '@/models/Car';

// Handler for GET request
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect(); 

    const { id } = params;  // Extract `id` from params
    console.log('params id:', id);

    const car = await Car.findById(id);
    if (!car) {
      return NextResponse.json({ message: 'Car not found' }, { status: 404 });
    }

    return NextResponse.json(car);
  } catch (error) {
    console.error('Error fetching car details:', error);
    return NextResponse.json({ message: 'Error fetching car details' }, { status: 500 });
  }
}

// Handler for PUT request
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect(); 

    const { id } = params;  // Extract `id` from params
    const { title, description, tags, images } = await req.json();

    const updatedCar = await Car.findByIdAndUpdate(
      id,
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

// Handler for DELETE request
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();

    const { id } = params;  // Extract `id` from params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid car ID' }, { status: 400 });
    }

    const result = await Car.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json({ message: 'Car not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error('Error deleting car:', error);
    return NextResponse.json({ message: 'Error deleting car' }, { status: 500 });
  }
}
