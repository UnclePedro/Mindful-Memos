import "./App.css";
import { Analytics } from "@vercel/analytics/react";
import { EditUserDetails } from "./components/EditUserDetails";
import Quotes from "./components/Quotes";
import { useAuth } from "./hooks/AuthProvider";

function App() {
  const user = useAuth();

  return (
    <>
      <Analytics />
      <div className="m-4">
        <h1 className="text-4xl font-bold">Mindful Memos</h1>
        <p>Share an anecdote...</p>
      </div>
      {user && <EditUserDetails user={user} />}
      <Quotes user={user} />
    </>
  );
}

export default App;
