import DropdownPanel from "../../common/panels/DropdownPanel";

interface IPermissionSectionProps {
  label: string;
}

const PermissionSection: React.FC<IPermissionSectionProps> = ({
  label,
  children,
}) => {
  return (
    <DropdownPanel label={label}>
      <div
        className="grid gap-x-16 gap-y-4 py-12 px-24 md:px-36 text-sm"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          width: "100%",
        }}
      >
        {children}
      </div>
    </DropdownPanel>
  );
};

export default PermissionSection;
