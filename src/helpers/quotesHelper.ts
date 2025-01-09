import axios from "axios";
import { Quote } from "../models/Quote";

// https://api.mindful-memos.peterforsyth.dev
// http://localhost:8080
const url = "https://api.mindful-memos.peterforsyth.dev";

export const getRandomQuote = async () => {
  const response = await axios.get(`${url}/randomQuote`);
  return response.data;
};

export const getUserQuotes = async () => {
  const response = await axios.get(`${url}/getUserQuotes`);
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
    const response = await axios.post(`${url}/addQuote`, newUserQuote, {
      withCredentials: true,
    });

    if (response.status === 200) {
      setIsLoading(false);
    }
  } catch (error) {
    console.error("Error:", error);
    setIsLoading(false);
  }
};

export const deleteQuote = async (
  quoteId: number,
  setIsLoading: (loading: boolean) => void
) => {
  setIsLoading(true);
  try {
    const response = await axios.delete(`${url}/deleteQuote/${quoteId}`, {
      withCredentials: true,
    });
    if (response.status === 200) {
      getUserQuotes();
      setIsLoading(false);
    }
  } catch (error) {
    console.error("Error deleting quote:", error);
    setIsLoading(false);
  }
};
