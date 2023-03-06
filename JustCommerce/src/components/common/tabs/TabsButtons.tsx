import React, { useRef } from 'react';
import { useTabs } from './TabsContext';

import { ReactComponent as Arrow } from '../../../assets/icons/sortArrow.svg';

interface Props {
  className?: string;
}

const TabsButtons: React.FC<Props> = ({ className }) => {
  const { scroll } = useTabs();

  const inter = useRef<NodeJS.Timeout>();
  const timer = useRef<NodeJS.Timeout>();

  const handleMouseDown = (direction: 'left' | 'right') => {
    timer.current = setTimeout(() => {
      inter.current = setInterval(() => scroll(direction), 100);
    }, 200);
  };

  const handleMouseUp = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    if (inter.current) {
      clearInterval(inter.current);
    }
  };

  return (
    <div className={`flex gap-x-2 ${className}`}>
      <button
        className='opacity-40 transform rotate-90 hover:opacity-60'
        onClick={() => scroll('left')}
        onMouseDown={() => handleMouseDown('left')}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <Arrow />
      </button>
      <button
        className='opacity-40 transform -rotate-90 hover:opacity-60'
        onClick={() => scroll('right')}
        onMouseDown={() => handleMouseDown('right')}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <Arrow />
      </button>
    </div>
  );
};

export default TabsButtons;
