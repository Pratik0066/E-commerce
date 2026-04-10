import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex items-center w-full max-w-md relative">
      <input
        type="text"
        placeholder="Search Products..."
        className="w-full bg-gray-100 py-2 pl-4 pr-10 rounded-full text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button type="submit" className="absolute right-3 text-gray-400 hover:text-blue-600">
        <Search size={18} />
      </button>
    </form>
  );
};

export default SearchBox;