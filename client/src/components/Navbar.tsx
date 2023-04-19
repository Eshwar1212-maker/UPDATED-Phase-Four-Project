import { Link } from "react-router-dom";
import { useUser } from "../context/AuthContext";

export const Navbar = () => {
  const { user, logout } = useUser();

  return (
    <div className="flex justify-between text-white p-8 cursor-pointer bg-slate-900 text-white">
      <div className="text-3xl">AppName</div>
      <div></div>
      <div>
        <ul className="flex flex-row gap-8 px-[50px] text-xl font-bold text-white sm:text-white">
          {user.token ? (
            <>
              <li>
                <Link to="/selltracks">Sell tracks</Link>
              </li>
              <li>
                <Link to="/buytracks">Find tracks</Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/register">Register</Link>
            </li>
          )}
          <li>
            <Link to="/">Home</Link>
          </li>
          {user.username && <li>{user.username}</li>}
        </ul>
      </div>
    </div>
  );
};
