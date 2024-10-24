import { useEffect, useState } from "react";
import axios from "axios";
import { Fade } from "react-awesome-reveal";
import Icon from "./Icon";
import userIcon from "/src/assets/iconography/user.svg";

const url = "https://random-quote-generator-api.vercel.app";

// https://random-quote-generator-api.vercel.app
// http://localhost:8080

const QuoteGenerator = () => {
  interface Quote {
    quote: string;
    author: string;
    authorId: number;
    id: number;
  }

  const emptyQuoteObj: Quote = {
    quote: "",
    author: "",
    authorId: 0,
    id: 0,
  };

  interface User {
    id: number;
    apiKey: string;
  }

  const emptyUser: User = {
    id: 0,
    apiKey: "",
  };

  const [user, setUser] = useState<User>(() => {
    // This seems messed up
    const existingUser = localStorage.getItem("user");
    return existingUser ? JSON.parse(existingUser) : emptyUser;
  });
  const [randomQuote, setRandomQuote] = useState<Quote>(emptyQuoteObj);
  const [newUserQuote, setNewUserQuote] = useState<Quote>(emptyQuoteObj);
  const [userQuotes, setUserQuotes] = useState<Quote[]>([]);
  const [editUser, setEditUser] = useState(false); // State to control modal visibility

  // Retrieve the user from localStorage or create a new one
  const getUser = async () => {
    if (!user || user.id === 0) {
      try {
        const response = await fetch(`${url}/generateUser`, {
          method: "POST",
        });

        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data.newUser));
        setUser(data.newUser);
        return data.newUser;
      } catch (error) {
        console.error("Failed to create new user");
      }
    } else {
      return user;
    }
  };

  const addQuote = async () => {
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
      getUserQuotes();
      setNewUserQuote(emptyQuoteObj); // Empty the data in newUserQuote
    } else {
      console.error("Failed to add quote");
    }
  };

  const deleteQuote = async (quoteId: number) => {
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

  const getRandomQuote = async () => {
    const response = await axios.get(`${url}/randomQuote`);
    setRandomQuote(response.data);
  };

  const getUserQuotes = async () => {
    const response = await axios.get(`${url}/getUserQuotes`);
    setUserQuotes(response.data);
  };

  useEffect(() => {
    getRandomQuote();
    getUserQuotes();
  }, []);

  return (
    <Fade triggerOnce={true}>
      <div className="lg:m-10">
        <div className="relative flex justify-end items-start">
          <button
            onClick={() => setEditUser(true)}
            className="-mt-28 -mr-18  transition"
          >
            <div className="w-11 sm:w-14">
              <Icon iconImg={userIcon} alt={"close"} />
            </div>
          </button>
        </div>

        {editUser && (
          <Fade duration={300} triggerOnce={true}>
            <div className="fixed inset-0 bg-black bg-opacity-65 flex justify-center h-screen items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg relative">
                <button
                  onClick={() => setEditUser(false)}
                  className="absolute top-2 right-2 text-gray-600"
                >
                  ✖
                </button>
                <p className="mb-2 font-bold">User ID:</p>
                <input
                  type="number"
                  onChange={(e) => {
                    const updatedUser = { ...user, id: Number(e.target.value) }; // Update just the id
                    setUser(updatedUser); // Set the updated user state
                    localStorage.setItem("user", JSON.stringify(updatedUser)); // Update localStorage
                  }}
                  placeholder="No user ID"
                  value={user.id > 0 ? user.id : undefined}
                  className="p-3 rounded-lg text-black bg-slate-200 border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                />
                <p className="my-2 font-bold">User Password:</p>
                <input
                  type="text"
                  onChange={(e) => {
                    const updatedUser = { ...user, apiKey: e.target.value }; // Update just the apiKey
                    setUser(updatedUser); // Set the updated user state
                    localStorage.setItem("user", JSON.stringify(updatedUser)); // Update localStorage
                  }}
                  placeholder="No user password"
                  value={user.apiKey.length > 0 ? user.apiKey : undefined}
                  className="p-3 rounded-lg text-black bg-slate-200 border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
                />
                <div className="mt-4 italic text-xs">
                  <p>
                    Leave a memo to generate user details.
                    <br />
                    Copy these details to edit your memos across devices.
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
                      key={quote.id}
                      className="w-full bg-blue-100 p-4 rounded-lg shadow-md flex flex-col items-center"
                    >
                      <p className="font-bold text-lg text-center">
                        {quote.quote}
                      </p>
                      <p className="text-xs text-gray-600 mt-1 italic">
                        {quote.author}
                      </p>
                      {quote.authorId === user.id && (
                        <button
                          className="mt-3 px-4 py-2 text-xs text-red-500 font-semibold bg-red-100 hover:bg-red-200 rounded-full transition-all"
                          onClick={() => deleteQuote(quote.id)}
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
