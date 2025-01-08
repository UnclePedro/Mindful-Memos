import "./App.css";
import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { User } from "./models/User";
import { EditUserDetails } from "./components/EditUserDetails";
import Quotes from "./components/Quotes";
import { validateSession } from "./helpers/userAuthenticationHelper";

import Cookies from "js-cookie";

function App() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (Cookies.get("wos-session")) {
      const setUserData = async () => {
        const user = await validateSession();
        if (!user) return;
        setUser(user);
      };
      setUserData();
    }
  }, []);

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
