import { useState } from "react";

function App() {
  const [toggle, setToggle] = useState(false);

  const hdlToggle = () => {
    setToggle(prv=>!prv)
  }
  return (
    <div className="w-screen h-screen flex flex-col gap-3" data-theme={toggle ? 'dark': ''}>
      <div className="prose">
        <h1 className="underline">Hello world!</h1>
      </div>
      <div className="form-control">
        <input type="checkbox" className="toggle" checked={toggle} onChange={hdlToggle} />
      </div>
      <div className="flex gap-1">
        <button className="btn">Button</button>
        <button className="btn btn-neutral">Neutral</button>
        <button className="btn btn-primary">Primary</button>
        <button className="btn btn-secondary">Secondary</button>
        <button className="btn btn-accent">Accent</button>
        <button className="btn btn-ghost">Ghost</button>
        <button className="btn btn-link">Link</button>
      </div>
    </div>
  );
}

export default App;
