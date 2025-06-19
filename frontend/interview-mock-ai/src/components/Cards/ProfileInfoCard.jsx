import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  return (
    user && (
      <div className="flex items-center gap-3 px-3 py-2 bg-white rounded-lg shadow-sm">
        <img
          src={user.profileImageUrl}
          alt="Profile"
          className="w-11 h-11 rounded-full object-cover shadow-md border-2 border-white"
        />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-800 leading-tight">
            {user.name || ""}
          </span>
          <button
            className="text-xs text-blue-600 hover:text-blue-800 font-medium mt-[2px] transition-all"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileInfoCard;
