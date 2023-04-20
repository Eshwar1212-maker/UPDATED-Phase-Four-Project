import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Community = () => {
  const goToForum = () => {};
  const signIn = async () => {};

  return (
    <div className="w-full bg-black py-16 px-4 text-white">
      <div
        className="max-w-[1240px] mx-auto grid md:grid-cols-2 gap-4
    "
      >
        <img
          className="rounded-3xl w-[500px] mx-auto my-4"
          src="https://static.timesofisrael.com/www/uploads/2019/12/12-17-19-Clive-Owen-as-Hasid-violinist-e1576688249181.jpg"
          alt=""
        />
        <div className="flex flex-col justify-center">
          <p className="font-serif p-4">
            <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2">
              Community that will keep eachother going
            </h1>
            <br />
          </p>
          <p>
            Join our Forums page and stay active so you can talk to other
            aspiring hoopers about what your working on! Basketballfit knows
            that getting better is always easier when you have other people to
            talk to.
          </p>
          <Link to="/register">
            <button
              className="
        bg-white w-[200px] rounded-xl font-medium mx-auto my-6 py-3
        text-black transition ease-in-out delay-150 hover:-translate-y-1
        hover:scale-80 hover:bg-slate-500 duration-300 ..."
            >
              Forum
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Community;
