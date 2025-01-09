import axios from "axios";
import { User } from "../models/User";

// https://api.mindful-memos.peterforsyth.dev
// http://localhost:8080
const url = "https://api.mindful-memos.peterforsyth.dev";

export const validateSession = async (): Promise<User | void> => {
  try {
    const user = await axios.get<User>(`${url}/validateSession`, {
      withCredentials: true,
    });
    return user.data;
  } catch (error) {
    console.error("Error validating session:", error);
  }
};
