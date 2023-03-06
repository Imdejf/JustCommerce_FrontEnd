import MenuIco from '../../assets/icons/menu.svg';

interface IProps {
  isExpanded: boolean;
  handleMenuExpand: (value: boolean) => void;
}

const MenuButton: React.FC<IProps> = ({ isExpanded, handleMenuExpand }) => {
  return (
    <div
      onClick={() => handleMenuExpand(!isExpanded)}
      className='flex gap-4 items-center justify-center cursor-pointer md:py-12 px-18 text-sm my-2'
    >
      <div className='w-8 md:w-6 h-8 md:h-6'>
        <img className='w-full h-full' src={MenuIco} alt='menu icon' />
      </div>
      <div className='hidden md:block'>menu</div>
    </div>
  );
};

export default MenuButton;
