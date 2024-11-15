"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

export default function EditCarPage() {
  const router = useRouter();
  const { id } = useParams();

  const [car, setCar] = useState({
    title: '',
    description: '',
    tags: '',
    carType: '',
    company: '',
    dealer: '',
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/cars/${id}`)
        .then((response: any) => {
          setCar(response.data);
        })
        .catch((error) => {
          console.error('Failed to load car details for editing:', error);
        });
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCar((prevCar) => ({ ...prevCar, [name]: value }));
  };

  const handleSave = () => {
    axios
      .put(`/api/cars/${id}`, car)
      .then(() => {
        router.push(`/cars/${id}`);
      })
      .catch((error) => {
        console.error('Failed to update car:', error);
      });
  };

  if (!car) return <div>Loading...</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto ">
      <h2 className="text-2xl font-bold mb-6">Edit Car Details</h2>
      <input
        type="text"
        name="title"
        value={car.title}
        onChange={handleInputChange}
        placeholder="Title"
        className="block w-full p-2 mb-4 border border-gray-300 text-black rounded-lg"
      />
      <textarea
        name="description"
        value={car.description}
        onChange={handleInputChange}
        placeholder="Description"
        className="block w-full p-2 mb-4 border border-gray-300 text-black  rounded-lg"
      />
      <input
        type="text"
        name="tags"
        value={car.tags}
        onChange={handleInputChange}
        placeholder="Tags (comma-separated)"
        className="block w-full p-2 mb-4 border border-gray-300 text-black rounded-lg"
      />
      <input
        type="text"
        name="carType"
        value={car.carType}
        onChange={handleInputChange}
        placeholder="Car Type"
        className="block w-full p-2 mb-4 border border-gray-300text-black text-black  rounded-lg"
      />
      <input
        type="text"
        name="company"
        value={car.company}
        onChange={handleInputChange}
        placeholder="Company"
        className="block w-full p-2 mb-4 border border-gray-300 text-black rounded-lg"
      />
      <input
        type="text"
        name="dealer"
        value={car.dealer}
        onChange={handleInputChange}
        placeholder="Dealer"
        className="block w-full p-2 mb-4 border border-gray-300 text-black rounded-lg"
      />
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg"
      >
        Save Changes
      </button>
    </div>
  );
}