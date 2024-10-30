import axios from "axios";
import { getUser } from "./userAuthenticationHelper";
import { User } from "../models/User";
import { Quote } from "../models/Quote";

// https://random-quote-generator-api.vercel.app
// http://localhost:8080
const url = "https://random-quote-generator-api.vercel.app";

export const addQuote = async (newUserQuote: Quote) => {
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
    return currentUser; // update state with user data
  } else {
    console.error("Failed to add quote");
  }
};

export const deleteQuote = async (quoteId: number, user: User) => {
  const response = await fetch(`${url}/deleteQuote`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: quoteId, apiKey: user.apiKey }),
  });

  const result = await response.json();
  if (response.ok) {
    getUserQuotes(); // Refresh the quotes
  } else {
    console.error("Error deleting quote:", result.error);
  }
};

export const getRandomQuote = async () => {
  const response = await axios.get(`${url}/randomQuote`);
  return response.data;
};

export const getUserQuotes = async () => {
  const response = await axios.get(`${url}/getUserQuotes`);
  return response.data;
};
