import { FormikHelpers, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";

import ImageInput from "components/common/inputs/imageInput/ImageInput";
import DropdownPanel from "components/common/panels/DropdownPanel";

import { addPressPack, editPressPack } from "store/actions/artistActions";
import { IPresspack, PresspackPhotosFormData } from "types/artistTypes";

const RecommendedPanel = () => {
  const permissions = useSelector(
    (state: RootState) => state.userPermissions?.Artist
  );
  const { presspack }: { presspack: IPresspack | undefined } = useSelector(
    (state: RootState) => state.artist
  );

  const dispatch = useDispatch();

  const handleSubmitPhoto = async (
    { added, removed, photos }: PresspackPhotosFormData,
    { resetForm }: FormikHelpers<PresspackPhotosFormData>
  ) => {
    if (!presspack?.presspackId) {
      await dispatch(addPressPack({ photos }));
    } else {
      await dispatch(editPressPack({ added, removed }));
    }
    resetForm();
  };

  const photoForm = useFormik<PresspackPhotosFormData>({
    initialValues: {
      photos: presspack?.photos?.map((p) => p.ftpPhototFile) || [],
      removed: [],
      added: [],
    },
    onSubmit: handleSubmitPhoto,
    enableReinitialize: true,
  });

  if (!presspack) {
    return null;
  }

  return (
    <DropdownPanel
      label="Rekomendowany"
      //   initialExpanded
      canAdd={false}
      editable
      //   hasChanged={photoForm.dirty}
      onSubmit={photoForm.handleSubmit}
      //   canSave={
      //     presspack.presspackId
      //       ? !!permissions?.UpdatePresspack.checked
      //       : !!permissions?.CreatePresspack.checked
      //   }
    >
      <div className="py-30 px-18 gap-8 flex flex-wrap justify-center xl:justify-start ">
        <p>Dla nowych użytkowników. [X]</p>
      </div>
      {/* <div className="py-30 px-18 gap-8 flex flex-wrap justify-center xl:justify-start ">
        {Array.from({ length: photoForm.values.photos.length + 1 }).map(
          (_, idx) => (
            <ImageInput
              key={`photos${idx}`}
              disabled={
                !!presspack.presspackId && !permissions?.UpdatePresspack.checked
              }
              onChange={(e) => {
                const { value } = e.target;

                photoForm.setFieldValue(`photos[${idx}]`, value.base64String);
                photoForm.setFieldValue(`added[${idx}]`, value.base64String);

                if (presspack.photos && presspack.photos[idx]) {
                  photoForm.setFieldValue(
                    `removed[${idx}]`,
                    presspack.photos[idx].id
                  );
                }
              }}
              name={`photos[${idx}]`}
              imgSrc={photoForm?.values.photos[idx] || ""}
              withRemoveIcon
            />
          )
        )}
      </div> */}
    </DropdownPanel>
  );
};

export default RecommendedPanel;
