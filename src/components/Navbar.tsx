import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="p-4 bg-blue-500 text-white">
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/cars/create">Add Car</Link>
      <Link href="/signin">Sign Out</Link>
    </nav>
  );
};

export default Navbar;
