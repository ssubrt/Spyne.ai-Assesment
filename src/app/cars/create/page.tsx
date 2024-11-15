"use client";

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Appbar from '@/components/Appbar';

export default function CreateCarPage() {
  const router = useRouter();
  const { id } = useParams();
  const [carData, setCarData] = useState({
    title: '',
    description: '',
    tags: '',
    carType: '',
    company: '',
    dealer: '',
  });

  const [images, setImages] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Loading state

  // Handle text input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCarData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input changes for images
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      if (selectedFiles.length > 10) {
        setError('You can upload up to 10 images.');
      } else {
        setImages(selectedFiles);
        setError(null);
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submission starts

    try {
      const formData = new FormData();

      // Append each image file to formData
      images.forEach((image) => formData.append('images', image));

      // Append other car data to formData
      Object.keys(carData).forEach((key) => formData.append(key, carData[key as keyof typeof carData]));

      // Post request to the API endpoint
      await axios.post('/api/cars/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Redirect to car list page on successful upload
      router.push('/cars/list');
    } catch (error) {
      setError('Failed to create car. Please try again.');
      console.error(error);
    } finally {
      setLoading(false); // Reset loading state after submission is done
    }
  };

  return (
    <div>
      <Appbar />
      <div className="flex justify-center items-center min-h-screen">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-xl font-semibold text-gray-400 mb-6 text-center">
            {id ? 'Update Car Details' : 'Create New Car'}
          </h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Car title */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="title"
              value={carData.title}
              onChange={handleInputChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 transition-transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0">
              Car Title
            </label>
          </div>

          {/* Car description */}
          <div className="relative z-0 w-full mb-6 group">
            <textarea
              name="description"
              value={carData.description}
              onChange={handleInputChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 transition-transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0">
              Car Description
            </label>
          </div>

          {/* Tags */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="tags"
              value={carData.tags}
              onChange={handleInputChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 transition-transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0">
              Tags (comma-separated)
            </label>
          </div>

          {/* Company and other fields */}

          {/* Other fields */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="carType"
              value={carData.carType}
              onChange={handleInputChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 transition-transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0">
              Car Type
            </label>
          </div>

          {/* Company */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="company"
              value={carData.company}
              onChange={handleInputChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 transition-transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0">
              Company
            </label>
          </div>

          {/* Dealer */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="dealer"
              value={carData.dealer}
              onChange={handleInputChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 transition-transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0">
              Dealer
            </label>
          </div>

          {/* ... other input fields go here ... */}

          {/* Image file input */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>

          {/* Submit button with loading state */}
          <button
            type="submit"
            disabled={loading} // Disable button during loading
            className={`w-full py-2.5 rounded-lg font-medium text-white focus:outline-none focus:ring-4 
              ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-300'}`}
          >
            {loading ? 'Loading...' : 'Add Car'}
          </button>
        </form>
      </div>
    </div>
  );
}




