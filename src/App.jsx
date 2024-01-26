import { useState } from "react";
import Router from "./routes/Router";
import useTheme from "./hooks/useTheme";
import useAuth from "./hooks/useAuth";

function App() {
  const {theme} = useTheme()
  const {user} = useAuth()

  return (
    <div className="min-h-screen flex flex-col gap-3" data-theme={theme ? 'dark': 'cupcake'}>
      <hr />
      <Router />
    </div>
  );
}

export default App;
