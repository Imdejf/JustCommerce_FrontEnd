import Box from '../Box';
import { IBasicBoxProps } from '../boxTypes';

const BasicBox: React.FC<IBasicBoxProps> = ({ icon, status, subTitle, title, type }) => {
  return (
    <Box className='px-36 p-18'>
      <>
        <div className='flex flex-1 items-center gap-6 text-sm'>
          <img className='w-16' src={icon} alt='' />
          <div>
            <div>{title}</div>
            <div className='text-sm opacity-50'>{subTitle}</div>
          </div>
        </div>
        <div className='flex flex-col justify-between text-sm text-right'>
          <div data-testid='statusLabel' className={`text-${status.color}`}>
            {status.label}
          </div>
          <div className='opacity-30'>{type}</div>
        </div>
      </>
    </Box>
  );
};

export default BasicBox;
