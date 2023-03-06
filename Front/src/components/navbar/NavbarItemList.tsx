import NavbarItem from './NavbarItem';
import NavbarMobileList from './NavbarMobileList';

import { INavbarItemListProps } from './navbarTypes';
import { navLinks } from './navbarUtils';

const NavbarItemList: React.FC<INavbarItemListProps> = ({ isExpanded }) => {
  return (
    <>
      <div className='hidden md:block relative overflow-y-auto' style={{ maxHeight: '70vh' }}>
        {navLinks.map((item) => (
          <NavbarItem key={item.label} {...item} />
        ))}
      </div>
      <div>
        <NavbarMobileList isExpanded={isExpanded} />
      </div>
    </>
  );
};

export default NavbarItemList;
