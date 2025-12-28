"use client";

import React, { useState } from 'react';

export const defaultBooks: Book[] = [];

interface Book {
  id: number;
  volume?: string;
  title: string;
  author: string;
  rating: number;
  description: string;
  color: string;
}

interface BookSectionProps {
  books?: Book[];
}

export default function BookSection({ books = defaultBooks }: BookSectionProps) {
  const [allBooks, setAllBooks] = useState<Book[]>(books);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBook, setNewBook] = useState<Partial<Book>>({
    title: '',
    author: '',
    rating: 4.5,
    description: '',
    color: 'from-blue-500 to-cyan-400',
  });

  const addBook = async () => {
    if (!newBook.title || !newBook.author) {
      alert('Title and Author are required!');
      return;
    }

    const bookToAdd: Book = {
      id: Date.now(),
      volume: newBook.volume || undefined,
      title: newBook.title,
      author: newBook.author,
      rating: newBook.rating || 4.5,
      description: newBook.description || '',
      color: newBook.color || 'from-blue-500 to-cyan-400',
    };

    setAllBooks([...allBooks, bookToAdd]);
    setNewBook({ title: '', author: '', rating: 4.5, description: '', color: 'from-blue-500 to-cyan-400' });
    setShowAddForm(false);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-left justify-between mb-12">
          <div>
            <h2 className="text-lg md:text-5xl font-bold text-gray-900 mb-2">
              Our Books
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span className="text-6xl font-black text-gray-200">{allBooks.length}</span>
            <div>
              <p className="text-sm text-gray-500">Total Books</p>
              <p className="text-2xl font-bold text-gray-900">{allBooks.length}+</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <TambahBukuCard onClick={() => setShowAddForm(true)} />

          {/* Buku yang Ada */}
          {allBooks.map((book) => (
            <div
              key={book.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-gray-100"
            >
              {/* Book Cover */}
              <div className="relative h-48 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${book.color}`}></div>
                
                {/* Volume Badge */}
                {book.volume && (
                  <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {book.volume}
                  </div>
                )}
                
                {/* Book Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-20 h-20 text-white/30" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                
                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-xl font-bold text-white">{book.title}</h3>
                </div>
              </div>

              {/* Book Info */}
              <div className="p-6">
                {/* Author */}
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-500">{book.author}</p>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span className="ml-1 font-bold text-gray-900">{book.rating}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                  {book.description}
                </p>

                {/* Action Buttons */}
                <div className="flex justify-between items-center">
                  <button className="px-4 py-2 border-2 border-gray-900 text-gray-900 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300 text-sm">
                    Read Preview
                  </button>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">$29.99</p>
                    <p className="text-xs text-gray-500">Paperback</p>
                  </div>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-400 rounded-2xl pointer-events-none transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* Modal Form untuk Tambah Buku */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl w-96">
              <h3 className="text-xl font-bold mb-4">Tambah Buku Baru</h3>
              <input
                type="text"
                placeholder="Title"
                value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="text"
                placeholder="Author"
                value={newBook.author}
                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="number"
                placeholder="Rating (e.g., 4.5)"
                value={newBook.rating}
                onChange={(e) => setNewBook({ ...newBook, rating: parseFloat(e.target.value) })}
                className="w-full p-2 border rounded mb-2"
              />
              <textarea
                placeholder="Description"
                value={newBook.description}
                onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="text"
                placeholder="Color (e.g., from-blue-500 to-cyan-400)"
                value={newBook.color}
                onChange={(e) => setNewBook({ ...newBook, color: e.target.value })}
                className="w-full p-2 border rounded mb-4"
              />
              <div className="flex justify-end gap-2">
                <button onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                <button onClick={addBook} className="px-4 py-2 bg-blue-500 text-white rounded">Add Book</button>
              </div>
            </div>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-900 to-black text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 group">
            <span>View All {allBooks.length}+ Books</span>
            <span className="group-hover:translate-x-2 transition-transform">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

interface TambahBukuCardProps {
  onClick?: () => void;
}

const TambahBukuCard: React.FC<TambahBukuCardProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="
        w-full h-48
        border-2 border-dashed border-black
        rounded-2xl
        flex flex-col items-center justify-center
        cursor-pointer
        hover:bg-gray-100
        transition
      "
    >
      <span className="text-4xl font-bold leading-none">+</span>
      <span className="mt-2 text-sm">Tambah Buku</span>
    </div>
  );
};