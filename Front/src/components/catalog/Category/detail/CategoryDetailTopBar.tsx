import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

import Button from "../../../common/buttons/basicButton/Button";

import { showServerErrors } from "../../../../utils/errorsUtils";
import { ButtonVariant } from "../../../common/buttons/buttonTypes";
import { useParams } from "react-router";
import attributeServices from "services/Attribute/attributeServices";
import { CategoryInterface } from "types/Category/categoryTypes";

interface IAttributeTopBarProps {
    category: CategoryInterface
} 

const CategoryDetailTopBar: React.FC<IAttributeTopBarProps> = ({
    category,
}) => {
    const { id } = useParams<{ id: string }>();
    const { push } = useHistory();
    const handleRemove = async () => {
        try {
          await attributeServices.remove(id);
          toast.success("Usunięto kategorie!");
          push("/catalog/category");
        } catch (errors: any) {
          showServerErrors(errors);
        }
      };

      const handleEdit = () => {
        push(`/catalog/category/edit/${id}`);
      };

    return (
        <div className="flex justify-between px-8 text-sm">
            <div className="flex gap-4">
            <Button
            className="flex-1 md:flex-grow-0 py-8 px-18"
            // disabled={!permissions.Auth.SetUserActiveOrDeactive.checked}
            onClick={handleRemove}
            variant={ButtonVariant.Remove}
            >
                Usuń
            </Button>
            <Button
            onClick={handleEdit}
            // disabled={!permissions.Auth.EditUser.checked}
            variant={ButtonVariant.Submit}
            className="flex-1 md:flex-grow-0 py-8 px-18"
            >
                Edytuj
            </Button>
            </div>
        </div>
    )
}

export default CategoryDetailTopBar;