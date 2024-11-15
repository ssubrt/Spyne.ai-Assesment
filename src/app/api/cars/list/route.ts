import Car from '@/models/Car';
import dbConnect from '@/dbConfig/dbConfig';

import { NextRequest, NextResponse } from 'next/server';





export async function GET() {
  try {
    await dbConnect();
    const cars = await Car.find({});
    return NextResponse.json(cars);
  } catch (error) {
    console.error('Error fetching cars:', error);
    return NextResponse.json({ message: 'Failed to fetch cars' }, { status: 500 });
  }
}



// export async function GET(request: NextRequest) {
//   await dbConnect();

//   const token = request.cookies.get('token')?.value;
//   const user = getUserFromToken(token);

//   if (!user) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   const search = request.nextUrl.searchParams.get('search');

//   try {
//     const query = {
//       owner: user.id,
//       ...(search && {
//         $or: [
//           { title: { $regex: search, $options: 'i' } },
//           { description: { $regex: search, $options: 'i' } },
//           { tags: { $in: [search] } }
//         ]
//       })
//     };

//     const cars = await Car.find(query);
//     return NextResponse.json(cars, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to retrieve cars' }, { status: 500 });
//   }
// }
