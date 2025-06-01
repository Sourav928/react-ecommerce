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
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserOrdersAsync, fetchLoggedInUsersAsync } from './features/user/userSlice';
import LogOut from './features/auth/components/Logout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';


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
    path: "/orders",
    element: <Protected>
      <UserOrdersPage></UserOrdersPage>
    </Protected>
    //we will add Page later right now using component directly
  },
  {
    path: "/profile",
    element: <Protected>
      <UserProfilePage></UserProfilePage>
    </Protected>
    //we will add Page later right now using component directly
  },
  {
    path: "/logout",
    element: <Protected>
      <LogOut></LogOut>
    </Protected>
    //we will add Page later right now using component directly
  },
  {
    path: "/forgot-password",
    element:
      <ForgotPasswordPage></ForgotPasswordPage>
    //we will add Page later right now using component directly
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
      dispatch(fetchLoggedInUsersAsync(user.id));
    }
  }, [dispatch, user])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
