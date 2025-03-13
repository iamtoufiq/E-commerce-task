import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { toggleWishlist } from "../redux/slices/wishlistSlice";
import { addToCart } from "../redux/slices/cartSlice";

const Wishlist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const wishlist = useSelector((state: RootState) => state.wishlist.wishlist);
  const cart = useSelector((state: RootState) => state.cart.cart);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-600">Your wishlist is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => {
              const itemInCart = cart.find((cartItem) => cartItem.id === item.id);
              const isOutOfStock = itemInCart ? itemInCart.quantity >= item.stock : item.stock === 0;

              return (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col items-center"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title} 
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-lg font-semibold text-indigo-600 mt-2">${item.price}</p>
                  <div className="flex flex-col items-center w-full mt-3 gap-2">
                    <button
                      onClick={() =>
                        dispatch(
                          addToCart({
                            ...item,
                            name: item.title, 
                            quantity: 1,
                          })
                        )
                      }
                      disabled={isOutOfStock} 
                      className={`px-4 py-2 text-sm rounded-md transition inline-flex items-center justify-center max-w-[200px] w-full ${
                        isOutOfStock
                          ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                          : "bg-indigo-500 text-white hover:bg-indigo-700"
                      }`}
                    >
                      🛒 {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                    </button>

                    <button
                      onClick={() => dispatch(toggleWishlist(item))}
                      className="bg-red-500 text-white px-4 py-2 text-sm rounded-md hover:bg-red-600 transition inline-flex items-center justify-center max-w-[200px] w-full"
                    >
                      ❌ Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Wishlist;
