import { Quote } from "../models/Quote";
import axiosInstance from "../config/axiosConfig";

export const getRandomQuote = async () => {
  const response = await axiosInstance.get(`/randomQuote`);
  return response.data;
};

export const getUserQuotes = async () => {
  const response = await axiosInstance.get(`/getUserQuotes`);
  return response.data;
};

export const addQuote = async (
  newUserQuote: Quote,
  setIsLoading: (loading: boolean) => void
) => {
  // Prevent user from adding quote with empty fields
  if (newUserQuote.quote === "") {
    window.alert("Memo cannot be empty");
    return null;
  }
  if (newUserQuote.author === "") {
    window.alert("Author cannot be empty");
    return null;
  }

  setIsLoading(true); // Display loading spinner to user

  try {
    const response = await axiosInstance.post(`/addQuote`, newUserQuote, {
      withCredentials: true,
    });

    if (response.status === 200) {
      setIsLoading(false);
    }
    return response.data.updatedUserQuotes;
  } catch (error) {
    console.error("Error:", error);
    setIsLoading(false);
  }
};

export const deleteQuote = async (quoteId: number) => {
  try {
    const response = await axiosInstance.delete(`/deleteQuote/${quoteId}`, {
      withCredentials: true,
    });
    if (response.status === 200) {
    }
    return response.data.quotes;
  } catch (error) {
    console.error("Error deleting quote:", error);
  }
};
