import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import ContentContainer from "components/layout/ContentContainer";
import DigitalReleaseForm from "./DigitalReleaseForm";

import digitalReleasesService from "services/digitalReleaseService";
import {
  IDigitalRelease,
  DigitalReleaseRequest,
  ProductType,
  MusicProductStatus,
  IAddProduct,
} from "types/digitalReleaseTypes";
import { getNotEmptyFields } from "utils/objectUtils";
import { showServerErrors } from "utils/errorsUtils";
import productServices from "services/productServices";

const AddDigitalRelease: React.FC = () => {
  const { t } = useTranslation();
  const { goBack } = useHistory();
  const newProduct: IAddProduct = {
    Name: "",
    Description: "Test",
    ShortDescription: "",
    EAN: "",
    CategoryId: "08da6667-cc3e-4694-8521-4bd3f16474e3",
    AvailableFrom: "",
    AvailableTo: "",
    Netto: "",
    Tax: 0,
    File: {
      Base64String:
        "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",
    },
    Status: 1,
    Tag: "",
    SellerId: "08daa950-b1f2-46b8-880d-71a5576e9f62",
  };

  const handleSubmit = async (
    digitalReleaseData: IAddProduct,
    type: number,
    availableFrom: string,
    availableTo: string,
    base64: string,
    categoryId: string,
  ) => {
    try {
      const newProduct = digitalReleaseData;
      await productServices.addProduct(
        newProduct,
        type,
        availableFrom,
        availableTo,
        base64,
        categoryId,
      );
      toast.success(t("digitalRelease.toast.added"));
      goBack();
    } catch (errors: any) {
      showServerErrors(errors);
    }
  };

  return (
    <ContentContainer
      title={t("digitalRelease.title.add")}
      path="/shop/products"
    >
      <DigitalReleaseForm
        product={newProduct}
        // @ts-ignore
        onSubmit={handleSubmit}
        isEdit={false}
      />
    </ContentContainer>
  );
};

export default AddDigitalRelease;
