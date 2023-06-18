interface IActiveFilterProps {
  filter: { name: string; value: string; pl: any };
  removeFilter: () => void;
}

const ActiveFilter: React.FC<IActiveFilterProps> = ({
  filter,
  removeFilter,
}) => {
  return (
    <div className="bg-white p-8 shadow">
      <span>{filter.pl} </span>
      <span>
        <button onClick={removeFilter}>X</button>
      </span>
    </div>
  );
};

export default ActiveFilter;
