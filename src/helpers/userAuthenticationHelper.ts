import { User } from "../models/User";

// https://random-quote-generator-api.vercel.app
// http://localhost:8080
const url = "http://localhost:8080";

const emptyUser: User = {
  id: 0,
  apiKey: "",
};

export const getUser = async (): Promise<User> => {
  let storedUser = localStorage.getItem("user");
  let user: User = storedUser ? JSON.parse(storedUser) : emptyUser; // Parse storedUser

  if (!user || user.id === 0) {
    try {
      const response = await fetch(`${url}/generateUser`, {
        method: "POST",
      });

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data.newUser));
      return data.newUser;
    } catch (error) {
      console.error("Failed to create new user");
      return emptyUser;
    }
  } else {
    return user;
  }
};
