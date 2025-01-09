import { useEffect, useState } from "react";
import { emptyQuoteObj, Quote } from "../models/Quote";
import {
  addQuote,
  deleteQuote,
  getRandomQuote,
  getUserQuotes,
} from "../helpers/quotesHelper";
import { User } from "../models/User";
import { LoadingAnimation } from "./LoadingAnimation";

// https://api.mindful-memos.peterforsyth.dev
// http://localhost:8080
const url = "https://api.mindful-memos.peterforsyth.dev";

interface Props {
  user: User | undefined;
}

const Memos = ({ user }: Props) => {
  const [randomQuote, setRandomQuote] = useState<Quote>(emptyQuoteObj);
  const [userQuotes, setUserQuotes] = useState<Quote[]>([]);
  const [newUserQuote, setNewUserQuote] = useState<Quote>(emptyQuoteObj);
  const [addQuoteLoading, setAddQuoteLoading] = useState(false);
  const [deleteQuoteLoading, setDeleteQuoteLoading] = useState(false);

  useEffect(() => {
    getRandomQuote().then(setRandomQuote);
    getUserQuotes().then(setUserQuotes);
  }, []);

  return (
    <div className="lg:m-10">
      {/* Display a random quote */}
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
      {!user ? (
        <a
          href={`${url}/login`}
          className="p-3 mt-6 rounded-lg transition-all hover:bg-blue-600 bg-blue-500 text-white font-bold shadow-lg flex items-center justify-center"
        >
          Sign in to leave a memo
        </a>
      ) : (
        <div className="p-6 mt-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            Leave a memo {user.firstName}:
          </h2>
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
              onClick={async () => {
                await addQuote(newUserQuote, setAddQuoteLoading);
                setUserQuotes(await getUserQuotes());
                setNewUserQuote(emptyQuoteObj);
              }}
              className="p-3 rounded-lg transition-all hover:bg-blue-600 bg-blue-500 text-white font-bold shadow-lg flex items-center justify-center"
            >
              {addQuoteLoading ? <LoadingAnimation size={24} /> : "Add Memo"}
            </button>
          </div>
        </div>
      )}

      {/* Display user-added quotes */}
      <div className="p-6 mt-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Visitors memos:</h2>
        <div className="flex flex-col items-center">
          {userQuotes.length > 0 ? (
            <ul className="space-y-4">
              {userQuotes
                .sort((quoteA, quoteB) => quoteA.id - quoteB.id) // Sort by quote id in ascending order
                .map((quote) => (
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
                    {quote.userId === user?.id && (
                      <button
                        className="mt-3 px-4 py-2 text-xs text-white font-semibold bg-red-400 hover:bg-red-500 rounded-full transition-all"
                        onClick={async () => {
                          await deleteQuote(quote.id, setDeleteQuoteLoading);
                          setUserQuotes(await getUserQuotes());
                        }}
                      >
                        {deleteQuoteLoading ? (
                          <LoadingAnimation size={16} />
                        ) : (
                          "Delete"
                        )}
                      </button>
                    )}
                  </li>
                ))}
            </ul>
          ) : (
            <p className="text-gray-500">Loading memos...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Memos;
