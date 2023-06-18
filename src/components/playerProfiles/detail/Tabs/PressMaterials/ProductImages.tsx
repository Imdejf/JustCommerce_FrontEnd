import { useState, useEffect } from "react";
import { FormikHelpers, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";

import ImageInput from "components/common/inputs/imageInput/ImageInput";
import DropdownPanel from "components/common/panels/DropdownPanel";
import ProductImageInput from "components/common/inputs/imageInput/ProductImageInput";

import { addPressPack, editPressPack } from "store/actions/artistActions";
import { IPresspack, PresspackPhotosFormData } from "types/artistTypes";
import productServices from "services/productServices";
import { toast } from "react-toastify";
import { showServerErrors } from "utils/errorsUtils";

interface Props {
  product: any;
  refreshProduct: () => void;
}

const ProductImages: React.FC<Props> = ({ product, refreshProduct }) => {
  const permissions = useSelector(
    (state: RootState) => state.userPermissions?.Artist,
  );
  const { presspack }: { presspack: IPresspack | undefined } = useSelector(
    (state: RootState) => state.artist,
  );

  const dispatch = useDispatch();
  const [addedImages, setAddedImages] = useState("");
  const [removedImages, setRemovedImages] = useState("");
  const [base64, setBase64] = useState("");

  const handleSubmit = async () => {
    if (addedImages) {
      try {
        // @ts-ignore
        await productServices.addProductFiles(product.ProductId, base64);
        refreshProduct();
        toast.success("Dodano zdjęcie!");
      } catch (errors: any) {
        showServerErrors(errors);
      }
    }
  };

  useEffect(() => {
    handleSubmit();
  }, [addedImages]);

  const removeImage = async () => {
    if (removedImages) {
      try {
        // @ts-ignore
        await productServices.removeProductFiles(
          product.ProductId,
          removedImages,
        );
        refreshProduct();
        toast.success("Usunięto zdjęcie!");
      } catch (errors: any) {
        showServerErrors(errors);
      }
    }
  };

  useEffect(() => {
    removeImage();
  }, [removedImages]);

  const handleSubmitPhoto = async (
    { added, removed, photos }: PresspackPhotosFormData,
    { resetForm }: FormikHelpers<PresspackPhotosFormData>,
  ) => {
    if (!presspack?.presspackId) {
      await dispatch(addPressPack({ photos }));
    } else {
      await dispatch(editPressPack({ added, removed }));
    }
    resetForm();
  };

  const photoForm = useFormik<{ photos: any; removed: any; added: any }>({
    initialValues: {
      // @ts-ignore
      photos: product?.ProductFiles?.map((p) => p) || [],
      removed: [],
      added: [],
    },
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  if (!presspack) {
    return null;
  }

  return (
    <DropdownPanel
      label="Grafiki"
      // initialExpanded
      hasChanged={photoForm.dirty}
      onSubmit={photoForm.handleSubmit}
      canSave={
        presspack.presspackId
          ? !!permissions?.UpdatePresspack.checked
          : !!permissions?.CreatePresspack.checked
      }
    >
      <div className="py-30 px-18 gap-8 flex flex-wrap justify-center xl:justify-start ">
        {product.ProductFiles.map((p: any, idx: number) => {
          return (
            <ImageInput
              key={photoForm?.values.photos[idx]?.ProductFileId}
              disabled={true}
              onChange={(e) => {
                const { value } = e.target;

                // photoForm.setFieldValue(`photos[${idx}]`, value.base64String);

                // setAddedImages(value.base64String);
                setRemovedImages(photoForm?.values.photos[idx]?.ProductFileId);
                // if (presspack.photos && presspack.photos[idx]) {
                //   photoForm.setFieldValue(
                //     `removed[${idx}]`,
                //     presspack.photos[idx].id
                //   );
                // }
              }}
              name={photoForm?.values.photos[idx]?.ProductFileId}
              imgSrc={photoForm?.values.photos[idx]?.FtpPhotoFilePath || ""}
              withRemoveIcon={product.ProductFiles.length > 1 ? true : false}
              // @ts-ignore
              setBase64={setBase64}
            />
          );
        })}

        <ProductImageInput
          key={""}
          disabled={false}
          onChange={(e) => {
            const { value } = e.target;

            // photoForm.setFieldValue(`photos[${idx}]`, value.base64String);

            setAddedImages(value.base64String);
            // setRemovedImages(photoForm?.values.photos[idx]?.ProductFileId);
            // if (presspack.photos && presspack.photos[idx]) {
            //   photoForm.setFieldValue(
            //     `removed[${idx}]`,
            //     presspack.photos[idx].id
            //   );
            // }
          }}
          name={""}
          imgSrc={""}
          withRemoveIcon={false}
          // @ts-ignore
          setBase64={setBase64}
        />
      </div>
    </DropdownPanel>
  );
};

export default ProductImages;
