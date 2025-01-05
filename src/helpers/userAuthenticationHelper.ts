import axios from "axios";
import { emptyUser, User } from "../models/User";

// https://random-quote-generator-api.vercel.app
// http://localhost:8080
const url = "http://localhost:8080";

// This user file needs to pull user data from the cookies
export const getUserFromLocalStorage = (): User => {
  const existingUser = localStorage.getItem("user");
  return existingUser ? JSON.parse(existingUser) : emptyUser;
};

export const validateSession = async () => {
  try {
    const user = await axios.get(`${url}/validate-session`, {
      withCredentials: true,
    });
    return user;
  } catch (error) {
    console.error("Error validating session:", error);
  }
};

// export const getUser = async (): Promise<User> => {
//   let user = getUserFromLocalStorage();

//   if (user.id === 0) {
//     try {
//       const response = await fetch(`${url}/generateUser`, {
//         method: "POST",
//       });

//       const data = await response.json();
//       localStorage.setItem("user", JSON.stringify(data.newUser));
//       return data.newUser;
//     } catch (error) {
//       console.error("Failed to create new user");
//       return emptyUser;
//     }
//   } else {
//     return user;
//   }
// };

// Idk if I even need any of this code
