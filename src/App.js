import { useRoutes } from "react-router-dom";
// import Signup from "./signup/signup.jsx";
import Login from "./login/login.jsx"
import Home from "./home/Home.jsx";
import Navbar from "./navbar/Navbar.jsx";
import Employeelist from "./employeelist/Employeelist.jsx";
import Createemployeelist from "./createemployee/Createemployee.jsx";
import Signup from "./signup/signup.jsx";


function App() {


  let route=useRoutes([
    {
      path:"/",
    element:<Home/>
    },
    {
      path:"/employeelist",
    element:<Employeelist/>
    },
    {
      path:"/createemployee",
    element:<Createemployeelist/>
    },
    {
      path:"/login",
      element:<Login/>,
    },
    {
      path:"/signup",
      element:<Signup/>,
    },
  ])
  return (
    <div >
    <Navbar navpath={{url1:"/",url2:"/login",url3:"/employeelist"}}/>
      {route}
    </div>
  );
}

export default App;
