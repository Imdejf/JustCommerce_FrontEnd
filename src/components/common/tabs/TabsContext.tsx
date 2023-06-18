import { useUrlQuery } from "hooks/useUrlQuery";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type ContextType = {
  activeTab: string | undefined;
  currentPosition: number;
  limitRight: number;
  changeCurrentPosiotion: (position: number) => void;
  changeEndLimit: (limit: number) => void;
  changeActiveTab: (tab: string) => void;
  scroll: (direction: Direction) => void;
};

type Direction = "left" | "right";

interface Props {
  scrollOffset?: number;
}

const TabsContext = createContext<ContextType | null>(null);

export const useTabs = () => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error(
      "Tabs compound components cannot be rendered outside the TabsView component"
    );
  }

  return context;
};

const TabsProvider: React.FC<Props> = ({ children, scrollOffset = 200 }) => {
  const [activeTab, setActiveTab] = useState<string>();
  const [currentPosition, setCurrentPosition] = useState(0);
  const [limitEnd, setLimitEnd] = useState(0);

  const { query, changeQuery } = useUrlQuery();

  const scroll = useCallback(
    (direction: Direction) => {
      switch (direction) {
        case "left": {
          setCurrentPosition((prev) => Math.min(0, prev + scrollOffset));
          break;
        }
        case "right": {
          setCurrentPosition((prev) =>
            Math.max(-limitEnd, prev - scrollOffset)
          );
          break;
        }
      }
    },
    [limitEnd, scrollOffset]
  );

  const changeCurrentPosiotion = (position: number) => {
    setCurrentPosition(position);
  };

  const changeEndLimit = useCallback((limit: number) => {
    setLimitEnd(limit);
  }, []);

  const changeActiveTab = useCallback(
    (tab: string) => {
      changeQuery([{ name: "tab", value: tab }]);
    },
    [changeQuery]
  );

  useEffect(() => {
    const tabQuery = query.find((q) => q.name === "tab");
    if (!tabQuery) return;

    setActiveTab(tabQuery.value);
  }, [query]);

  return (
    <TabsContext.Provider
      value={{
        activeTab,
        currentPosition,
        limitRight: limitEnd,
        scroll,
        changeEndLimit,
        changeActiveTab,
        changeCurrentPosiotion,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};

export default TabsProvider;
