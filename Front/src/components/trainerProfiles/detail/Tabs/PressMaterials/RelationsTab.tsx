import React, { useState, useEffect } from "react";
import EditIco from "assets/icons/edit.svg";
import CancelIco from "assets/icons/status/unverified.svg";
import SaveIco from "assets/icons/save.svg";
import TabContent from "components/common/tabs/TabContent";

import {
  Countries,
  PlayerProfileDetailInterface,
} from "../../../../../types/userTypes";
import Button from "components/common/buttons/basicButton/Button";
import { ButtonVariant } from "components/common/buttons/buttonTypes";
import InputSearch from "components/common/inputs/searchInput/InputSearch";
import trainerProfileServices from "services/trainerProfileServices";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { showServerErrors } from "utils/errorsUtils";
import academiesServices from "services/academiesServices";
import axios from "axios";

interface IDetailTableProps {
  toggleAttribute: React.Dispatch<React.SetStateAction<boolean>>;
  stateAttribute: boolean;
}

interface Props {
  playerProfile: PlayerProfileDetailInterface;
  refreshPlayerProfile: any;
}

const RelationsTab: React.FC<Props> = ({
  playerProfile,
  refreshPlayerProfile,
}) => {
  const { id } = useParams<{ id: string }>();
  const [editAttributes, setEditAttributes] = useState(false);
  const [editedItemId, setEditedItemId] = useState("");
  const [stateAtibute, toggleAttribute] = useState(false);
  const [trainers, setTrainers] = useState<{ value: string; label: string }[]>(
    [],
  );
  const [academies, setAcademies] = useState<
    { value: string; label: string }[]
  >([]);
  const relations = playerProfile.AcademyRelations.concat(
    playerProfile.TrainerRelations,
  );
  const [trainer, setTrainer] = useState("");
  const [academy, setAcademy] = useState("");

  // const [typId, setTypId] = useState("");
  const [typ, setTyp] = useState("");
  const [profileName, setProfileName] = useState("");
  const [accessId, setAccessId] = useState(0);
  const [date, setDate] = useState("");

  const [editedTyp, setEditedTyp] = useState("");
  const [editedProfileName, setEditedProfileName] = useState("");
  const [editedAccessId, setEditedAccessId] = useState(0);
  const [editedDate, setEditedDate] = useState("");

  const [arr, setArr] = useState<any>([]);

  const typAtributes = [
    { ValueId: "Akademia", Name: "Akademia" },
    { ValueId: "Trener", Name: "Trener" },
  ];

  const accessAtributes = [
    { ValueId: 2, Name: "Pełny" },
    { ValueId: 1, Name: "Podstawowy" },
  ];

  const handleTypChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTyp(e.target.value);
  };

  const handleProfileName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileName(e.target.value);
  };

  const handleAccesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAccessId(+e.target.value);
  };

  const handleEditedAccesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedAccessId(+e.target.value);
  };

  const handleTrainer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTrainer(e.target.value);
  };

  const handleAcademy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAcademy(e.target.value);
  };

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleEditedTypChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedTyp(e.target.value);
  };
  const handleEditProfileName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedProfileName(e.target.value);
  };

  const handleEditedAccessChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setEditedAccessId(+e.target.value);
  };
  const handleEditDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedDate(e.target.value);
  };
  console.log(relations);
  const addTrainerRelation = () => {
    console.log("dane:", typ, profileName, accessId, date);
    const existedRelation = playerProfile.TrainerRelations.filter(
      (f) => f.Id === trainer,
    );
    if (existedRelation.length === 0) {
      trainerProfileServices.addFollowing(id, trainer, accessId);
      setTyp("");
      setProfileName("");
      setAccessId(0);
      setDate("");
      toggleAttribute(false);
      refreshPlayerProfile();
      toast.success("Dodano relacje!");
    } else {
      toast.error("Podana relacja już istnieje!");
    }
    // window.location.reload();
  };

  const addAcademyRelation = () => {
    console.log("dane:", typ, profileName, accessId, date);
    const existedRelation = playerProfile.AcademyRelations.filter(
      (f) => f.Id === academy,
    );
    if (existedRelation.length === 0) {
      academiesServices.hirePlayer(id, academy, accessId);
      setTyp("");
      setProfileName("");
      setAccessId(0);
      setDate("");
      toggleAttribute(false);
      refreshPlayerProfile();
      toast.success("Dodano relacje!");
      // window.location.reload();
    } else {
      toast.error("Podana relacja już istnieje!");
    }
  };

  const editTrainerRelation = async (
    FollowingId: string,
    AccessType: number,
  ) => {
    if (editedAccessId) {
      try {
        await trainerProfileServices.editFollowing(FollowingId, AccessType);
        toast.success("Edytowano relacje!");
        refreshPlayerProfile();
      } catch (errors: any) {
        showServerErrors(errors);
      }
    }
  };

  const editAcademyRelation = async (AcademyId: string, AccessType: number) => {
    if (editedAccessId) {
      try {
        await academiesServices.updateRelation(id, AcademyId, AccessType);
        toast.success("Edytowano relacje!");
        refreshPlayerProfile();
      } catch (errors: any) {
        showServerErrors(errors);
      }
    }
  };

  useEffect(() => {
    try {
      const t = {
        pageNumber: 1,
        pageSize: 100,
        searchString: "",
      };
      trainerProfileServices
        .getAllTrainerProfiles(t)

        .then((resp) =>
          resp.items.map((single: any) => {
            setTrainers((prev) => [
              ...prev,
              { value: single.Id, label: single.Name },
            ]);
          }),
        );
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    try {
      const t = {
        pageNumber: 1,
        pageSize: 100,
        searchString: "",
      };
      academiesServices
        .getAllAcademies(t)

        .then((resp) =>
          resp.items.map((single: any) => {
            setAcademies((prev) => [
              ...prev,
              { value: single.Id, label: single.Name },
            ]);
          }),
        );
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (editedItemId) {
      const filteredItem = relations.filter(
        (item: any) => item.Id === editedItemId,
      );
      const { AccessType } = filteredItem[0];

      setEditedAccessId(AccessType);
    }
  }, [editedItemId]);

  const accessSwitch = (accessNumber: number) => {
    switch (accessNumber) {
      case 1:
        return "Podstawowy";

      case 2:
        return "Pełny";

      default:
        return accessNumber;
    }
  };

  const userTypeSwitch = (type: number) => {
    switch (type) {
      case 1:
        return "Akademia";
      case 2:
        return "Trener";
      default:
        return type;
    }
  };

  // <div className="px-18 flex justify-between py-8 bg-white opacity-80 rounded-t-sm">
  //   <span className="opacity-70">{/* {label} */}</span>
  //   <div style={{ display: "flex", gap: "25px" }}>
  //     <Button
  //       onClick={() => {
  //         toggleAttribute((prev) => !prev);
  //       }}
  //       variant={ButtonVariant.Submit}
  //     >
  //       Dodaj dostęp
  //     </Button>

  //     <Button
  //       onClick={() => {
  //         setEditAttributes((prev) => !prev);

  //         toggleAttribute(false);
  //         setEditedItemId("");
  //         editCombination(
  //           editedTyp,
  //           editedProfileName,
  //           editedAccessId,
  //           editedDate,
  //           editedItemId,
  //         );
  //       }}
  //       variant={ButtonVariant.Submit}
  //     >
  //       {editAttributes ? "Zapisz" : "Edytuj"}
  //     </Button>
  //   </div>
  // </div>;

  const deleteTrainerRelation = (id: string) => {
    trainerProfileServices.removeFollowing(id);
    toast.success("Usunięto relacje!");
    refreshPlayerProfile();
  };

  const deleteAcademyRelation = async (AcademyId: string) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete("https://adminapi.justwin.pl/api/Academy/FirePlayer", {
        headers: {
          Authorization: `bearer ${token}`,
        },
        data: {
          PlayerId: id,
          AcademyId,
        },
      });

      toast.success("Usunięto relacje!");
      refreshPlayerProfile();
    } catch (errors: any) {
      console.error(errors);
    }
  };

  return (
    <div className="w-full text-sm">
      <div
        className="px-18 py-12 bg-white opacity-80 rounded-t-sm"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <span className="opacity-70">Menedżer</span>
        <div style={{ display: "flex", gap: "20px" }}>
          <span
            className="opacity-70"
            style={{ color: "blue", cursor: "pointer", userSelect: "none" }}
            onClick={() => {
              toggleAttribute((prev) => !prev);
            }}
          >
            {stateAtibute ? "Anuluj" : "Dodaj"}
          </span>
          <span
            className="opacity-70"
            style={{ color: "blue", cursor: "pointer", userSelect: "none" }}
            onClick={() => {
              setEditAttributes((prev) => !prev);
            }}
          >
            {editAttributes ? "Zapisz" : "Edytuj"}
          </span>
        </div>
      </div>

      <>
        <div className={`grid relative grid-cols-6 gap-1 my-1`}>
          <div className="bg-white bg-opacity-80 p-12 text-center">
            <span className="opacity-70">Typ</span>
          </div>

          <>
            <div
              style={{ gridColumn: "2 / span 2" }}
              className="bg-white bg-opacity-80 p-12 text-center"
            >
              <span className="opacity-70">Nazwa Profilu</span>
            </div>
            <div className="bg-white bg-opacity-80 p-12 text-center">
              <span className="opacity-70">Dostep</span>
            </div>
          </>

          <div className="bg-white bg-opacity-80 p-12 text-center">
            <span className="opacity-70">Data od</span>
          </div>
          <div className="bg-white bg-opacity-80 p-12 text-center">
            <span className="opacity-70">Zmiana parametrów</span>
          </div>
        </div>
      </>
      {stateAtibute && (
        <>
          <div className={`grid relative grid-cols-6 gap-1 my-1`}>
            <div className="bg-white bg-opacity-80 p-12 text-center">
              <span className="opacity-70">
                <select
                  style={{ background: "#efefef" }}
                  name=""
                  id=""
                  onChange={handleTypChange}
                >
                  <option value="" disabled hidden selected>
                    Typ
                  </option>
                  {typAtributes.map((attribute) => {
                    const { Name, ValueId } = attribute;
                    return <option value={ValueId}>{Name}</option>;
                  })}
                </select>
              </span>
            </div>

            <div
              className="bg-white bg-opacity-80 p-12 text-center"
              style={{ gridColumn: "2 / span 2" }}
            >
              {/* <input
                style={{ background: "rgba(0,0,0,0.04)" }}
                type="text"
                value={profileName}
                onChange={handleProfileName}
              /> */}

              {typ === "Trener" ? (
                <>
                  <select
                    style={{ background: "#efefef" }}
                    name=""
                    id=""
                    onChange={handleTrainer}
                  >
                    <option value="" disabled hidden selected>
                      Trener
                    </option>
                    {trainers.map((trainer) => {
                      const { value, label } = trainer;

                      return <option value={value}>{label}</option>;
                    })}
                  </select>
                </>
              ) : typ === "Akademia" ? (
                <>
                  <select
                    style={{ background: "#efefef" }}
                    name=""
                    id=""
                    onChange={handleAcademy}
                  >
                    <option value="" disabled hidden selected>
                      Akademia
                    </option>
                    {academies.map((academy) => {
                      const { value, label } = academy;
                      return <option value={value}>{label}</option>;
                    })}
                  </select>
                </>
              ) : (
                <>
                  <p>-</p>
                </>
              )}
            </div>

            <div className="bg-white bg-opacity-80 p-12 text-center">
              <span className="opacity-70">
                <select
                  style={{ background: "#efefef" }}
                  name=""
                  id=""
                  onChange={handleAccesChange}
                >
                  <option value="" disabled hidden selected>
                    Dostęp
                  </option>
                  {accessAtributes.map((attribute) => {
                    const { Name, ValueId } = attribute;
                    return <option value={ValueId}>{Name}</option>;
                  })}
                </select>
              </span>
            </div>

            <div className="bg-white bg-opacity-80 p-12 text-center">
              {/* <input
                style={{ background: "rgba(0,0,0,0.04)" }}
                type="date"
                value={date}
                onChange={handleDate}
              /> */}
              <span>-</span>
            </div>

            <div className="bg-white bg-opacity-80 p-12 text-center">
              <span
                onClick={() => {
                  if (!typ || !accessId) {
                    toast.error("Uzupełnij dane!");
                  } else {
                    if (typ === "Trener") {
                      if (!trainer) {
                        toast.error("Wybierz trenera!");
                      } else {
                        addTrainerRelation();
                      }
                    }

                    if (typ === "Akademia") {
                      if (!academy) {
                        toast.error("Wybierz akademie!");
                      } else {
                        addAcademyRelation();
                      }
                    }
                  }
                }}
                className={`  text-xl  leading-none  text-green cursor-pointer`}
              >
                +
              </span>
            </div>
          </div>
        </>
      )}

      {relations.map((relation) => {
        if (relation.Id === editedItemId) {
          return (
            <>
              <div className={`grid relative grid-cols-6 gap-1 my-1`}>
                <div className="bg-white bg-opacity-40 p-12 text-center">
                  <span className="opacity-70">
                    {userTypeSwitch(relation.RelationUserType)}
                  </span>
                </div>

                <div
                  className="bg-white bg-opacity-40 p-12 text-center"
                  style={{ gridColumn: "2 / span 2" }}
                >
                  {relation.Name}
                </div>

                <div className="bg-white bg-opacity-40 p-12 text-center">
                  <span className="opacity-70">
                    <select
                      style={{ background: "#efefef" }}
                      name=""
                      id=""
                      onChange={handleEditedAccesChange}
                      value={editedAccessId}
                    >
                      <option value="" disabled hidden selected>
                        Dostęp
                      </option>
                      {accessAtributes.map((attribute) => {
                        const { Name, ValueId } = attribute;
                        return <option value={ValueId}>{Name}</option>;
                      })}
                    </select>
                  </span>
                </div>

                <div className="bg-white bg-opacity-40 p-12 text-center">
                  {relation.From.slice(0, 10)}
                </div>

                <div className="bg-white bg-opacity-40 p-12 text-center">
                  {editAttributes && (
                    <div
                      className="  text-center "
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "25px",
                      }}
                    >
                      <img
                        onClick={() => {
                          if (relation.RelationUserType === 2) {
                            editTrainerRelation(relation.Id, editedAccessId);
                          }
                          if (relation.RelationUserType === 1) {
                            editAcademyRelation(relation.Id, editedAccessId);
                          }
                        }}
                        style={{
                          width: "18px",
                          height: "18px",

                          cursor: "pointer",
                        }}
                        src={SaveIco}
                        alt="save"
                      />
                      <img
                        onClick={() => setEditedItemId("")}
                        style={{
                          width: "18px",
                          height: "18px",
                          cursor: "pointer",
                        }}
                        src={CancelIco}
                        alt="cancel"
                      />
                    </div>
                  )}
                </div>
              </div>
            </>
          );
        } else {
          return (
            <>
              <div className={`grid relative grid-cols-6 gap-1 my-1`}>
                <div className="bg-white bg-opacity-40 p-12 text-center">
                  <span className="opacity-70">
                    {userTypeSwitch(relation.RelationUserType)}
                  </span>
                </div>

                <div
                  className="bg-white bg-opacity-40 p-12 text-center"
                  style={{ gridColumn: "2 / span 2" }}
                >
                  {relation.Name}
                </div>

                <div className="bg-white bg-opacity-40 p-12 text-center">
                  <span className="opacity-70">
                    {accessSwitch(relation.AccessType)}
                  </span>
                </div>

                <div className="bg-white bg-opacity-40 p-12 text-center">
                  {relation.From.slice(0, 10)}
                </div>

                <div className="bg-white bg-opacity-40 p-12 text-center">
                  {editAttributes && (
                    <div
                      className=" text-center "
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "25px",
                      }}
                    >
                      <img
                        onClick={() => setEditedItemId(relation.Id)}
                        style={{
                          width: "18px",
                          height: "18px",

                          cursor: "pointer",
                        }}
                        src={EditIco}
                        alt="edit"
                      />

                      <span
                        onClick={() => {
                          if (relation.RelationUserType === 2) {
                            deleteTrainerRelation(relation.Id);
                          }
                          if (relation.RelationUserType === 1) {
                            deleteAcademyRelation(relation.Id);
                          }
                        }}
                        style={{
                          fontSize: "18px",
                          color: "red",
                          cursor: "pointer",
                        }}
                      >
                        X
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </>
          );
        }
      })}
    </div>
  );
};

export default RelationsTab;
