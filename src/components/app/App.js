import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from "../header/Header";
import Login from "../login/Login";
import Register from "../register/Register";
import Main from "../main/Main";
import Form from "../form/Form";
import PostPage from "../postPage/PostPage";
import User from "../user/User";
import Edit from "../form/Edit";
import Profile from "../user/Profile";
import Users from "../user/Users";

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/" element={<Main/>}></Route>
          <Route path="/form" element={<Form/>}></Route>
          <Route path="/edit/:id" element={<Edit/>}></Route>
          <Route path="/posting/:id" element={<PostPage/>}></Route>
          <Route path="/user/:id" element={<User/>}></Route>
          <Route path="/users" element={<Users/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
