import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home'
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';


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
  //only for testing
  {
    path:"/cart",
    element:<CartPage></CartPage>
  }
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
