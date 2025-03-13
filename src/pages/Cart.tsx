import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { increaseQuantity, decreaseQuantity, removeFromCart, clearCart } from "../redux/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart.cart);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col items-center">
                <img src={item.thumbnail} alt={item.name} className="w-full h-32 object-cover rounded-md mb-3" />
                <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                <div className="flex justify-between items-center mt-3 w-full px-4">
                  <p className="text-lg font-semibold text-indigo-600">${item.price}</p>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      className="bg-gray-200 text-gray-700 px-3 py-1 text-sm rounded-md hover:bg-gray-300 transition inline-flex items-center"
                    >
                      ➖
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button 
                     onClick={() => {
                        if (item.quantity < item.stock) {
                          dispatch(increaseQuantity(item.id));
                        } else {
                          alert("You have reached the maximum quantity for this item.");
                        }
                      }}
                      className="bg-gray-200 text-gray-700 px-3 py-1 text-sm rounded-md hover:bg-gray-300 transition inline-flex items-center"
                    >
                      ➕
                    </button>
                  </div>
                </div>
                <div className="flex justify-center w-full mt-3">
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="bg-red-400 text-white px-4 py-2 text-sm rounded-md hover:bg-red-500 transition inline-flex items-center justify-center max-w-[200px] w-full"
                  >
                    ❌ Remove
                  </button>
                </div>
              </div>  
            ))}
          </div>
          <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-bold text-gray-900">Total: ${totalPrice.toFixed(2)}</h3>
            <button
              onClick={() => dispatch(clearCart())}
              className="mt-3 bg-red-500 text-white px-4 py-2 text-sm rounded-md hover:bg-red-600 transition inline-flex items-center justify-center"
            >
              🗑️ Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
