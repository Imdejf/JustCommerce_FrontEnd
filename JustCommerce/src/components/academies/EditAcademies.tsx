import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import ContentContainer from "../layout/ContentContainer";
import FormSection from "../common/forms/FormSection";
import MaskedField from "../common/inputs/maskedInput/MaskedField";
import SubmitButton from "../common/buttons/submitButton/SubmitButton";
import TextField from "../common/inputs/textInput/TextField";

import {
  AcademyInterface,
  PlayerProfileDetailInterface,
} from "../../types/userTypes";

import { Mask } from "../../utils/constants/constants";
import { showServerErrors } from "../../utils/errorsUtils";
import playerProfileServices from "services/playerProfileServices";
import SelectProfiles from "components/common/inputs/select/SelectProfiles";
import ImageField from "components/common/inputs/imageInput/ImageField";
import ProfileDatePicker from "components/common/inputs/Datepicker/ProfileDatePicker";
import { editPlayerProfileValidationSchema } from "./form/authHelpers";
import TextInput from "components/common/inputs/textInput/TextInput";
import academiesServices from "services/academiesServices";

const EditAcademies: React.FC = () => {
  const [playerProfile, setPlayerProfile] =
    useState<AcademyInterface | null>(null);

  const [type, setType] =
    useState<{ value: number; label: string } | null>(null);
  const [types, setTypes] = useState<{ value: number; label: string }[]>([]);
  const [base64, setBase64] = useState("");
  const [date, setDate] = useState("");
  const { id } = useParams<{ id: string }>();
  const { goBack } = useHistory();

  const [country, setCountry] =
    useState<{ value: number; label: string } | null>(null);

  const [countries, setCountries] = useState<
    { value: number; label: string }[]
  >([]);

  const typeSwitch = (type: number) => {
    switch (type) {
      case 0:
        return { value: 0, label: "akademia" };

      case 1:
        return { value: 1, label: "klub" };

      case 2:
        return { value: 2, label: "reprezentacja" };

      default:
        return { value: type, label: "Inny" };
    }
  };

  useEffect(() => {
    academiesServices
      .getSingleAcademy(id)
      .then((playerProfileData) => {
        setPlayerProfile(playerProfileData);
      })
      .catch((errors) => {
        showServerErrors(errors);
      });
  }, [id]);

  const getAllCountries = async () => {
    try {
      const resp = await playerProfileServices.getAllCountries();

      const countriesArray: any = [];

      const convertedObiect = Object.values(resp);

      convertedObiect.map((country, index) => {
        return countriesArray.push({
          label: `${country.FullName}`,
          value: country.FlagValue,
        });
      });

      //@ts-ignore
      setCountries(countriesArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  useEffect(() => {
    if (playerProfile) {
      setType(typeSwitch(playerProfile.Type));
    }
  }, [playerProfile]);

  const getAllTypes = async () => {
    try {
      setTypes([
        {
          label: "Akademia",
          value: 0,
        },
        {
          label: "Klub",
          value: 1,
        },
        {
          label: "Reprezentacja",
          value: 2,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTypes();
  }, []);

  if (!playerProfile) {
    return null;
  }

  const initValues = {
    IsVerified: true,
    Email: playerProfile.Email,
    PhoneNumber: playerProfile.PhoneNumber,
    Name: playerProfile.Name,
    NIP: playerProfile.NIP,
    City: playerProfile.City,
    Region: playerProfile.Region,
    PostCode: playerProfile.PostCode,
    Street: playerProfile.Street,
    BuildingNumber: playerProfile.BuildingNumber,
    FlatNumber: playerProfile.FlatNumber,
  };

  const handleSubmit = async (values: typeof initValues) => {
    try {
      const editedUser = {
        AcademyId: id,
        RemoveCurrentPhoto: base64 ? true : false,
        Type: type?.value,
        Country: country?.value,
        ...values,
      };
      //@ts-ignore
      await academiesServices.editAcademy(editedUser);
      toast.success(`Edytowano akademie!`);
      goBack();
    } catch (errors: any) {
      showServerErrors(errors);
    }
  };

  return (
    <ContentContainer title="Edycja akademii" path={`/academies/detail/${id}`}>
      <Formik
        initialValues={initValues}
        onSubmit={handleSubmit}
        validationSchema={editPlayerProfileValidationSchema}
      >
        {({ values, isSubmitting }) => (
          <Form className="flex flex-col gap-x-6 mx-auto  px-24 lg:px-36 pb-36 xl:gap-x-10 bg-white-dirty bg-opacity-70 border-t border-gray border-opacity-40 pt-30">
            <FormSection isDisabled={isSubmitting} label={"Zdjęcie"}>
              <ImageField
                name="PhotoFile"
                className="mx-auto md:mx-0 mb-8"
                //  @ts-ignore
                imgSrc={playerProfile.FtpFilePath}
                // @ts-ignore
                base64={base64}
                setBase64={setBase64}
              />
            </FormSection>

            <FormSection isDisabled={isSubmitting} label="Podstawowe">
              <TextField name="Name" label="Nazwa" />

              <SelectProfiles
                name="Type"
                items={types}
                label="Typ"
                selectedItem={type}
                setSelectedItem={setType}
                // defaultValue={values.profile}
              />

              <TextField name="NIP" label="NIP" />
              <TextField name="Email" label="Adres e-mail" />
              <MaskedField
                mask={Mask.Phone}
                name="PhoneNumber"
                label="Numer telefonu"
              />
            </FormSection>

            <FormSection isDisabled={isSubmitting} label="Adres">
              <SelectProfiles
                name="Country"
                items={countries}
                label="Kraj"
                selectedItem={country}
                setSelectedItem={setCountry}
                defaultValue={
                  countries ? countries[playerProfile.Country]?.value - 1 : ""
                }
              />
              {/* <TextField name="Country" label="Kraj" /> */}
              <TextField name="City" label="Miasto" />
              <TextField name="Region" label="Województwo" />
              <TextField name="PostCode" label="Kod pocztowy" />
              <TextField name="Street" label="Ulica" />
              <TextField name="BuildingNumber" label="Numer budynku" />
              <TextField name="FlatNumber" label="Numer mieszkania" />
            </FormSection>

            <SubmitButton
              isSubmitting={isSubmitting}
              type="submit"
              className="w-80"
            >
              Zapisz
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </ContentContainer>
  );
};

export default EditAcademies;
