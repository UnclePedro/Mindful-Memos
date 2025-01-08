import axios from "axios";
import { User } from "../models/User";

// https://random-quote-generator-api.vercel.app
// http://localhost:8080
const url = "http://localhost:8080";

export const validateSession = async (): Promise<User | void> => {
  try {
    const user = await axios.get<User>(`${url}/validate-session`, {
      withCredentials: true,
    });
    return user.data;
  } catch (error) {
    console.error("Error validating session:", error);
  }
};
