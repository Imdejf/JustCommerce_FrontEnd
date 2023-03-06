import cs from 'classnames';
import { useDispatch } from 'react-redux';

import NavbarItem from './NavbarItem';

import { signOut } from '../../store/actions/auth';
import { INavbarItemListProps } from './navbarTypes';
import { navLinks } from './navbarUtils';

import LogOutIco from '../../assets/icons/logout.svg';

const NavbarMobileList: React.FC<INavbarItemListProps> = ({ isExpanded }) => {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
  };

  const listClasses = cs(
    'absolute z-30 left-0 top-16 w-full bg-white md:hidden overflow-hidden shadow-lg',
    {
      'h-auto': isExpanded,
      'h-0': !isExpanded,
    }
  );
  return (
    <div className={listClasses}>
      {navLinks.map((item) => (
        <NavbarItem key={item.label} {...item} />
      ))}
      <button
        onClick={handleSignOut}
        className={
          'grid grid-cols-navItem items-center text-sm text-lightpurple cursor-pointer py-12 px-18'
        }
      >
        <img className='flex justify-center' src={LogOutIco} alt='' />
        <span>Wyloguj</span>
      </button>
    </div>
  );
};

export default NavbarMobileList;
