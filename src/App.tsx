import "./App.css";
import { Analytics } from "@vercel/analytics/react";
import { EditUserDetails } from "./components/EditUserDetails";
import Quotes from "./components/Quotes";
import { Banner } from "./components/Banner";
import { useAuth } from "./hooks/AuthProvider";
import blobs from "./assets/blobs.json";
import LottieAnimation from "./components/LottieAnimation";

function App() {
  const user = useAuth();

  return (
    <>
      <Analytics />
      <div className="background-animation">
        <LottieAnimation animationData={blobs} />
      </div>

      <Banner />
      {user && <EditUserDetails user={user} />}
      <Quotes user={user} />
    </>
  );
}

export default App;
