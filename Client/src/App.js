import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Context } from "./Context/Context";
import Topbar from "./Components/Topbar/Topbar";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Single from "./Components/Single/Single";
import Write from "./Components/Write/Write";
import Settings from "./Components/Settings/Settings";



function App() {
  const {user} = useContext(Context);
  return (
    <>
      <Router>
        <Topbar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/register" element={user ? <Home/> : <Register/>}/>
          <Route exact path="/login" element={user ? <Home/> : <Login/>}/>
          <Route exact path="/write" element={user ? <Write/> : <Register/>}/>
          <Route exact path="/settings" element={user ? <Settings/> : <Register/>}/>
          <Route exact path="/post/:postId" element={<Single/>}/>
          
        </Routes>
      </Router>
    </>
    
  );
}

export default App;
