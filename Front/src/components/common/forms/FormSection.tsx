interface IFormSectionProps {
  isDisabled: boolean;
  label?: string;
  sublabel?: string;
}

const FormSection: React.FC<IFormSectionProps> = ({
  children,
  label,
  isDisabled,
  sublabel,
}) => {
  return (
    <>
      {label && (
        <div className="text-sm font-medium opacity-80 mt-4 mb-5 capitalize-first px-18">
          {label}
        </div>
      )}
      {sublabel && (
        <div className="text-xs opacity-70 mb-2 ml-1 capitalize-first">
          {sublabel}
        </div>
      )}
      <fieldset
        className="flex flex-1 flex-wrap gap-x-8 gap-y-2"
        disabled={isDisabled}
      >
        {children}
      </fieldset>
    </>
  );
};

export default FormSection;
