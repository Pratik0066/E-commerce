import { useGetProductsQuery } from '../slices/productsApiSlice';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  // We get data, isLoading, and error status directly from Redux
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <div className="py-8">
      <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-8">
        Latest Products
      </h1>

      {/* 1. Show a loading spinner or text while fetching */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : error ? (
        /* 2. Show an error message if the backend is down */
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error?.data?.message || error.error}
        </div>
      ) : (
        /* 3. Show the products if everything is successful */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;