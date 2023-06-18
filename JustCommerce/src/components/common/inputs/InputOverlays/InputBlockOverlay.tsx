import cs from 'classnames';

import { ReactComponent as BlockIco } from '../../../../assets/icons/false.svg';

interface IInputBlockOverlayProps {
  show: boolean;
}

const InputBlockOverlay: React.FC<IInputBlockOverlayProps> = ({ show }) => {
  const className = cs(
    'flex items-center justify-center gap-x-4 pr-18 inset-0 absolute bg-gray opacity-70 select-none cursor-not-allowed',
    {
      hidden: !show,
      flex: show,
    }
  );
  return (
    <div className={className}>
      <span className='text-sm font-bold'>ZABLOKOWANE</span> <BlockIco />
    </div>
  );
};

export default InputBlockOverlay;
