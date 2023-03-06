interface IErrorBoxProps {
  errors: Array<string>;
}

const ErrorBox: React.FC<IErrorBoxProps> = ({ errors }) => {
  if (!errors.length || errors.length === 0) {
    return null;
  }

  return (
    <div className='border border-red border-dashed text-sm p-12 w-full bg-gray-ghost'>
      {errors.map((error) => (
        <div key={error} className='text-red'>
          {error}
        </div>
      ))}
    </div>
  );
};

export default ErrorBox;
