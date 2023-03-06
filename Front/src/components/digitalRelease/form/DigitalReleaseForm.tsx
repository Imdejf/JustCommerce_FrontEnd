import { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { RootState } from "store/store";
import { useTranslation } from "react-i18next";

import DeleteButton from "components/common/buttons/deleteButton/DeleteButton";
import FormSection from "components/common/forms/FormSection";
import SelectInput from "components/common/inputs/select/Select";
import SubmitButton from "components/common/buttons/submitButton/SubmitButton";
import TextField from "components/common/inputs/textInput/TextField";

import {
  IDigitalRelease,
  IAddProduct,
  DigitalReleaseRequest,
} from "types/digitalReleaseTypes";

import digitalReleasesService from "services/digitalReleaseService";
import { showServerErrors } from "utils/errorsUtils";
import {
  digitalReleaseValidation,
  formatDataToRequest,
  getStatusOptions,
  getTypeOptions,
  getVatOptions,
} from "components/digitalRelease/utils/helpers";
import Datepicker from "components/common/inputs/Datepicker/DatepickerInput";
import FileField from "components/common/inputs/FileInput/FileField";
import Switch from "components/common/inputs/switch/Switch";
import ArtistPropList from "components/artists/propList/ArtistPropList";
import ImageField from "components/common/inputs/imageInput/ImageField";
import ProviderSelect from "./ProvidersSelect";
import Select from "./Select";
import SelectProductType from "../../common/inputs/select/SelectProductType";
import { ISelectOption } from "components/common/inputs/inputTypes";
import productServices from "services/productServices";
import TextInput from "components/common/inputs/textInput/TextInput";

interface IEditDigitalReleaseProps {
  product: IAddProduct;
  isEdit: boolean;
  onSubmit: any;
}

const statusOptions = getStatusOptions();
const typeOptions = getTypeOptions();
const vatOptions = getVatOptions();

const DigitalReleaseForm: React.FC<IEditDigitalReleaseProps> = ({
  product,
  isEdit,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const permissions = useSelector((state: RootState) => state.userPermissions);
  const { replace } = useHistory();
  const [selectedType, setSelectedType] = useState<ISelectOption | null>(null);
  const [selectedVat, setSelectedVat] = useState<ISelectOption | null>(null);
  const [availableFrom, setAvailableFrom] = useState();
  const [availableTo, setAvailableTo] = useState();
  const [base64, setBase64] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [gross, setGross] = useState(0);
  // if (!permissions) {
  //   return null;
  // }

  const handleSubmit = async (values: any) => {
    if (!base64) return toast.error("Dodaj zdjęcie!");
    // if (!selectedVat) return toast.error("Wybierz Vat!");
    if (!selectedType) return toast.error("Wybierz typ produktu!");
    if (!selectedCategory) return toast.error("Wybierz kategorie!");

    await onSubmit(
      values,
      selectedType?.value,
      availableFrom,
      availableTo,
      base64,
      // @ts-ignore
      selectedCategory.value,
    );
  };

  const getCategoriesByProductType = async (type: number) => {
    try {
      const resp = await productServices.getCategoriesByProductType(type);
      //@ts-ignore
      const categoriesArray = [];

      //@ts-ignore
      resp.items.map((single) => {
        return categoriesArray.push({
          value: single.CategoryId,
          label: single.Name,
        });
      });

      //@ts-ignore
      setCategories(categoriesArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedType) {
      getCategoriesByProductType(selectedType.value);
    }
  }, [selectedType]);

  return (
    <Formik
      initialValues={product}
      validationSchema={digitalReleaseValidation}
      onSubmit={handleSubmit}
      validateOnMount
    >
      {({ errors, isSubmitting, values, initialValues, setFieldValue }) => (
        <Form className="flex flex-col gap-x-6 mx-auto  px-24 lg:px-36 pb-36 xl:gap-x-10 bg-white-dirty bg-opacity-70 border-t border-gray border-opacity-40 pt-30">
          <FormSection
            isDisabled={isSubmitting}
            label={t("digitalRelease.coverFile")}
          >
            <ImageField
              name="image"
              className="mx-auto md:mx-0 mb-8"
              //  @ts-ignore
              imgSrc={values.image}
              // @ts-ignore
              base64={base64}
              setBase64={setBase64}
            />
          </FormSection>

          <FormSection isDisabled={isSubmitting} label={t("labels.basicData")}>
            <SelectProductType
              name="Type"
              items={typeOptions}
              label="Typ produktu"
              // @ts-ignore
              selectedItem={selectedType}
              setSelectedItem={setSelectedType}
              // defaultValue={{ value: 1, label: "Produkt" }}
            />

            <TextField name="Name" label={"Nazwa"} helperText={errors.Name} />
            <TextField
              name="ShortDescription"
              label={"Nazwa 2 linia"}
              helperText={errors.ShortDescription}
            />

            <TextField name="EAN" label={"EAN"} helperText={errors.EAN} />
            {categories.length > 0 && (
              <SelectProductType
                name="CategoryId"
                items={categories}
                label="Kategoria"
                // @ts-ignore
                selectedItem={selectedCategory}
                setSelectedItem={setSelectedCategory}
              />
            )}
          </FormSection>

          <FormSection isDisabled={isSubmitting} label={"Dostępność produktu"}>
            {/* <Datepicker
              name="AvailableFrom"
              label={"Od data"}
              date={availableFrom}
              setDate={setAvailableFrom}
              // helperText={errors.AvailableFrom}
            />
            <Datepicker
              name="AvailableTo"
              label={"Do data"}
              date={availableTo}
              setDate={setAvailableTo}
              // helperText={errors.AvailableTo}
            /> */}

            <TextInput
              name="AvailableFrom"
              label={"Od data"}
              type="date"
              value={availableFrom}
              onChange={(e) => setAvailableFrom(e.target.value)}
            />
            <TextInput
              name="AvailableTo"
              label={"Do data"}
              type="date"
              value={availableTo}
              onChange={(e) => setAvailableTo(e.target.value)}
            />

            {/* <TextField
              name="Netto"
              label={"Cena netto"}
              helperText={errors.Netto}
            />

            <SelectProductType
              name="Tax"
              items={vatOptions}
              label="Vat"
              // @ts-ignore
              selectedItem={selectedVat}
              setSelectedItem={setSelectedVat}
              // defaultValue={{ value: 1, label: "Produkt" }}
            /> */}

            {/* <div
              style={{
                width: "240px",
                height: "40px",
                background: "#fafafa",
                border: "1px solid #d4d4d6",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "14px",
                padding: "0 20px",
                fontSize: "13px",
              }}
            >
              <p>Brutto</p>
              <p>
                {values.Netto && selectedVat?.value
                  ? new Intl.NumberFormat("de-DE").format(
                      (+values.Netto * +selectedVat?.value) / 100 +
                        +values.Netto,
                    )
                  : // @ts-ignore
                    +values.Netto}
              </p>
            </div> */}

            {/* <p>
              {values.Netto && selectedVat?.value
                ? (
                    (+values.Netto * +selectedVat?.value) / 100 +
                    +values.Netto
                  ).toFixed(2)
                : // @ts-ignore
                  +values.Netto}
            </p> */}
          </FormSection>

          <FormSection isDisabled={isSubmitting} label={"Tag."}>
            <TextField name="Tag" label={"Tag"} helperText={errors.Tag} />
          </FormSection>

          <div className="flex gap-x-2">
            <SubmitButton isSubmitting={isSubmitting} className="mt-6 ">
              Zapisz
            </SubmitButton>

            {/* TODO: <DeleteButton isSubmitting={isSubmitting} disabled={!permissions.IDigitalRelease.Delete} onClick={handleDelete}> */}
            {/* {isEdit && (
              <DeleteButton isSubmitting={isSubmitting} disabled={!permissions.Artist.Delete} onClick={handleDelete}>
                Usuń
              </DeleteButton>
            )} */}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default DigitalReleaseForm;
