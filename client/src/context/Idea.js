import { createContext, useEffect, useState } from "react";

export const IdeaContext = createContext({});

export function IdeaProvider({ children }) {
  const [idea, setIdea] = useState([]);

  return (
    <IdeaContext.Provider value={[idea, setIdea]}>
      {children}
    </IdeaContext.Provider>
  );
}
