import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import ContentContainer from "../../layout/ContentContainer";
import MaskedField from "../../common/inputs/maskedInput/MaskedField";
import SelectProfiles from "../../common/inputs/select/SelectProfiles";
import SubmitButton from "../../common/buttons/submitButton/SubmitButton";
import TextField from "../../common/inputs/textInput/TextField";

import { Countries, IRegisterDTO } from "../../../types/userTypes";
import { useProfiles } from "../../../hooks/useProfiles";
import {
  addPlayerProfileInitValues,
  addPlayerProfileValidationSchema,
} from "./authHelpers";
import { Mask } from "../../../utils/constants/constants";
import FormSection from "../../common/forms/FormSection";
import authService from "../../../services/authServices";
import permissionsServices from "services/permissionsServices";
import { getNotEmptyFields } from "../../../utils/objectUtils";
import { showServerErrors } from "../../../utils/errorsUtils";
import { useHistory } from "react-router-dom";
import { ISelectOption } from "components/common/inputs/inputTypes";
import ImageField from "components/common/inputs/imageInput/ImageField";
import playerProfileServices from "services/playerProfileServices";
import artistServices from "services/artistServices";
import ProfileDatePicker from "components/common/inputs/Datepicker/ProfileDatePicker";
import TextInput from "components/common/inputs/textInput/TextInput";

const AddPlayerProfile: React.FC = () => {
  const [base64, setBase64] = useState("");
  const [date, setDate] = useState();
  const [gender, setGender] =
    useState<{ value: number; label: string } | null>(null);
  const [selectedUser, setSelectedUser] =
    useState<{ value: number; label: string } | null>(null);
  const [users, setUsers] = useState<{ value: number; label: string }[]>([]);
  const [genders, setGenders] = useState<{ value: number; label: string }[]>(
    [],
  );
  const [country, setCountry] =
    useState<{ value: number; label: string } | null>(null);

  const [countries, setCountries] = useState<
    { value: number; label: string }[]
  >([]);

  const [target, setTarget] =
    useState<{ value: number; label: string } | null>(null);
  const [targets, setTargets] = useState<{ value: number; label: string }[]>(
    [],
  );

  const [dominantLeg, setDominantLeg] =
    useState<{ value: number; label: string } | null>(null);
  const [dominantLegs, setDominantLegs] = useState<
    { value: number; label: string }[]
  >([]);
  const [prefferedPosition, setPrefferedPosition] =
    useState<{ value: number; label: string } | null>(null);
  const [prefferedPositions, setPrefferedPositions] = useState<
    { value: number; label: string }[]
  >([]);

  const [checkbox, setCheckbox] = useState(false);

  const { goBack, push } = useHistory();

  const handleSubmit = async (values: IRegisterDTO) => {
    if (!base64) return toast.error("Wybierz zdjęcie!");
    if (!selectedUser) return toast.error("Wybierz użytkownika!");
    if (!date) return toast.error("Wybierz date urodzenia!");
    if (!gender) return toast.error("Wybierz płeć!");
    if (!country) return toast.error("Wybierz Kraj!");
    if (!target) return toast.error("Wybierz Cel!");
    if (!dominantLeg) return toast.error("Wybierz dominującą nogę!");
    if (!prefferedPosition) return toast.error("Wybierz preferowaną pozycję!");
    if (!checkbox) return toast.error("Musisz zaakceptować relugamin!");

    try {
      await playerProfileServices.addPlayerProfile(
        values,
        date,
        gender?.value,
        selectedUser?.value,
        country.value,
        target.value,
        dominantLeg.value,
        prefferedPosition.value,
      );
      toast.success("Dodano nowy profil zawodnika!");
      push("/player-profiles");
    } catch (errors: any) {
      showServerErrors(errors);
    }
  };

  const getAllGenders = async () => {
    try {
      setGenders([
        {
          label: "Mężczyzna",
          value: 0,
        },
        {
          label: "Kobieta",
          value: 1,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllGenders();
  }, []);

  const getAllTargets = async () => {
    try {
      setTargets([
        {
          label: "Amator",
          // @ts-ignore
          value: "71469a28-2936-11ed-bb1c-0242ac1b0002",
        },
        {
          label: "Profesjonalny",
          // @ts-ignore
          value: "7146a31f-2936-11ed-bb1c-0242ac1b0002",
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTargets();
  }, []);

  const getAllDominantLegs = async () => {
    try {
      setDominantLegs([
        {
          label: "Prawa",
          value: 1,
        },
        {
          label: "Lewa",
          value: 2,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllDominantLegs();
  }, []);

  const getAllPrefferedPositions = async () => {
    try {
      setPrefferedPositions([
        {
          label: "Bramkarz",
          value: 1,
        },
        {
          label: "Obrońca",
          value: 2,
        },
        {
          label: "Pomocnik",
          value: 3,
        },
        {
          label: "Napastnik",
          value: 4,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPrefferedPositions();
  }, []);

  const getAllUsers = async () => {
    try {
      const resp = await artistServices.getAll({
        pageNumber: 1,
        pageSize: 50,
        searchString: "",
      });

      //@ts-ignore
      const profilesArray = [];
      //@ts-ignore
      const convertedObiect = Object.values(resp.Items);

      convertedObiect.map((single, index) => {
        return profilesArray.push({

        });
      });

      //@ts-ignore
      setUsers(profilesArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

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

  const handleChange = () => {
    setCheckbox((prev) => !prev);
  };

  return (
    <ContentContainer title="Dodaj profil zawodnika" path="/player-profiles">
      <Formik
        // @ts-ignore
        initialValues={addPlayerProfileInitValues}
        onSubmit={handleSubmit}
        validationSchema={addPlayerProfileValidationSchema}
      >
        {({ values, isSubmitting }) => (
          <Form className="flex flex-col gap-x-6 mx-auto  px-24 lg:px-36 pb-36 xl:gap-x-10 bg-white-dirty bg-opacity-70 border-t border-gray border-opacity-40 pt-30">
            <FormSection isDisabled={isSubmitting} label={"Zdjęcie"}>
              <ImageField
                name="PhotoFile"
                className="mx-auto md:mx-0 mb-8"
                //  @ts-ignore
                imgSrc={values.image}
                // @ts-ignore
                base64={base64}
                setBase64={setBase64}
              />
            </FormSection>

            <FormSection isDisabled={isSubmitting} label="Podstawowe">
              <SelectProfiles
                name="UserId"
                items={users}
                label="Użytkownik"
                selectedItem={selectedUser}
                setSelectedItem={setSelectedUser}
                // defaultValue={values.profile}
              />

              <TextField name="FirstName" label="Imię" />
              <TextField name="LastName" label="Nazwisko" />

              {/* <TextField name="Birthdate" label="Data urodzenia" /> */}
            </FormSection>

            <FormSection isDisabled={isSubmitting} label="">
              <SelectProfiles
                name="Gender"
                items={genders}
                label="Płeć"
                selectedItem={gender}
                setSelectedItem={setGender}
                // defaultValue={values.profile}
              />

              {/* <ProfileDatePicker
                name="Birthdate"
                label={"Data urodzenia"}
                date={date}
                setDate={setDate}
                // helperText={errors.AvailableFrom}
              /> */}

              <TextInput
                name="Birthdate"
                label={"Data urodzenia"}
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <TextField type="number" name="Height" label="Wzrost" />
              <TextField name="Weight" label="Waga" type="number" />
            </FormSection>

            <FormSection isDisabled={isSubmitting} label="Adres">
              <SelectProfiles
                name="Country"
                items={countries}
                label="Kraj"
                selectedItem={country}
                setSelectedItem={setCountry}
                // defaultValue={values.profile}
              />
              {/* <TextField name="Country" label="Kraj" /> */}
              <TextField name="City" label="Miasto" />
              <TextField name="Region" label="Województwo" />
              <TextField name="PostCode" label="Kod pocztowy" />
              <TextField name="Street" label="Ulica" />
              <TextField name="BuildingNumber" label="Numer budynku" />
              <TextField name="FlatNumber" label="Numer mieszkania" />
            </FormSection>

            <FormSection isDisabled={isSubmitting} label="Informacje">
              <SelectProfiles
                name="Target"
                items={targets}
                label="Cel"
                selectedItem={target}
                setSelectedItem={setTarget}
                // defaultValue={values.profile}
              />
              <SelectProfiles
                name="DominantLeg"
                items={dominantLegs}
                label="Noga dominująca"
                selectedItem={dominantLeg}
                setSelectedItem={setDominantLeg}
                // defaultValue={values.profile}
              />
              <SelectProfiles
                name="PreferredPosition"
                items={prefferedPositions}
                label="Preferowana pozycja"
                selectedItem={prefferedPosition}
                setSelectedItem={setPrefferedPosition}
                // defaultValue={values.profile}
              />
              <TextField name="Characteristics" label="Charakterystyka" />
              <TextField name="FifaId" label="FifaId" />
              <TextField name="PlayerId" label="Id zawodnika" />
            </FormSection>

            <div>
              <label
                style={{ display: "flex", gap: "15px", alignItems: "center" }}
              >
                <input
                  type="checkbox"
                  onChange={handleChange}
                  style={{ width: "15px", height: "15px" }}
                />
                <p style={{ fontSize: "14px", userSelect: "none" }}>
                  Oświadczam że zapoznałam/zapoznałem się z Regulaminem oraz
                  Polityką prywatności i akceptuje ich postanowienia
                </p>
              </label>
            </div>

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

export default AddPlayerProfile;
