// @ts-nocheck
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
  PlayerCard,
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
import PlayerProfileDetailTable from "components/artists/detail/PlayerProfileDetailTable";

const EditPlayerProfiles: React.FC = () => {
  const [playerProfile, setPlayerProfile] =
    useState<PlayerProfileDetailInterface | null>(null);
  const [gender, setGender] =
    useState<{ value: number; label: string } | null>(null);
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

  const [base64, setBase64] = useState("");
  const [date, setDate] = useState("");
  const { id } = useParams<{ id: string }>();
  const { goBack } = useHistory();

  const [playerCard, setPlayerCard] = useState<PlayerCard | null>(null);

  useEffect(() => {
    playerProfileServices
      .getPlayerCard(id)
      .then((playerCardData) => {
        setPlayerCard(playerCardData);
      })
      .catch((errors: any) => {
        showServerErrors(errors);
      });
  }, [id]);

  const genderSwitch = (gender: number) => {
    switch (gender) {
      case 0:
        return { value: 0, label: "Mężczyzna" };
      case 1:
        return { value: 1, label: "Kobieta" };

      default:
        return { value: gender, label: "Inna" };
    }
  };

  const dominantLegSwitch = (type: number) => {
    switch (type) {
      case 1:
        return { value: 1, label: "Prawa" };
      case 2:
        return { value: 2, label: "Lewa" };
      case 3:
        return { value: 3, label: "Obie" };
      default:
        return `${type}`;
    }
  };

  const prefferedPositionSwitch = (type: number) => {
    switch (type) {
      case 1:
        return { value: 1, label: "Bramkarz" };
      case 2:
        return { value: 2, label: "Obrońca" };
      case 3:
        return { value: 3, label: "Pomocnik" };
      case 4:
        return { value: 4, label: "Napastnik" };
      default:
        return `${type}`;
    }
  };

  const targetSwitch = (type: string) => {
    switch (type) {
      case "Amator":
        return {
          value: "71469a28-2936-11ed-bb1c-0242ac1b0002",
          label: "Amator",
        };
      case "Profesjonalny":
        return {
          value: "7146a31f-2936-11ed-bb1c-0242ac1b0002",
          label: "Profesjonalny",
        };
      default:
        return `${type}`;
    }
  };

  console.log(playerCard);
  useEffect(() => {
    playerProfileServices
      .getSinglePlayerProfile(id)
      .then((playerProfileData) => {
        setPlayerProfile(playerProfileData);
      })
      .catch((errors) => {
        showServerErrors(errors);
      });
  }, [id]);

  useEffect(() => {
    if (playerProfile) {
      setGender(genderSwitch(playerProfile.Gender));
      setDate(
        playerProfile?.Birthdate.split(".")
          .reverse()
          .join(".")
          .replaceAll(".", "-"),
      );
      setPrefferedPosition(
        prefferedPositionSwitch(playerCard?.PreferredPosition),
      );
      setDominantLeg(dominantLegSwitch(playerCard?.DominantLeg));
      setTarget(targetSwitch(playerCard?.Target));
    }
  }, [playerProfile, playerCard]);

  const getAllCountries = async () => {
    try {
      // const resp = await playerProfileServices.getAllCountries();

      // const countriesArray: any = [];

      // const convertedObiect = Object.values(resp);

      // convertedObiect.map((country, index) => {
      //   return countriesArray.push({
      //     label: `${country.FullName}`,
      //     value: country.FlagValue,
      //   });
      // });

      // setCountries(countriesArray);
      setCountries([{ label: "Poland", value: 177 }]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCountries();
  }, []);

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
          value: "71469a28-2936-11ed-bb1c-0242ac1b0002",
        },
        {
          label: "Profesjonalny",
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

  if (!playerProfile || !playerCard) {
    return null;
  }

  const initValues = {
    FirstName: playerProfile.FirstName,
    LastName: playerProfile.LastName,
    City: playerProfile.Address.City,
    Region: playerProfile.Address.Region,
    PostCode: playerProfile.Address.PostCode,
    Street: playerProfile.Address.Street,
    BuildingNumber: playerProfile.Address.BuildingNumber,
    FlatNumber: playerProfile.Address.FlatNumber,
    FifaId: playerCard?.FifaId,
    Characteristics: playerCard?.Characteristics,
    ContactPersone: 0,
    IsProfilePrivate: true,
    PlayerId: playerCard?.PlayerId,
  };

  const handleSubmit = async (values: typeof initValues) => {
    try {
      let { PlayerId, Characteristics, FifaId, ...rest } = values;

      const editedUser = {
        ProfileId: id,
        RemoveCurrentPhoto: base64 ? true : false,
        Gender: gender?.value,
        Birthdate: date,
        Country: country?.value,

        ...rest,
        Card: {
          DisciplineId: "03641162-2934-11ed-bb1c-0242ac1b0002",
          FifaId,
          PlayerId,
          Characteristics,
          TargetId: target?.value,
          DominantLeg: dominantLeg?.value,
          PreferredPosition: prefferedPosition?.value,
          IsPlayerAssociated: false,
        },
      };

      await playerProfileServices.editPlayerProfile(editedUser);
      toast.success(`Edytowano profil zawodnika!`);
      goBack();
    } catch (errors: any) {
      showServerErrors(errors);
    }
  };

  return (
    <ContentContainer
      title="Edycja profilu zawodnika"
      path={`/player-profiles/detail/${id}`}
    >
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
                imgSrc={playerProfile.FtpPhotoFilePath}
                base64={base64}
                setBase64={setBase64}
              />
            </FormSection>

            <FormSection isDisabled={isSubmitting} label="Podstawowe">
              <SelectProfiles
                name="Gender"
                items={genders}
                label="Płeć"
                selectedItem={gender}
                setSelectedItem={setGender}
                // defaultValue={values.profile}
              />
              <TextField name="FirstName" label="Imię" />
              <TextField name="LastName" label="Nazwisko" />

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
            </FormSection>

            <FormSection isDisabled={isSubmitting} label="Adres">
              <SelectProfiles
                name="Country"
                items={countries}
                label="Kraj"
                selectedItem={country}
                setSelectedItem={setCountry}
                // defaultValue={
                //   countries
                //     ? countries[playerProfile.Address.Country]?.value - 1
                //     : ""
                // }
                defaultValue={177}
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

export default EditPlayerProfiles;
