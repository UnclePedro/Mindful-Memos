import "./App.css";
import QuoteGenerator from "./components/QuoteGenerator";

function App() {
  return (
    <>
      <div className="m-4">
        <h1 className="text-4xl font-bold">Mindful Memos</h1>
        <p>Had an inspiring thought that's worth sharing? Here's the place.</p>
      </div>

      <QuoteGenerator />
    </>
  );
}

export default App;
