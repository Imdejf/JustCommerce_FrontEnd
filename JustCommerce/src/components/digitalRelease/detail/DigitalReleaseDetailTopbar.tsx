import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { RootState } from "store/store";

import Button from "components/common/buttons/basicButton/Button";
import { ButtonVariant } from "components/common/buttons/buttonTypes";
import productServices from "services/productServices";
import { IDigitalRelease } from "types/digitalReleaseTypes";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { showServerErrors } from "utils/errorsUtils";

interface IDigitalReleaseDetailTopbarProps {
  // digitalRelease: IDigitalRelease;
}

const DigitalReleaseDetailTopbar: React.FC<IDigitalReleaseDetailTopbarProps> =
  () =>
    // { digitalRelease }
    {
      const { push } = useHistory();
      //TODO: const permissions = useSelector((state: RootState) => state.userPermissions?.DigitalReleases);
      const permissions = useSelector(
        (state: RootState) => state.userPermissions?.Artist
      );

      // if (!permissions) {
      //   return null;
      // }

      const handleEdit = (id: string) => {
        push(`/shop/products/edit/${id}`);
      };

      const { id } = useParams<{ id: string }>();

      const handleRemove = async (id: string) => {
        try {
          await productServices.removeProduct(id);
          toast.success("Usunięto produkt!");
          push("/shop/products");
        } catch (errors: any) {
          showServerErrors(errors);
        }
      };

      return (
        <div className="flex justify-end px-8 text-sm">
          <div className="flex gap-4">
            <Button
              // onClick={handleEdit}
              // disabled={!permissions.Edit}
              variant={ButtonVariant.Remove}
              className="flex-1 md:flex-grow-0 py-8 px-18"
              onClick={() => handleRemove(id)}
            >
              Usuń
            </Button>
            <Button
              onClick={() => handleEdit(id)}
              // disabled={!permissions.Edit}
              variant={ButtonVariant.Submit}
              className="flex-1 md:flex-grow-0 py-8 px-18"
            >
              Edytuj
            </Button>
          </div>
        </div>
      );
    };

export default DigitalReleaseDetailTopbar;
