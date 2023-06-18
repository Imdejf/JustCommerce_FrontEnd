import cs from 'classnames';

export enum BagdeVariant {
  Normal,
  Success,
  Error,
  Info,
}

interface Props {
  className?: string;
  variant?: BagdeVariant;
}

const Badge: React.FC<Props> = ({ children, className = '', variant = BagdeVariant.Normal }) => {
  const classNames = cs(
    'flex flex-1 items-center justify-center rounded-full text-black text-sm opacity-90 border border-gray px-32 py-8',
    {
      'bg-transparent': variant === BagdeVariant.Normal,
      'bg-green-light': variant === BagdeVariant.Success,
      'bg-lightred': variant === BagdeVariant.Error,
      'bg-white text-opacity-80 border-opacity-20': variant === BagdeVariant.Info,
      [className]: className,
    }
  );
  return <div className={classNames}>{children}</div>;
};

export default Badge;
