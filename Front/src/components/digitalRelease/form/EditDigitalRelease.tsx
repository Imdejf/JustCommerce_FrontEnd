import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import ContentContainer from "components/layout/ContentContainer";

import digitalReleasesService from "services/digitalReleaseService";
import {
  IDigitalRelease,
  Product,
  IAddProduct,
  DigitalReleaseRequest,
} from "types/digitalReleaseTypes";
import { getNotEmptyFields } from "utils/objectUtils";
import { showServerErrors } from "utils/errorsUtils";
import productServices from "services/productServices";
import DigitalReleaseForm from "./DigitalReleaseForm";
import { useTranslation } from "react-i18next";
import EditDigitalReleaseForm from "./EditDigitalReleaseForm";

const EditDigitalRelease: React.FC = () => {
  const [product, setProduct] = useState<IAddProduct | null>(null);
  const { goBack } = useHistory();
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const handleSubmit = async (
    digitalReleaseData: IAddProduct,
    type: number,
    availableFrom: string,
    availableTo: string,
    base64: string,
    categoryId: string,
    UpdateCategory: boolean,
    removedFileId?: string,
  ) => {
    try {
      const newProduct = digitalReleaseData;
      await productServices.editProduct(
        newProduct,
        type,
        availableFrom,
        availableTo,
        base64,
        categoryId,
        UpdateCategory,
        removedFileId,
      );
      toast.success("Edytowano produkt!");
      goBack();
    } catch (errors: any) {
      showServerErrors(errors);
    }
  };

  useEffect(() => {
    productServices
      .getProduct(id)
      .then((productData) => {
        if (productData) {
          // @ts-ignore
          setProduct(productData);
        }
      })
      .catch((errors) => {
        showServerErrors(errors);
      });
  }, [id]);

  return (
    product && (
      <ContentContainer
        title={t("digitalRelease.title.edit")}
        path={`/shop/products/detail/${id}`}
      >
        <EditDigitalReleaseForm
          product={product}
          onSubmit={handleSubmit}
          isEdit={true}
        />
      </ContentContainer>
    )
  );
};

export default EditDigitalRelease;
