"use client"

import React, { useState } from 'react';

interface CarFormProps {
  onSubmit: (carData: any) => void;
}

const CarForm: React.FC<CarFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, tags, images });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="text" placeholder="Tags (comma separated)" onChange={(e) => setTags(e.target.value.split(','))} />
      <button type="submit" className="bg-green-500 text-white p-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default CarForm;
