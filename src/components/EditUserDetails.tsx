import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import Icon from "./Icon";
import userIcon from "/src/assets/iconography/user.svg";
import { User } from "../models/User";

interface Props {
  user: User;
  updateUser: (user: User) => void;
}

export const EditUserDetails = ({ user, updateUser }: Props) => {
  const [editUser, setEditUser] = useState(false); // State to control user modal visibility

  return (
    <div className="relative flex justify-end items-start">
      <button
        onClick={() => setEditUser(true)}
        className="-mt-28 -mr-18  transition"
      >
        <div className="w-11 sm:w-14">
          <Icon iconImg={userIcon} alt={"close"} />
        </div>
      </button>

      {editUser && (
        <Fade duration={300} triggerOnce={true}>
          <div className="fixed inset-0 bg-black bg-opacity-65 flex justify-center h-screen items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg relative">
              <button
                onClick={() => setEditUser(false)}
                className="absolute top-2 right-2 text-gray-600"
              >
                ✖
              </button>
              <p className="mb-2 font-bold">User ID:</p>
              <input
                type="number"
                onChange={(e) => {
                  const updatedUser = {
                    ...user,
                    id: Number(e.target.value),
                  };
                  updateUser(updatedUser);
                  localStorage.setItem("user", JSON.stringify(updatedUser));
                }}
                placeholder="No user ID"
                value={user.id > 0 ? user.id : undefined}
                className="p-3 rounded-lg text-black bg-slate-200 border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
              />
              <p className="my-2 font-bold">User Password:</p>
              <input
                type="text"
                onChange={(e) => {
                  const updatedUser = {
                    ...user,
                    apiKey: e.target.value,
                  };
                  updateUser(updatedUser);
                  localStorage.setItem("user", JSON.stringify(updatedUser));
                }}
                placeholder="No user password"
                value={user.apiKey.length > 0 ? user.apiKey : undefined}
                className="p-3 rounded-lg text-black bg-slate-200 border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
              />
              <div className="mt-4 italic text-xs">
                <p>
                  Leave a memo to generate user details.
                  <br />
                  Copy these details to edit your memos across devices.
                </p>
              </div>
            </div>
          </div>
        </Fade>
      )}
    </div>
  );
};
