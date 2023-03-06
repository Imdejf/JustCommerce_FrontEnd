import { FormikHelpers, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";

import TextArea from "components/common/inputs/textArea/TextArea";
import DropdownPanel, { Modes } from "components/common/panels/DropdownPanel";
import { toast } from "react-toastify";
import { addBiography, editBiography } from "store/actions/artistActions";
import productServices from "services/productServices";
import { useHistory, useParams } from "react-router-dom";
import { showServerErrors } from "utils/errorsUtils";

interface Props {
  order: any;
}

const ProductDescription: React.FC<Props> = ({ order }) => {
  const presspack = useSelector((state: RootState) => state.artist.presspack);
  const permissions = useSelector(
    (state: RootState) => state.userPermissions?.Artist,
  );
  const { id } = useParams<{ id: string }>();
  const { push } = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (
      formik.values.biography.length < 5 ||
      formik.values.biography.length > 100
    )
      return toast.error("Opis musi mieć od 5 do 100 znaków!");

    try {
      await productServices.updateDescription(id, formik.values.biography);
      toast.success("Zmieniono opis produktu!");
      push("/shop/products/");
    } catch (errors: any) {
      showServerErrors(errors);
    }
  };

  const formik = useFormik({
    initialValues: { biography: order.Description || "" },
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <DropdownPanel
      canAdd={false}
      canEdit={false}
      initialExpanded={true}
      label="Komentarz do zamówienia"
      editable
      // initialExpanded
      onSubmit={formik.handleSubmit}
      onClear={() => {
        formik.setFieldValue("biography", "");
      }}
      render={({ mode }) =>
        mode === Modes.View ? (
          <p
            className="text-sm opacity-70 py-24 px-36"
            style={{
              overflowWrap: "break-word",
            }}
          >
            {order.Description}
          </p>
        ) : (
          <div className="p-12">
            <TextArea
              autoFocus
              label=""
              name="biography"
              value={formik.values.biography}
              onChange={formik.handleChange}
            />
          </div>
        )
      }
    />
  );
};

export default ProductDescription;
