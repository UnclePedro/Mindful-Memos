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
  const [randomQuote, setRandomQuote] = useState<Quote>({
    quote: "Fetching quote...",
    author: "Unknown",
    id: 0,
  });
  const [newUserQuote, setNewUserQuote] = useState("");
  const [displayUserQuote, setDisplayUserQuote] = useState<Quote[]>([]);

  // Function to fetch a random quote from the API
  const getRandomQuote = async () => {
    const response = await axios.get(`${url}/randomquote`);
    setRandomQuote(response.data); // Update state with the random quote
    console.log(randomQuote);
  };

  // Function to handle the POST request to add a new quote
  const addQuote = async () => {
    const response = await fetch(`${url}/quotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quote: newUserQuote }), // Send the new quote as JSON
    });

    console.log(response);

    if (response.ok) {
      // Clear input and refresh quote count or other relevant data
      setNewUserQuote("");

      // Trigger getAddedQuote get request
      getDatabaseQuotes();
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
      getDatabaseQuotes();
    } else {
      console.error("Error deleting quote:", result.error);
    }
  };

  // Function to handle the GET request to fetch all quotes
  const getDatabaseQuotes = async () => {
    const response = await axios.get(`${url}/quotes`);
    console.log(response);
    setDisplayUserQuote(response.data); // Update the state with the new quotes
  };

  // useEffect hook to trigger API calls when the component mounts
  useEffect(() => {
    getRandomQuote();
    getDatabaseQuotes();
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
          value={newUserQuote}
          onChange={(e) => setNewUserQuote(e.target.value)} // Update new quote state
          placeholder="Enter a new quote"
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
          {displayUserQuote.length > 0 ? (
            <ul>
              {displayUserQuote.map((quote) => (
                <div
                  className="flex w-fit p-2 m-2 justify-center bg-blue-500 rounded-lg"
                  key={quote.id}
                >
                  <li>{quote.quote}</li>
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
