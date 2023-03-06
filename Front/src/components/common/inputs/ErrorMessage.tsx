interface IErrorMessageProps {
  message?: string;
  helperText?: string;
  show: boolean;
}

const ErrorMessage: React.FC<IErrorMessageProps> = ({ helperText, message, show }) => {
  return (
    <div className='text-xs font-light px-12 text-right leading-3 pt-2' style={{ minHeight: '1.6em' }}>
      {show ? <span className='text-red'>{message}</span> : <span className='opacity-30'>{helperText}</span>}
    </div>
  );
};

export default ErrorMessage;
