import { useGetRecommendationsQuery } from '../slices/productsApiSlice';
import ProductCard from './ProductCard';

const Recommendations = ({ productId }) => {
  const { data: products, isLoading } = useGetRecommendationsQuery(productId);

  if (isLoading) return <div>Loading Suggestions...</div>;

  return (
    <div className="mt-20">
      <h2 className="text-2xl font-black mb-8 uppercase tracking-tight">
        AI <span className="text-blue-600">Suggestions</span> for You
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};