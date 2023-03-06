interface IDetailTableProps {
  label?: string;
  items: Array<{
    label: string;
    value: string;
  }>;
}

const DetailTable: React.FC<IDetailTableProps> = ({ label, items }) => {
  return (
    <div className="w-full text-sm">
      <div className="px-18 py-12 bg-white opacity-80 rounded-t-sm">
        <span className="opacity-70">{label}</span>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {items.map((item) => (
          <div className={`grid grid-cols-2 gap-1 my-1`}>
            <div className="bg-white bg-opacity-30 p-12 text-center">
              <span className="opacity-70">{item.label}</span>
            </div>

            <div className="bg-white bg-opacity-30 p-12 text-center">
              <span className="opacity-70">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailTable;
