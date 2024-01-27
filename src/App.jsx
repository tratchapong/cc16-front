import { useState } from "react";
import Router from "./routes/Router";
import useTheme from "./hooks/useTheme";
import useAuth from "./hooks/useAuth";

function App() {
  const {theme} = useTheme()
  const {user, loading} = useAuth()

  if(loading) {
    return (
      <div className="flex justify-center mt-40">
        <span className="loading loading-dots loading-lg scale-150 text-secondary"></span>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col gap-3" data-theme={theme ? 'dark': 'cupcake'}>
      <hr />
      <Router />
    </div>
  );
}

export default App;
