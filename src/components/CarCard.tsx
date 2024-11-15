import React from 'react';
import Link from 'next/link';

interface CarCardProps {
  id: number;
  title: string;
  description: string;
  tags: string[];
}

const CarCard: React.FC<CarCardProps> = ({ id, title, description, tags }) => (
  <div className="border p-4 m-4 rounded-lg shadow-md">
    <h2 className="text-xl font-bold">{title}</h2>
    <p>{description}</p>
    <div className="flex gap-2 mt-2">
      {tags.map((tag) => (
        <span key={tag} className="bg-gray-200 p-1 rounded">
          {tag}
        </span>
      ))}
    </div>
    <Link href={`/cars/${id}`}>
      <a className="text-blue-500">View Details</a>
    </Link>
  </div>
);

export default CarCard;
