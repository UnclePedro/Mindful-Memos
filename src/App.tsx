import "./App.css";
import { useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { User } from "./models/User";
import { EditUserDetails } from "./components/EditUserDetails";
import Memos from "./components/Memos";

function App() {
  const emptyUser: User = {
    id: 0,
    apiKey: "",
  };

  const [user, setUser] = useState<User>(() => {
    // This seems messed up
    const existingUser = localStorage.getItem("user");
    return existingUser ? JSON.parse(existingUser) : emptyUser;
  });

  return (
    <>
      <Analytics />
      <div className="m-4">
        <h1 className="text-4xl font-bold">Mindful Memos</h1>
        <p>Share an anecdote...</p>
      </div>
      <EditUserDetails user={user} updateUser={setUser} />
      <Memos user={user} />
    </>
  );
}

export default App;
