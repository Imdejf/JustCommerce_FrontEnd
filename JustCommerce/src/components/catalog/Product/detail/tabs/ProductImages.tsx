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

  const dispatch = useDispatch();
  const [addedImages, setAddedImages] = useState("");
  const [removedImages, setRemovedImages] = useState("");
  const [removedImageFtp, setRemovedImageFtp] = useState("");
  const [base64, setBase64] = useState("");

  return (
    <DropdownPanel
      label="Grafiki"
    >
      <div className="py-30 px-18 gap-8 w-full flex flex-wrap justify-center xl:justify-start ">
        {/* {product.productImages.map((picture: any) => {
          <a>{picture}</a>
        })} */}
        {product?.productImages?.map((picture: any) => {
          return (
              <ImageInput
                disabled={true}
                name={picture.id}
                imgSrc={picture.mediaUrl}
                // @ts-ignore
              />
          );
        })}
      </div>
    </DropdownPanel>
  );
};

export default ProductImages;
