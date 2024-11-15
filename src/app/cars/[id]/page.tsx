"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Appbar from '@/components/Appbar';

interface Car {
  title: string;
  description: string;
  tags: string;
  carType: string;
  company: string;
  dealer: string;
  images: string[]; // Image URLs
}

export default function CarDetailPage() {
  const { id } = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const router = useRouter();
  

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/cars/${id}`)
        .then((response: any) => {
          const carData = response.data;

          // Ensure images have full URLs (adjust based on your setup)
          carData.images = carData.images.map((url: string) => 
            url.startsWith("http") ? url : `/uploads/${url}`
          );

          setCar(carData);
        })
        .catch((error) => {
          console.error("Failed to load car details:", error);
        });
    }
  }, [id]);

  const handleDelete = async () => {
    if (id) {
      await axios.delete(`/api/cars/${id}`);
      router.push('/cars/list');
      toast.success("Car Deleted Successfully")
    }
  };

  if (!car) return <div>Loading...</div>;

  return (
    <div className="min-h-screen p-8">
      <Appbar />
      <div className="max-w-3xl mx-auto rounded-lg bg-gray-500 shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">{car.title}</h1>
        <p className="text-white mb-6"> <span className='text-white'>Description:</span>{car.description}</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Tags:</h3>
            <p>{car.tags}</p>
          </div>
          <div>
            <h3 className="font-semibold">Car Type:</h3>
            <p>{car.carType}</p>
          </div>
          <div>
            <h3 className="font-semibold">Company:</h3>
            <p>{car.company}</p>
          </div>
          <div>
            <h3 className="font-semibold">Dealer:</h3>
            <p>{car.dealer}</p>
          </div>
        </div>
        {/* <div className="mt-6">
          <h3 className="font-semibold mb-4">Images:</h3>
          <div className="grid grid-cols-2 gap-4">
            {car.images.map((url, index) => (
              <Image
                key={index}
                src={url}
                alt={`Car image ${index + 1}`}
                width={500}
                height={300}
                className="rounded-lg shadow-md"
              />
            ))}
          </div>
        </div> */}
        <div className="flex space-x-4 mt-6">
          <Link href={`/cars/${id}/edit`}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
          </Link>
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
