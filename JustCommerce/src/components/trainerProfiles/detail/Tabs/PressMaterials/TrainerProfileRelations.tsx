import { useHistory } from "react-router-dom";

interface IDetailTableProps {
  label?: string;
  items: Array<{
    Id: string;
    Name: string;
  }>;
}

const TrainerProfileRelations: React.FC<IDetailTableProps> = ({
  label,
  items,
}) => {
  const { push } = useHistory();

  const accessSwitch = (accessType: number) => {
    switch (accessType) {
      case 0:
        return "Administrator";

      case 1:
        return "Użytkownik";

      default:
        return accessType;
    }
  };

  return (
    <div className="w-full text-sm">
      <div className="px-18 py-12 bg-white opacity-80 rounded-t-sm">
        <span className="opacity-70">{label}</span>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {items.map((item) => {
          return (
            <div className={`grid grid-cols-2 gap-1 my-1`}>
              <div className="bg-white bg-opacity-30 p-12 text-center">
                <span
                  onClick={() => push(`/accounts/detail/${item.Id}`)}
                  className="opacity-70 cursor-pointer hover:text-blue"
                >
                  {item.Name}
                </span>
              </div>

              <div className="bg-white bg-opacity-30 p-12 text-center">
                <span className="opacity-70">-</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrainerProfileRelations;
