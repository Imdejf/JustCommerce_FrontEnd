import { ChangeEvent, useEffect, useRef } from "react";

import { ReactComponent as Magnifier } from "../../../../assets/icons/magnifier.svg";

interface ISelectSearchInputProps {
  isActive: boolean;
  onQueryChange: (value: string) => void;
}

const SelectSearchInput: React.FC<ISelectSearchInputProps> = ({
  isActive,
  onQueryChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(e.target.value);
  };

  useEffect(() => {
    if (isActive && inputRef?.current) {
      inputRef.current.select();
    }
  }, [isActive]);

  return (
    <div className="">
      <div className="sticky flex items-center gap-x-4 px-18 py-8 text-xs m-2 rounded border border-opacity-50 border-gray-light focus-within:border-blue-light">
        <input
          name="searchSelect"
          onChange={handleChange}
          type="text"
          className="text-left  "
          ref={inputRef}
          autoComplete="off"
        />
        <Magnifier />
      </div>
    </div>
  );
};

export default SelectSearchInput;
