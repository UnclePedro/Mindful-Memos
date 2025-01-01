import axios from "axios";
import { getUser } from "./userAuthenticationHelper";
import { User } from "../models/User";
import { Quote } from "../models/Quote";

// https://random-quote-generator-api.vercel.app
// http://localhost:8080
const url = "http://localhost:8080";

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
  if (newUserQuote.quote === "") {
    window.alert("Memo cannot be empty");
    return null;
  }
  if (newUserQuote.author === "") {
    window.alert("Author cannot be empty");
    return null;
  }

  setIsLoading(true);

  const currentUser = await getUser();

  const response = await fetch(`${url}/addQuote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      quote: newUserQuote.quote,
      author: newUserQuote.author,
      authorId: currentUser.id,
      apiKey: currentUser.apiKey,
    }),
  });

  if (response.ok) {
    setIsLoading(false);
    return currentUser; // update state with user data
  } else {
    console.error("Failed to add quote");
  }
};

export const deleteQuote = async (
  quoteId: number,
  user: User,
  setIsLoading: (loading: boolean) => void
) => {
  setIsLoading(true);
  const response = await fetch(`${url}/deleteQuote`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: quoteId, apiKey: user.apiKey }),
  });

  const result = await response.json();
  if (response.ok) {
    getUserQuotes();
    setIsLoading(false);
  } else {
    console.error("Error deleting quote:", result.error);
  }
};
