import React from 'react';
import { useNavigate } from 'react-router-dom';

const CardOne = ({ cardName , count , IconComponent, link, styles, additionalText }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link);
  };

  return (
    <div
      className={`cursor-pointer rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark ${styles}`}
      onClick={handleClick}
    >
      {IconComponent && (
        <div className='flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4'>
          <IconComponent className='fill-primary dark:fill-white' />
        </div>
      )}

      <div className='mt-4 flex items-end justify-between'>
        <div>
          <h4 className='text-title-md font-bold text-black dark:text-white'>{count}</h4>
          <span className='text-sm font-medium' style={{ whiteSpace: 'nowrap' }}>{cardName}</span>

        </div>
        <div className='text-sm text-right text-meta-3'>{additionalText}</div>
      </div>
    </div>
  );
};

export default CardOne;
