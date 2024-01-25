import { useState } from "react";
import Router from "./routes/Router";

function App() {
  const [toggle, setToggle] = useState(false);

  const hdlToggle = () => {
    setToggle(prv=>!prv)
  }
  return (
    <div className="min-h-screen flex flex-col gap-3" data-theme={toggle ? 'dark': 'cupcake'}>
      <div className="prose">
        <h1 className="underline">Hello world!</h1>
      </div>
      <div className="form-control">
        <input type="checkbox" className="toggle" checked={toggle} onChange={hdlToggle} />
      </div>
    <hr />
    <Router />
    </div>
  );
}

export default App;
