import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import Icon from "./Icon";
import userIcon from "/src/assets/iconography/user.svg";
import { User } from "../models/User";
import { endpointUrl } from "../config/endpointUrl";

interface Props {
  user: User | undefined;
}

export const EditUserDetails = ({ user }: Props) => {
  const [editUser, setEditUser] = useState(false); // State to control user modal visibility

  return (
    <div className="relative flex justify-end items-start z-50">
      <button
        onClick={() => setEditUser(true)}
        className="-mt-28 lg:-mt-20  transition"
      >
        <Fade triggerOnce={true}>
          <div className="w-8 -mr-4 sm:w-11 sm:hover:scale-[1.06] transition-all">
            {user?.profilePictureUrl ? (
              <img
                src={user.profilePictureUrl}
                alt={`${user.firstName}'s profile picture`}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <Icon iconImg={userIcon} alt={"user icon"} />
            )}
          </div>
        </Fade>
      </button>

      {editUser && (
        <Fade duration={300} triggerOnce={true}>
          <div className="fixed inset-0 bg-black bg-opacity-65 flex justify-center h-screen items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg relative">
              <button
                onClick={() => setEditUser(false)}
                className="absolute top-2 right-2 text-gray-600"
              >
                ✖
              </button>

              <div className="mt-6">
                {user && (
                  <div className="p-4 bg-blue-100 rounded-lg shadow-md">
                    <p className="text-xs text-gray-500">You are signed in</p>
                    <p className="text-lg font-semibold text-gray-900">{` Hi ${user.firstName}!`}</p>
                  </div>
                )}

                <a
                  href={`${endpointUrl}/logout`}
                  className="p-2 mt-4 rounded-lg transition-all hover:bg-blue-600 bg-blue-500 text-white font-bold shadow-lg flex items-center justify-center"
                >
                  Sign out
                </a>
              </div>
            </div>
          </div>
        </Fade>
      )}
    </div>
  );
};
