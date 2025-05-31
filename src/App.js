import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home'
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProductDetail from './features/product/components/ProductDetail';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import { selectLoggedInUser } from './features/auth/authSlice';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    )
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>
  },
  {
    path: "/cart",
    element: <Protected>
      <CartPage></CartPage>
    </Protected>
  },
  {
    path: "/checkout",
    element: <Protected>
      <CheckoutPage></CheckoutPage>
    </Protected>
  },
  {
    path: "/product-detail/:id",
    element: <Protected>
      <ProductDetailPage></ProductDetailPage>
    </Protected>
  },
  {
    path: "/order-success/:id",
    element: <Protected>
      <OrderSuccessPage></OrderSuccessPage>
    </Protected>
  },
  {
    path: "*",
    element: (<PageNotFound></PageNotFound>)
  }
])

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
    }
  }, [dispatch, user])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
