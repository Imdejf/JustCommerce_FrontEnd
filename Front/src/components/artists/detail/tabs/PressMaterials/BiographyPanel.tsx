import { FormikHelpers, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";

import TextArea from "components/common/inputs/textArea/TextArea";
import DropdownPanel, { Modes } from "components/common/panels/DropdownPanel";

import { addBiography, editBiography } from "store/actions/artistActions";

const BiographyPanel = () => {
  const presspack = useSelector((state: RootState) => state.artist.presspack);
  const permissions = useSelector(
    (state: RootState) => state.userPermissions?.Artist
  );

  const dispatch = useDispatch();

  const handleSubmit = async (
    values: { biography: string },
    { resetForm }: FormikHelpers<{ biography: string }>
  ) => {
    if (!presspack?.presspackId) {
      await dispatch(addBiography(values));
    } else {
      await dispatch(editBiography(values));
    }
    resetForm();
  };

  const formik = useFormik({
    initialValues: { biography: presspack?.biography || "" },
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <DropdownPanel
      canAdd={!presspack?.biography && permissions?.CreatePresspack.checked}
      canEdit={!!presspack?.biography && permissions?.UpdatePresspack.checked}
      label="Notka biograficzna"
      editable
      initialExpanded
      onSubmit={formik.handleSubmit}
      onClear={() => {
        formik.setFieldValue("biography", "");
      }}
      render={({ mode }) =>
        mode === Modes.View ? (
          <p className="text-sm opacity-70 py-24 px-36">
            {presspack?.biography}
          </p>
        ) : (
          <div className="p-12">
            <TextArea
              autoFocus
              label="Biografia"
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

export default BiographyPanel;
