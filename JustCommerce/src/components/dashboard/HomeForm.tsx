import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import permissionsServices from "services/permissionsServices";
import { useHistory } from "react-router-dom";
import { ISelectOption } from "components/common/inputs/inputTypes";
import ImageField from "components/common/inputs/imageInput/ImageField";
import playerProfileServices from "services/playerProfileServices";
import artistServices from "services/artistServices";
import ProfileDatePicker from "components/common/inputs/Datepicker/ProfileDatePicker";
import TextInput from "components/common/inputs/textInput/TextInput";
import { IRegisterDTO } from "types/userTypes";
import { showServerErrors } from "utils/errorsUtils";
import ContentContainer from "components/layout/ContentContainer";
import {
  addPlayerProfileInitValues,
  addPlayerProfileValidationSchema,
} from "components/playerProfiles/form/authHelpers";
import FormSection from "components/common/forms/FormSection";
import SelectProfiles from "components/common/inputs/select/SelectProfiles";
import TextField from "components/common/inputs/textInput/TextField";
import SubmitButton from "components/common/buttons/submitButton/SubmitButton";

const HomeForm: React.FC = () => {
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

  return (
    <div>
      <Formik
        // @ts-ignore
        initialValues={addPlayerProfileInitValues}
        onSubmit={handleSubmit}
        // validationSchema={addPlayerProfileValidationSchema}
      >
        {({ values, isSubmitting }) => (
          <Form className="flex flex-col gap-x-6 mx-auto  px-24 lg:px-36 pb-36 xl:gap-x-10 bg-white-dirty bg-opacity-70 ">
            <FormSection isDisabled={isSubmitting} label="Dane podstawowe">
              <TextField name="FirstName" label="Płeć" />
              <TextField name="FirstName1" label="Wiek od" />
              <TextField name="FirstName2" label="Wiek do" />
              <TextField name="FirstName3" label="Wzrost od" />
              <TextField name="LastName4" label="Wzrost do" />
              <TextField name="LastName5" label="Waga od" />
              <TextField name="LastName6" label="Waga do" />
            </FormSection>

            <FormSection isDisabled={isSubmitting} label="Karta zawodnika">
              <TextField name="LastName7" label="Cel" />
              <TextField name="LastName8" label="Preferowana pozycja" />
              <TextField name="LastName9" label="Noga" />
            </FormSection>

            <FormSection isDisabled={isSubmitting} label="Adres">
              <TextField name="Street" label="Miejscowość" />
              <TextField name="BuildingNumber" label="Kod pocztowy" />
              <TextField name="FlatNumber" label="Promień" />
            </FormSection>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default HomeForm;
