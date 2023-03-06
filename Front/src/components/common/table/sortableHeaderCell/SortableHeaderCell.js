import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';

import { tableHeaderType } from '../tableTypes';
import { ReactComponent as Arrow } from 'assets/icons/sortArrow.svg';

const SortableHeaderCell = ({ header, sortState, handleSort }) => {
  const isActiveSortColumn = sortState.key === header.key;
  return (
    <div className='flex items-center'>
      <span className='flex-1 text-base font-medium text-black text-opacity-70'>{header.label}</span>
      {header.sortable && (
        <span className='flex'>
          <Arrow
            className={cs('opacity-40 hover:opacity-60 transition-opacity duration-150 cursor-pointer', {
              'opacity-60 text-blue': isActiveSortColumn && sortState.direction === 'asc',
            })}
            onClick={() => handleSort({ key: header.key, direction: 'asc' })}
          />
          <Arrow
            className={cs(
              'opacity-40 hover:opacity-60 transition-opacity duration-150 cursor-pointer transform rotate-180',
              {
                'opacity-60 text-blue': isActiveSortColumn && sortState.direction === 'desc',
              }
            )}
            onClick={() => handleSort({ key: header.key, direction: 'desc' })}
          />
        </span>
      )}
    </div>
  );
};

SortableHeaderCell.propTypes = {
  header: tableHeaderType,
  sortState: PropTypes.shape({
    key: PropTypes.string,
    direction: PropTypes.oneOf(['asc', 'desc']),
  }),
  handleSort: PropTypes.func,
};

export default SortableHeaderCell;
