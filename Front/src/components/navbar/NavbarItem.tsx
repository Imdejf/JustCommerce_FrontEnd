import cs from 'classnames';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

import { INavbarItem } from './navbarTypes';

const NavbarItem: React.FC<INavbarItem> = ({ icon: Icon, label, items, path }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => setIsExpanded(!isExpanded);

  const listClasses = cs('overflow-hidden', {
    'h-0': !isExpanded,
    '-mt-1 mb-2 ml-2': items?.length && isExpanded,
  });

  return (
    <div>
      {path ? (
        <NavLink activeClassName='text-blue' to={path} exact={path === '/'} className='navItem' onClick={handleExpand}>
          <Icon className='fill-current' />
          <span>{label}</span>
        </NavLink>
      ) : (
        <div className='navItem' onClick={handleExpand}>
          <Icon />
          <span>{label}</span>
        </div>
      )}

      <div className={listClasses}>
        {items?.map(({ label, path, icon: ItemIcon }) => (
          <NavLink
            activeClassName='text-blue'
            exact={path === '/'}
            key={label}
            to={path}
            className='navItem text-xs py-4'
          >
            <div>{ItemIcon && <ItemIcon className='flex justify-center' />}</div>
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default NavbarItem;
