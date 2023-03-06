import { useCallback, useEffect, useRef } from "react";
import { useTabs } from "./TabsContext";

interface Props {
  scrollOffset?: number;
  tabs: Array<{ label: string; id: string }>;
}

const Tabs: React.FC<Props> = ({ scrollOffset = 200, tabs }) => {
  const {
    activeTab,
    currentPosition,
    changeEndLimit,
    changeActiveTab,
    changeCurrentPosiotion,
  } = useTabs();

  const contRef = useRef<HTMLDivElement>(null);

  const calcEndLimit = useCallback(() => {
    if (!contRef.current) {
      return;
    }
    const { offsetWidth, scrollWidth } = contRef.current;
    const endLimit = scrollWidth - offsetWidth;
    changeEndLimit(endLimit);

    if (currentPosition > 0) {
      changeCurrentPosiotion(0);
    }
    if (currentPosition < -endLimit) {
      changeCurrentPosiotion(-endLimit);
    }
  }, [changeCurrentPosiotion, changeEndLimit, currentPosition]);

  useEffect(() => {
    calcEndLimit();
    window.addEventListener("resize", calcEndLimit);

    return () => {
      window.removeEventListener("resize", calcEndLimit);
    };
  }, [calcEndLimit]);

  return (
    <>
      <div className="overflow-x-hidden border-t-2 border-black border-opacity-20">
        <div
          className="flex text-base text-black gap-1 text-opacity-70 transition-transform duration-500 ease-in-out"
          ref={contRef}
          style={{
            transform: `translateX(${currentPosition}px)`,
          }}
        >
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`flex justify-center items-center flex-shrink-0 relative 
              bg-white bg-opacity-50 
              hover:bg-opacity-90 
              w-36 h-12 
              rounded-b-md cursor-pointer 
              text-sm
              transition-opacity duration-150
               ${activeTab === tab.id && "active-underline bg-opacity-100"}`}
              onClick={() => changeActiveTab(tab.id)}
            >
              <span className="capitalize-first">{tab.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Tabs;
