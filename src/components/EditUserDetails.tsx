import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import Icon from "./Icon";
import userIcon from "/src/assets/iconography/user.svg";
import { User } from "../models/User";

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
                {user && <p>{`${user.firstName} ${user.lastName}`}</p>}

                {!user && (
                  <p>
                    <a href="http://localhost:8080/login">Sign in</a>
                  </p>
                )}

                {user && (
                  <p>
                    <a href="http://localhost:8080/logout">Sign out</a>
                  </p>
                )}
              </div>
            </div>
          </div>
        </Fade>
      )}
    </div>
  );
};
