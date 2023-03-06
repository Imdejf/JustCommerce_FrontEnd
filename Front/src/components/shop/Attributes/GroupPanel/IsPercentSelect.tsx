interface Props {
  name: string;
  value: boolean;
  onChange: (value: { name: string; value: boolean }) => void;
}

const IsPercentSelect = ({ name, value, onChange }: Props) => {
  return (
    <select
      name={name}
      id={name}
      onChange={(e) => onChange({ name: e.target.name, value: e.target.value === 'true' })}
      value={`${value}`}
    >
      <option value='true'>%</option>
      <option value='false'>PLN</option>
    </select>
  );
};

export default IsPercentSelect;
