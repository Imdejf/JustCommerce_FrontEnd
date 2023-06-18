import { useEffect } from "react";

interface Props {
  onChange: (value: string) => void;
  value: string | number;
  isPercent: boolean;
}

const GroupInput = ({ isPercent, value, onChange }: Props) => {
  useEffect(() => {
    if (isPercent && parseInt(`${value}`) > 100) {
      onChange("100");
    }

    if (isPercent && parseInt(`${value}`) < 0) {
      onChange("0");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPercent, value]);

  return (
    <input
      className="border border-gray border-opacity-30  p-2 px-8 text-left"
      type="number"
      max={isPercent ? 100 : Number.MAX_SAFE_INTEGER}
      min={0}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default GroupInput;
