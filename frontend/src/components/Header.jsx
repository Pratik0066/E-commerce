import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  ShoppingCart, 
  User, 
  Store, 
  LogOut, 
  ChevronDown, 
  Settings, 
  Database, 
  ClipboardList, 
  Users 
} from 'lucide-react';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      setShowUserDropdown(false);
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-gray-900 p-2 rounded-lg group-hover:bg-blue-600 transition-colors">
            <Store className="text-white" size={20} />
          </div>
          <span className="text-2xl font-black tracking-tighter text-gray-900 uppercase">
            My<span className="text-blue-600">Store</span>
          </span>
        </Link>

        <div className="flex items-center gap-4 md:gap-8">
          {/* CART LINK */}
          <Link to="/cart" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-bold relative">
            <ShoppingCart size={22} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
            )}
          </Link>

          {/* USER MENU */}
          {userInfo ? (
            <div className="relative">
              <button 
                onClick={() => {
                  setShowUserDropdown(!showUserDropdown);
                  setShowAdminDropdown(false);
                }}
                className="flex items-center gap-2 text-gray-900 font-black hover:text-blue-600 transition"
              >
                <div className="bg-gray-100 p-1.5 rounded-full">
                  <User size={18} />
                </div>
                <span className="hidden md:block uppercase text-sm">{userInfo.name}</span>
                <ChevronDown size={14} />
              </button>

              {showUserDropdown && (
                <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-50">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-bold"
                    onClick={() => setShowUserDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <button 
                    onClick={logoutHandler}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-bold flex items-center gap-2"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-bold transition">
              <User size={22} />
              <span className="hidden md:block">Sign In</span>
            </Link>
          )}

          {/* ADMIN MENU (Only visible if isAdmin is true) */}
          {userInfo && userInfo.isAdmin && (
            <div className="relative border-l pl-4 md:pl-8 border-gray-100">
              <button 
                onClick={() => {
                  setShowAdminDropdown(!showAdminDropdown);
                  setShowUserDropdown(false);
                }}
                className="flex items-center gap-2 text-blue-600 font-black hover:bg-blue-50 px-3 py-2 rounded-xl transition"
              >
                <Settings size={18} />
                <span className="hidden md:block text-sm">ADMIN</span>
                <ChevronDown size={14} />
              </button>

              {showAdminDropdown && (
                <div className="absolute right-0 mt-3 w-52 bg-white border border-gray-100 rounded-2xl shadow-xl py-3 z-50">
                  <div className="px-4 pb-2 mb-2 border-b border-gray-50">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Management</span>
                  </div>
                  
                  <Link 
                    to="/admin/orderlist" 
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-bold"
                    onClick={() => setShowAdminDropdown(false)}
                  >
                    <ClipboardList size={16} className="text-gray-400" /> Orders
                  </Link>

                  <Link 
                    to="/admin/productlist" 
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-bold"
                    onClick={() => setShowAdminDropdown(false)}
                  >
                    <Database size={16} className="text-gray-400" /> Products
                  </Link>

                  <Link 
                    to="/admin/userlist" 
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-bold"
                    onClick={() => setShowAdminDropdown(false)}
                  >
                    <Users size={16} className="text-gray-400" /> Users
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;