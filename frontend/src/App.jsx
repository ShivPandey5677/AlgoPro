import { useState } from 'react'
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { createBrowserRouter,Outlet, RouterProvider, } from 'react-router-dom';

function App() {

const Layout=()=>{


  return (
    <div>
      <Navbar/>
      <Outlet/>
      </div>
  )
};
const router=createBrowserRouter([
  {
    path:"/",
    element:
    <Layout/>,
    children:[
          {
            path:"/",
            element:<Home/>
          }
    ]
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/register",
    element:<Register/>

  }

]);
return <div>
  <RouterProvider router={router}/>
</div>
}

export default App
