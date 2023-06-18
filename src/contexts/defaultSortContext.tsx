import React, { createContext, useEffect, useState } from "react";

type Context = [string, React.Dispatch<React.SetStateAction<string>>];

interface Props {
  children: React.ReactNode;
}

export const DefaultSortContext = createContext<Context>(null!);

const DefaultSortProvider: React.FC<Props> = ({ children }) => {
  const [defaultSort, setDefaultSort] = useState(
    localStorage.getItem("defaultSort") || "0",
  );

  useEffect(() => {
    localStorage.setItem("defaultSort", defaultSort);
  }, [defaultSort]);

  return (
    <DefaultSortContext.Provider value={[defaultSort, setDefaultSort]}>
      {children}
    </DefaultSortContext.Provider>
  );
};

export default DefaultSortProvider;
