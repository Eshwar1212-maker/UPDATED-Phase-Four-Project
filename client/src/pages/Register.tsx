import { useEffect, useState } from "react";
import background from "../assets/background.mp4";
import { Navigate, useNavigate } from "react-router-dom";
import { useUser } from "../context/AuthContext";

const token = sessionStorage.getItem("token");
console.log(token);

export const Register = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { user, setUser, logOut } = useUser();

  const navigate = useNavigate();
  useEffect(() => {}, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    fetch("http://127.0.0.1:5000/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: userName, password: password }),
    })
      .then((response) => {
        if (response.status === 201) {
          console.log(response);
          return response.json();
        } else {
          alert("There has been some error");
        }
      })
      .then((data) => {
        console.log("This came from the backend" + data);
        sessionStorage.setItem("token", data.access_token);
        setUser({ token: data.access_token, username: userName });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="text-white relative h-screen">
      <video
        className="w-full h-full object-cover"
        src={background}
        autoPlay
        loop
        muted
      />
      {user.token && user.token !== "" && user.token !== undefined ? (
        <div className=" flex justify-center py-[200px] absolute w-full h-full top-0 left-0 bg-gray-900/30 text-center max-w]">
          <div className="w-[300px] text-center text-4xl">
            You are logged in with this username{}
            <span className="w-[100px]">{user.username}</span>
            <button onClick={logOut}>Log Out</button>
          </div>
        </div>
      ) : (
        <div className="bg-blue-50 flex py-[200px] absolute w-full h-full top-0 left-0 bg-gray-900/30 text-center">
          <form onSubmit={handleSubmit} className="w-64 mx-auto">
            <h1 className="mb-[50px] text-2xl w-[250px]">
              Welcome to (App name)! Create an account!
            </h1>
            <input
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              type="text"
              placeholder="username"
              className="text-lg block w-full rounded-xl p-2 mb-2 text-black"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="password"
              className="text-lg text-black block w-full rounded-xl p-2 mb-2"
            />
            <button className="bg-blue-900 text-white w-full rounded-md p-2">
              Login/Register
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
