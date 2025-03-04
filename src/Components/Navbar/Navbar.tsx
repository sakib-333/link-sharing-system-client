import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import useAuth from "../../Hooks/useAuth/useAuth";
import defaultUser from "/defaultUser.svg";
import linkLogo from "/linkLogo.svg";

const Navbar = () => {
  const { user, handleLogout } = useAuth();
  const navLinks = (
    <>
      <li>
        <NavLink to={"/"} className="nav-link">
          Home
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink to={"/add"} className="nav-link">
            Add
          </NavLink>
        </li>
      )}
      {user && (
        <li>
          <NavLink to={"/my-links"} className="nav-link">
            My Links
          </NavLink>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-300 shadow-sm container mx-auto px-4">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>
        <Link to={"/"} className="flex items-center gap-2">
          <img className="w-10 h-10" src={linkLogo} alt="logo" />
          <p>Links</p>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        <>
          {user ? (
            <>
              <div className="tooltip tooltip-bottom" data-tip="Logout">
                <img
                  onClick={handleLogout}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  src={user.photoURL || defaultUser}
                  alt="img"
                />
              </div>
            </>
          ) : (
            <Link to={"/login"}>
              <button className="primary-btn">Login</button>
            </Link>
          )}
        </>
      </div>
    </div>
  );
};

export default Navbar;
