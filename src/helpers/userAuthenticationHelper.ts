import { User } from "../models/User";
import axiosInstance from "../config/axiosConfig";

export const getUser = async (): Promise<User | void> => {
  try {
    const user = await axiosInstance.get<User>(`/getUser`);
    return user.data;
  } catch (error) {
    console.error("Error validating session:", error);
  }
};
