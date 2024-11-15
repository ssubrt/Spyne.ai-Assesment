import { NextRequest, NextResponse } from "next/server";
import Car from "@/models/Car";
import dbConnect from "@/dbConfig/dbConfig";



export async function POST(req: NextRequest) {
 
  try {
    await dbConnect();
    const data = await req.formData(); 
    
    const carData = {
      title: data.get('title'),
      description: data.get('description'),
      tags: data.get('tags'),
      carType: data.get('carType'),
      company: data.get('company'),
      dealer: data.get('dealer'),
      image: data.get('image'),
      
      
    };

    const car = new Car(carData);
    const result = await car.save();

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.error(error);
   
    return NextResponse.json({ error: "Failed to create car" }, { status: 500 });
  }
}