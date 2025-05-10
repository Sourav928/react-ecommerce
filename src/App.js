import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Counter } from './features/counter/Counter';
import Home from './pages/Home'
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';


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
