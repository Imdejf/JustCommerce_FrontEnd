import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import cs from "classnames";

import Logo from "../logo/Logo";
import MenuButton from "./MenuButton";
import NavbarItemList from "./NavbarItemList";

import { RootState } from "../../store/store";
import useDetectOutsideClick from "../../hooks/useOutsideDetectClick";
import ProfileItem from "./ProfileItem";
import config from "../../../package.json";
import Notifications from "./Notifications";

const Navbar: React.FC = () => {
  const { isAuth } = useSelector((state: RootState) => state.auth);
  const { pathname } = useLocation();

  const [isExpanded, setIsExpanded] = useState(false);
  const navbarRef = useRef(null);

  const handleMenuExpand = (value: boolean) => {
    setIsExpanded(value);
  };

  useEffect(() => {
    handleMenuExpand(false);
  }, [pathname]);

  useDetectOutsideClick(navbarRef, () => handleMenuExpand(false));

  const containerClassNames = cs(
    "flex flex-row-reverse justify-between md:flex-col md:sticky top-0 md:h-screen py-8 px-8 md:pb-0 relative z-40",
    {
      "bg-white md:bg-transparent opacity-100": isExpanded,
    },
  );

  return (
    <nav className={containerClassNames} ref={navbarRef}>
      {isAuth ? (
        <div className="flex md:w-full md:flex-col h-full md:py-24">
          <MenuButton
            isExpanded={isExpanded}
            handleMenuExpand={handleMenuExpand}
          />
          <NavbarItemList isExpanded={isExpanded} />
          <ProfileItem />
          <Notifications />
        </div>
      ) : (
        <div className="flex flex-col md:pt-36 text-lightpurple text-sm opacity-70 leading-relaxed"></div>
      )}
      <Logo className="h-32 md:h-32 md:mx-auto" />

      <div className="hidden md:flex justify-between px-12 pt-12 pb-8 text-xxs opacity-80">
        <span className="opacity-50">wersja {config.version}</span>

        <span className="opacity-50">MMlab 2021</span>
      </div>
    </nav>
  );
};

export default Navbar;
