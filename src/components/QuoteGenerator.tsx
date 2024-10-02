import { useEffect, useState } from "react";
import axios from "axios";

const url = "https://random-quote-generator-api.vercel.app";

// https://random-quote-generator-api.vercel.app
// http://localhost:8080

const QuoteGenerator = () => {
  interface Quote {
    quote: string;
    author: string;
    id: number;
  }

  const emptyQuoteObj: Quote = {
    quote: "",
    author: "",
    id: 0,
  };

  const [randomQuote, setRandomQuote] = useState<Quote>(emptyQuoteObj);
  const [newUserQuote, setNewUserQuote] = useState<Quote>(emptyQuoteObj);
  const [userQuotes, setUserQuotes] = useState<Quote[]>([]);

  // Function to handle the POST request to add a new quote
  const addQuote = async () => {
    const response = await fetch(`${url}/quotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quote: newUserQuote.quote,
        author: newUserQuote.author,
      }),
    });

    if (response.ok) {
      // Empty the data in newUserQuote
      setNewUserQuote(emptyQuoteObj);

      // Trigger getAddedQuote get request
      getUserQuotes();
    } else {
      console.error("Failed to add quote");
    }
  };

  // // Function to delete selected quote from database
  // const deleteQuote = async (id: number) => {
  //   const response = await fetch(`${url}/deleteQuote`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ id }),
  //   });

  //   const result = await response.json();
  //   if (response.ok) {
  //     getUserQuotes();
  //   } else {
  //     console.error("Error deleting quote:", result.error);
  //   }
  // };

  // Function to fetch a random quote (default OR user) from the API
  const getRandomQuote = async () => {
    const response = await axios.get(`${url}/randomquote`);
    setRandomQuote(response.data);
  };

  // Function to handle the GET request to fetch all quotes
  const getUserQuotes = async () => {
    const response = await axios.get(`${url}/quotes`);
    setUserQuotes(response.data);
  };

  // useEffect hook to trigger API calls when the component mounts
  useEffect(() => {
    getRandomQuote();
    getUserQuotes();
  }, []);

  return (
    <div className="lg:m-10">
      {/* Display the random quote */}
      <div className="p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-2">{randomQuote.quote}</h2>
        <p className="text-right italic text-gray-700">{randomQuote.author}</p>
      </div>

      {/* Section for leaving a new quote */}
      <div className="p-6 mt-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Leave a quote:</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={newUserQuote.quote}
            onChange={(e) =>
              setNewUserQuote({ ...newUserQuote, quote: e.target.value })
            }
            placeholder="Enter a new quote"
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
            Add Quote
          </button>
        </div>
      </div>

      {/* Display user-added quotes */}
      <div className="p-6 mt-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          ✨ Quotes from the people ✨
        </h2>
        <div className="flex flex-col items-center">
          {userQuotes.length > 0 ? (
            <ul className="space-y-4">
              {userQuotes.map((quote) => (
                <li
                  key={quote.id}
                  className="w-full bg-blue-100 p-4 rounded-lg shadow-md flex flex-col items-center"
                >
                  <p className="font-bold text-lg text-center">{quote.quote}</p>
                  <p className="text-xs text-gray-600 mt-1 italic">
                    {quote.author}
                  </p>
                  {/* <button
                    className="mt-3 px-4 py-2 text-xs text-red-500 font-semibold bg-red-100 hover:bg-red-200 rounded-full transition-all"
                    onClick={() => deleteQuote(quote.id)}
                  >
                    Delete
                  </button> */}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No new quotes added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteGenerator;
