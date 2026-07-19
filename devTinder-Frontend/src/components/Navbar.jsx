import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { deleteUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
    await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
    dispatch(deleteUser());
    navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
  
  return (
    <div>
      <div className="navbar bg-base-200 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
        </div>
         <div>
         { user && <div className="dropdown dropdown-end px-5 flex items-center ">
           <p className="mx-2">Welcome, {user.firstName}</p> 
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="user photo"
                  src={user.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li onClick={() => handleLogout() }>
                <a>Logout</a>
              </li>
            </ul>
          </div> }
        </div>
      </div>
    </div>
  );
};  

export default Navbar;
