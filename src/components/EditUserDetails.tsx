import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import Icon from "./Icon";
import userIcon from "/src/assets/iconography/user.svg";
import { User } from "../models/User";

// https://api.mindful-memos.peterforsyth.dev
// http://localhost:8080
const url = "https://api.mindful-memos.peterforsyth.dev";

interface Props {
  user: User | undefined;
}

export const EditUserDetails = ({ user }: Props) => {
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

              <div className="mt-6">
                {user && (
                  <div className="p-4 bg-blue-100 rounded-lg shadow-md">
                    <p className="text-sm text-gray-500">Signed in as:</p>
                    <p className="text-lg font-semibold text-gray-900">{`${user.firstName} ${user.lastName}`}</p>
                  </div>
                )}

                {!user ? (
                  <a
                    href={`${url}/login`}
                    className="p-2 m-2 mt-6 rounded-lg transition-all hover:bg-blue-600 bg-blue-500 text-white font-bold shadow-lg flex items-center justify-center"
                  >
                    Sign in
                  </a>
                ) : (
                  <a
                    href={`${url}/logout`}
                    className="p-2 mt-4 rounded-lg transition-all hover:bg-blue-600 bg-blue-500 text-white font-bold shadow-lg flex items-center justify-center"
                  >
                    Sign out
                  </a>
                )}
              </div>
            </div>
          </div>
        </Fade>
      )}
    </div>
  );
};
