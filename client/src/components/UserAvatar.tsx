import { useUser } from "../context/AuthContext";

export const UserAvatar = () => {
  const { user } = useUser();

  return (
    <div>
      <button className="bg-white text-3xl p-4 rounded-full">
        {user.username && user.username[0]}
      </button>
    </div>
  );
};
