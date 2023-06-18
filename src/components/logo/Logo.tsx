import cs from 'classnames';

import LogoImg from '../../assets/images/logo.png';

interface ILogoProps {
  className?: string;
}

const Logo: React.FC<ILogoProps> = ({ className = '' }) => {
  const logoClasses = cs({
    [className]: className,
  });
  return (
    <div className={logoClasses}>
      <img className='h-full' src={LogoImg} alt='Logo' />
    </div>
  );
};

export default Logo;
