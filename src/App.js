import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home'
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';


const router = createBrowserRouter([
  {
    path:"/",
    element:(
     <Home></Home>
    )
  },
  {
    path:"/login",
    element:<LoginPage></LoginPage>
  },
  {
    path:"/signup",
    element:<SignupPage></SignupPage>
  },
  {
    path:"/cart",
    element:<CartPage></CartPage>
  },
  {
    path:"/checkout",
    element:<CheckoutPage></CheckoutPage>
  },
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
