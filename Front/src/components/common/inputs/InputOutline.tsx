interface IInputOutlineProps {
  label?: string;
  name: string;
}

const InputOutline: React.FC<IInputOutlineProps> = ({ label, name }) => {
  return (
    <div className='formControl__outline'>
      <div className='formControl__outline--item1'></div>
      {label && (
        <div className='formControl__outline--item2'>
          <label data-testid='fieldLabelInline' htmlFor={name}>
            {label}
          </label>
        </div>
      )}{' '}
      <div className='formControl__outline--item3'></div>
    </div>
  );
};

export default InputOutline;
