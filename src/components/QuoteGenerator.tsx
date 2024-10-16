import { useEffect, useState } from "react";
import axios from "axios";
import { generateUserId } from "../helpers/userAuthHelper";
import { Fade } from "react-awesome-reveal";
import Icon from "./Icon";
import user from "/src/assets/iconography/user.svg";

const url = "https://random-quote-generator-api.vercel.app";

// https://random-quote-generator-api.vercel.app
// http://localhost:8080

const QuoteGenerator = () => {
  interface Quote {
    quote: string;
    author: string;
    quoteId: number;
    userId: string;
  }

  const emptyQuoteObj: Quote = {
    quote: "",
    author: "",
    quoteId: 0,
    userId: "",
  };

  const [randomQuote, setRandomQuote] = useState<Quote>(emptyQuoteObj);
  const [newUserQuote, setNewUserQuote] = useState<Quote>(emptyQuoteObj);
  const [userQuotes, setUserQuotes] = useState<Quote[]>([]);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [editUserId, setEditUserId] = useState(false); // State to control modal visibility

  async function createNewUser() {
    try {
      const response = await fetch("/generateUser", {
        method: "GET",
      });

      const data = await response.json();

      // Now you have access to the new user data
      console.log("API Key:", data.user.apiKey);
      console.log("Username:", data.user.username);

      // You could store the API key in localStorage or state, if needed
      localStorage.setItem("apiKey", data.user.apiKey);
    } catch (error) {
      console.error("Failed to create new user");
    }
  }

  // Function to handle the POST request to add a new quote
  const addQuote = async () => {
    const response = await fetch(`${url}/addQuote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quote: newUserQuote.quote,
        author: newUserQuote.author,
        userId: userId,
      }),
    });

    if (response.ok) {
      // Trigger getAddedQuote get request
      getUserQuotes();

      // Empty the data in newUserQuote
      setNewUserQuote(emptyQuoteObj);
    } else {
      console.error("Failed to add quote");
    }
  };

  // Function to delete selected quote from database
  const deleteQuote = async (quoteId: number) => {
    const response = await fetch(`${url}/deleteQuote`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quoteId }),
    });

    const result = await response.json();
    if (response.ok) {
      getUserQuotes();
    } else {
      console.error("Error deleting quote:", result.error);
    }
  };

  // Function to fetch a random quote (default OR user) from the API
  const getRandomQuote = async () => {
    const response = await axios.get(`${url}/randomQuote`);
    setRandomQuote(response.data);
  };

  // Function to handle the GET request to fetch all quotes
  const getUserQuotes = async () => {
    const response = await axios.get(`${url}/getUserQuotes`);
    setUserQuotes(response.data);
  };

  // useEffect hook to trigger API calls when the component mounts
  useEffect(() => {
    getRandomQuote();
    getUserQuotes();
    createNewUser();
    setUserId(generateUserId());
  }, []);

  return (
    <Fade triggerOnce={true}>
      <div className="lg:m-10">
        <div className="relative flex justify-end items-start p-4">
          <button
            onClick={() => setEditUserId(true)}
            className="-mt-32 -mr-10  transition"
          >
            <div className="w-11 sm:w-14">
              <Icon iconImg={user} alt={"close"} />
            </div>
          </button>
        </div>

        {editUserId && (
          <Fade duration={300} triggerOnce={true}>
            <div className="fixed inset-0 bg-black bg-opacity-65 flex justify-center h-screen items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg relative">
                <button
                  onClick={() => setEditUserId(false)}
                  className="absolute top-2 right-2 text-gray-600"
                >
                  ✖
                </button>
                <p className="mb-2 font-bold">User ID:</p>
                <input
                  type="text"
                  onChange={(e) => {
                    setUserId(e.target.value);
                    localStorage.setItem("userId", e.target.value);
                  }}
                  value={userId}
                  className="p-3 rounded-lg text-black bg-slate-200 border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                />
                <div className="mt-4 italic text-xs">
                  <p>
                    Use this, or your own custom ID
                    <br /> across devices to edit your memos
                  </p>
                </div>
              </div>
            </div>
          </Fade>
        )}

        {/* Display the random quote */}
        {randomQuote.quote.length > 0 ? (
          <div className="p-6 rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-semibold mb-2">{randomQuote.quote}</h2>
            <p className="text-right italic text-gray-700">
              {randomQuote.author}
            </p>
          </div>
        ) : (
          <div className="p-6 mt-6 bg-white rounded-lg shadow-lg">
            <p className="text-gray-500">Loading a random memo...</p>
          </div>
        )}

        {/* Section for leaving a new quote */}
        <div className="p-6 mt-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Leave a memo:</h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={newUserQuote.quote}
              onChange={(e) =>
                setNewUserQuote({ ...newUserQuote, quote: e.target.value })
              }
              placeholder="Enter a new memo"
              className="p-3 rounded-lg text-black bg-slate-200 border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
            />
            <input
              type="text"
              value={newUserQuote.author}
              onChange={(e) =>
                setNewUserQuote({ ...newUserQuote, author: e.target.value })
              }
              placeholder="Author"
              className="p-3 rounded-lg text-black bg-slate-200 border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
            />
            <button
              onClick={addQuote}
              className="p-3 rounded-lg transition-all hover:bg-blue-600 bg-blue-500 text-white font-bold shadow-lg"
            >
              Add Memo
            </button>
          </div>
        </div>

        {/* Display user-added quotes */}
        <div className="p-6 mt-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Visitors memos:</h2>
          <div className="flex flex-col items-center">
            {userQuotes.length > 0 ? (
              <ul className="space-y-4">
                {userQuotes.map((quote) => (
                  <div>
                    <li
                      key={quote.quoteId}
                      className="w-full bg-blue-100 p-4 rounded-lg shadow-md flex flex-col items-center"
                    >
                      <p className="font-bold text-lg text-center">
                        {quote.quote}
                      </p>
                      <p className="text-xs text-gray-600 mt-1 italic">
                        {quote.author}
                      </p>
                      {quote.userId === userId && (
                        <button
                          className="mt-3 px-4 py-2 text-xs text-red-500 font-semibold bg-red-100 hover:bg-red-200 rounded-full transition-all"
                          onClick={() => deleteQuote(quote.quoteId)}
                        >
                          Delete
                        </button>
                      )}
                    </li>
                  </div>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Loading memos...</p>
            )}
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default QuoteGenerator;
