import { useHistory } from "react-router";

import Button from "../../common/buttons/basicButton/Button";

import { ButtonVariant } from "../../common/buttons/buttonTypes";

const FilesTopBar: React.FC = () => {
  const { push } = useHistory();

  const handleAddFile = () => {
    push("/files/add");
  };

  return (
    <div className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2 ">
      <Button
        onClick={handleAddFile}
        className="px-24 xl:order-2"
        variant={ButtonVariant.Submit}
      >
        Dodaj plik
      </Button>
    </div>
  );
};

export default FilesTopBar;
