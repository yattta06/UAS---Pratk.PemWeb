export const defaultCategories: Category[] = [];

const availableColors = [
  "from-red-400 to-pink-500",
  "from-blue-400 to-cyan-500",
  "from-green-400 to-emerald-500",
  "from-yellow-400 to-amber-500",
  "from-purple-400 to-violet-500",
  "from-orange-400 to-red-500",
  "from-lime-400 to-green-500",
  "from-indigo-400 to-blue-500",
];

interface Category {
  id: number;
  name: string;
  count: number;
  color: string;
}

interface Book {
  id: number;
  title: string;
  category: string;
}

interface TopCategoryProps {
  books?: Book[];
}

export default function TopCategory({ books = [] }: TopCategoryProps) {
  const categories: Category[] = [];
  const categoryCount: { [key: string]: number } = {};

  books.forEach((book) => {
    if (book.category) {
      categoryCount[book.category] = (categoryCount[book.category] || 0) + 1;
    }
  });

  Object.keys(categoryCount).forEach((catName, index) => {
    categories.push({
      id: index + 1,
      name: catName,
      count: categoryCount[catName],
      color: availableColors[index % availableColors.length],
    });
  });

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">

        <div className="text-left mb-12">
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-4">
            Our Top Category
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div
                key={category.id}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-100"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 rounded-2xl group-hover:opacity-10 transition-opacity`}></div>
                
                <div className="relative">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <span className="text-2xl font-bold text-white">
                      {category.name.charAt(0)}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600">
                      {category.count.toLocaleString()} items
                    </p>
                    <span className="text-sm font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                      Browse →
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No categories available yet. Add books to see categories here!</p>
          )}
        </div>

        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-gray-900 to-black text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105">
            View All Categories
            <span className="text-xl">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}