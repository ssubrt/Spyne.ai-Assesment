"use client"


import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Appbar from '@/components/Appbar';
import toast from 'react-hot-toast';

type Car = {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  carType: string;
  company: string;
  dealer: string;
  images: string[];
};

export default function CarListPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [search, setSearch] = useState('');
  const router = useRouter();
  const { id }  = useParams();

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = () => {
    axios.get('/api/cars/list')
      .then((response: any) => {
        setCars(response.data);
      })
      .catch((error) => {
        console.error('Failed to load cars:', error);
      });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    images.forEach((image) => formData.append('images', image));  // Append images

    try {
      const response = await axios.post(`/api/cars/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Images uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this car?')) {
      axios.delete(`/api/cars/${id}`)
        .then(() => {
          // Remove the car from the local state after successful deletion
          setCars((prevCars) => prevCars.filter((car) => car._id !== id));
          toast.success('Car deleted successfully');
        })
        .catch((error) => {
          console.error('Failed to delete car:', error);
          alert('Error deleting car');
        });
    }
  };

  const filteredCars = cars.filter(
    (car) =>
      car.title.toLowerCase().includes(search.toLowerCase()) ||
      car.description.toLowerCase().includes(search.toLowerCase()) ||
      car.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

 
  return (
    <div className=" min-h-screen">
      <Appbar />
      <div className="p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 ">My Cars</h1>
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search cars..."
          className="block w-full p-2 mb-4 border text-black border-gray-300 rounded-lg"
        />
        <div>
          {filteredCars.map((car) => (
            <div
              key={car._id}
              className="p-4 mb-4 rounded-lg shadow-lg hover:bg-gray-50 cursor-pointer"
              onClick={() => router.push(`/cars/${car._id}`)}
            >
              <h2 className="text-xl font-semibold text-gray-700">{car.title}</h2>
              <p className="text-gray-600">Description:{car.description}</p>
              <p className="text-gray-500">Tags: {car.tags.join(', ')}</p>
              <p className="text-gray-500">Company: {car.company}</p>
              <p className="text-gray-500">Dealer: {car.dealer}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(car._id);
                }}
                className="mt-4 bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

}