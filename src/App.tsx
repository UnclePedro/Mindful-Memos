import "./App.css";
import { useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { User } from "./models/User";
import { EditUserDetails } from "./components/EditUserDetails";
import Quotes from "./components/Quotes";
import { getUserFromLocalStorage } from "./helpers/userAuthenticationHelper";

function App() {
  const [user, setUser] = useState<User>(getUserFromLocalStorage());

  return (
    <>
      <Analytics />
      <div className="m-4">
        <h1 className="text-4xl font-bold">Mindful Memos</h1>
        <p>Share an anecdote...</p>
      </div>
      <EditUserDetails user={user} updateUser={setUser} />
      <Quotes user={user} updateUser={setUser} />
    </>
  );
}

export default App;
