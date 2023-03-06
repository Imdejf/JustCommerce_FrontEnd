import React from 'react';

interface Props {
  label: string;
  value: string | number;
}

const DetailItem: React.FC<Props> = ({ label, value }) => {
  return (
    <div className='flex justify-between py-12 px-18 text-sm bg-white bg-opacity-10 mb-1'>
      <span className='text-black text-opacity-40'>{label}</span>
      <span className='text-black text-opacity-80'>{value}</span>
    </div>
  );
};

export default DetailItem;
