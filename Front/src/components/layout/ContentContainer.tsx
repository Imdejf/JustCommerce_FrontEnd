import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";

import Button from "../common/buttons/basicButton/Button";

import { ButtonVariant } from "../common/buttons/buttonTypes";
import { ReactComponent as Arrow } from "../../assets/icons/arrow.svg";
import { useEffect, useRef } from "react";

export interface IContentContainerProps {
  TopBar?: JSX.Element;
  title: string;
  path?: string;
}

const ContentContainer: React.FC<IContentContainerProps> = ({
  title,
  children,
  TopBar,
  path = "/",
}) => {
  const { goBack, push } = useHistory();
  const topbarRef = useRef<HTMLDivElement>(null);

  const changeCssProperty = () => {
    const oldValue =
      document.documentElement.style.getPropertyValue("--topbar-height");

    if (
      topbarRef.current &&
      oldValue !== `${topbarRef.current.clientHeight}px`
    ) {
      document.documentElement.style.setProperty(
        "--topbar-height",
        topbarRef.current.clientHeight + "px",
      );
    }
  };

  useEffect(() => {
    changeCssProperty();
    window.addEventListener("resize", changeCssProperty);

    return () => {
      window.removeEventListener("resize", changeCssProperty);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Just Win | {title || ""}</title>
      </Helmet>
      <div
        ref={topbarRef}
        className="flex flex-col md:flex-row items-start justify-between gap-x-2 gap-y-6 py-12 px-18 bg-white-dirty sticky top-0 z-30"
      >
        <div className="flex items-center gap-x-4">
          <Button
            className="w-11 h-11 z-10 hover:opacity-100 shadow p-0 flex-shrink-0"
            variant={ButtonVariant.Submit}
            onClick={() => push(path)}
          >
            <i>
              <Arrow className="fill-current w-7" />
            </i>
          </Button>
          <h2 className="text-black text-opacity-80 text-lg w-max capitalize-first">
            {title}
          </h2>
        </div>
        {TopBar && <div className="w-full">{TopBar}</div>}
      </div>
      <div>{children}</div>
    </>
  );
};

export default ContentContainer;
