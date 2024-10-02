import { useEffect, useState } from "react";
import axios from "axios";

const url = "http://localhost:8080";

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

  // Function to delete selected quote from database
  const deleteQuote = async (id: number) => {
    const response = await fetch(`${url}/deleteQuote`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
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
    <div className="m-14">
      <div className="p-4">
        <h2 className="text-xl font-bold">{randomQuote.quote}</h2>
        <p>{randomQuote.author}</p>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold">Leave a quote:</h2>
        <input
          type="text"
          value={newUserQuote.quote}
          onChange={(e) =>
            setNewUserQuote({ ...newUserQuote, quote: e.target.value })
          }
          placeholder="Enter a new quote"
          className="p-2 m-2 rounded-lg text-black bg-slate-300"
        />

        <input
          type="text"
          value={newUserQuote.author}
          onChange={(e) =>
            setNewUserQuote({ ...newUserQuote, author: e.target.value })
          }
          placeholder="Author"
          className="p-2 m-2 rounded-lg text-black bg-slate-300"
        />
        <button
          onClick={addQuote}
          className="p-2 rounded-lg transition-all hover:bg-blue-700 bg-blue-500 font-bold"
        >
          Add Quote
        </button>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold">✨ Quotes from the people ✨</h2>
        <div className="flex justify-center align-middle">
          {userQuotes.length > 0 ? (
            <ul>
              {userQuotes.map((quote) => (
                <div
                  className="w-fit p-2 m-2 justify-center bg-blue-500 rounded-lg"
                  key={quote.id}
                >
                  <li className="font-bold">{quote.quote}</li>
                  <div className="flex p-2">
                    <li className="text-xs">{quote.author}</li>
                  </div>
                  <button
                    className="px-2 font-bold"
                    onClick={() => deleteQuote(quote.id)}
                  >
                    X
                  </button>
                </div>
              ))}
            </ul>
          ) : (
            <p>No new quotes added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteGenerator;
