import { useEffect, useState } from "react";
import background from "../assets/background.mp4";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/AuthContext";
4;
import Community from "../components/HomeOne";

export const Home = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userDetails, setUserDetails] = useState(null);
  const [isLoginOrRegister, setIsLoginOrRegister] = useState("");
  const navigate = useNavigate();

  const logOut = async () => {};

  const { user } = useUser();
  useEffect(() => {}, []);

  return (
    <div className="text-white relative h-screen">
      <video
        className="w-full h-full object-cover"
        src={background}
        autoPlay
        loop
        muted
      />
      <div className="bg-blue-50 flex absolute w-full h-full top-0 left-0 bg-gray-900/30 text-center">
        <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
          <h1 className="border-b font-headerFonts text-center text-white md:text-5xl sm-text-6xl text-4xl md:py-6">
            Welcome To Music App!
          </h1>
          <p className="text-[50px] font-bold">
            The all in one platform to sell your talent
          </p>
          <p className="text-white text-center p-8 lg:text-2xl md:text-xl sm:text-xs">
            Find beats to purchase, or sell your beats on our platform
          </p>
          <div className="flex justify-center gap-5">
            <div className="">
              {user.token && (
                <button
                  onClick={logOut}
                  className="text-white text-xl bg-slate-600 w-[100px] rounded-xl font-medium 
               mx-auto my-6 py-3 transition ease-in-out delay-150
                hover:-translate-y-1 hover:scale-80 hover:bg-slate-800 duration-300 ..."
                >
                  Log Out
                </button>
              )}
            </div>
            <div className="my-6">
              <button className="text-white text-2xl group border-2 px-4 py-2 flex items-center hover:bg-red-800 hover:border-red-800">
                <span className="group-hover:rotate-90 duration-300"></span>
                Why us?
              </button>
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <Community />
    </div>
  );
};
