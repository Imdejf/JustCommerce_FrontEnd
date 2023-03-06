import { FormikHelpers, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import React, { useEffect, useState } from "react";
import ImageInput from "components/common/inputs/imageInput/ImageInput";
import DropdownPanel from "components/common/panels/DropdownPanel";
import axios from "axios";
import { addPressPack, editPressPack } from "store/actions/artistActions";
import { IPresspack, PresspackPhotosFormData } from "types/artistTypes";
import TabContent from "components/common/tabs/TabContent";
// @ts-ignore
import HorizontalTimeline from "react-horizontal-timeline";
import styled from "styled-components";
import { ButtonVariant } from "components/common/buttons/buttonTypes";
import Button from "components/common/buttons/basicButton/Button";
import playerProfileServices from "services/playerProfileServices";
import { PlayerCard } from "types/userTypes";
import { toast } from "react-toastify";
import { showServerErrors } from "utils/errorsUtils";

const StyledTextArea = styled.textarea`
  width: 100%;
`;

const ValueBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 7px;
  border: 2px solid gray;
  font-size: 9px;
  border-radius: 9px;
`;

const TextInput = styled.input`
  width: 40px;
`;

const DateInput = styled.input`
  width: 85px;
`;

const HorizontalBox = styled.div`
  width: 100%;
  height: 70px;
  margin: 0 auto;
  font-size: 13px;
  & > div {
    & > div {
      & > ul {
        & > li {
          background-image: unset !important;
        }
      }
    }
  }
`;

interface Props {
  id: string;
}

const CareerTab: React.FC<Props> = ({ id }) => {
  const [playerCard, setPlayerCard] = useState<PlayerCard | null>(null);
  const [isEdited, setIsEdited] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [editedValues, setEditedValues] = useState({
    academy: "",
    group: "",
    trainer: "",
    year: "",
    achievements: "",
    dataFrom: "",
    dataTo: "",
    historyId: "",
  });

  const [newValues, setNewValues] = useState({
    academy: "",
    group: "",
    trainer: "",
    year: "",
    achievements: "",
    dataFrom: "",
    dataTo: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEditedValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewValuesOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const editPlayerHistory = async () => {
    if (playerCard) {
      try {
        const newPlayerHistoryValues = {
          Academy: editedValues.academy,
          Group: `${editedValues.group}/${editedValues.year}`,
          Trainer: editedValues.trainer,
          From: editedValues.dataFrom,
          To: editedValues.dataTo,
          Achievements: editedValues.achievements,
          ProfileId: playerCard.ProfileId,
          PlayerCardId: playerCard.Id,
          HistoryId: editedValues.historyId,
        };
        //@ts-ignore
        await playerProfileServices.editPlayerProfileHistory(
          newPlayerHistoryValues,
        );
        toast.success(`Edytowano historie zawodnika!`);
        window.location.reload();
      } catch (errors: any) {
        showServerErrors(errors);
      }
    }
  };

  const addPlayerHistory = async () => {
    if (playerCard) {
      try {
        const editedPlayerHistoryValues = {
          Academy: newValues.academy,
          Group: `${newValues.group}/${newValues.year}`,
          Trainer: newValues.trainer,
          From: newValues.dataFrom,
          To: newValues.dataTo === "" ? null : newValues.dataTo,
          Achievements: newValues.achievements,
          ProfileId: playerCard.ProfileId,
          PlayerCardId: playerCard.Id,
        };
        //@ts-ignore
        await playerProfileServices.addPlayerProfileHistory(
          editedPlayerHistoryValues,
        );
        toast.success(`Dodano historie zawodnika!`);
        window.location.reload();
      } catch (errors: any) {
        showServerErrors(errors);
      }
    }
  };

  const deletePlayerHistory = async (historyId: string) => {
    if (playerCard) {
      try {
        const token = localStorage.getItem("token");

        await axios.delete(
          "https://adminapi.justwin.pl/api/PlayerProfile/History",
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
            data: {
              HistoryId: historyId,
              ProfileId: playerCard.ProfileId,
            },
          },
        );

        toast.success(`Usunięto historie zawodnika!`);
        window.location.reload();
      } catch (errors: any) {
        showServerErrors(errors);
      }
    }
  };

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

  function compare(a: any, b: any) {
    if (a.dataFrom < b.dataFrom) {
      return -1;
    }
    if (a.dataFrom > b.dataFrom) {
      return 1;
    }
    return 0;
  }

  const VALUES = playerCard?.PlayerHistories.map((playerHistory) => ({
    dataFrom: playerHistory.From.slice(0, 10),
    dataTo: playerHistory.To ? playerHistory.To.slice(0, 10) : "Do teraz",
    academyName: playerHistory.Academy,
    group: playerHistory.Group,
    trainer: playerHistory.Trainer,
    year: playerHistory.Year,
    achievements: playerHistory.Achievements,
    historyId: playerHistory.HistoryId,
  })).sort(compare);

  const [state, setState] = useState({ value: 0, previous: -1 });
  const academy = VALUES && VALUES[state.value]?.academyName;
  const group = VALUES && VALUES[state.value]?.group;
  const trainer = VALUES && VALUES[state.value]?.trainer;
  const year = VALUES && VALUES[state.value]?.year;
  const dataFrom = VALUES && VALUES[state.value]?.dataFrom;
  const dataTo = VALUES && VALUES[state.value]?.dataTo;
  const achievements = VALUES && VALUES[state.value]?.achievements;
  const historyId = VALUES && VALUES[state.value]?.historyId;

  useEffect(() => {
    if (
      academy &&
      group &&
      trainer &&
      year &&
      dataFrom &&
      dataTo &&
      achievements &&
      historyId
    ) {
      setEditedValues({
        academy,
        group,
        trainer,
        year,
        dataFrom,
        dataTo,
        achievements,
        historyId,
      });
    }
  }, [academy]);

  return (
    <TabContent id="career">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button
          variant={ButtonVariant.Submit}
          style={{ padding: "6px 12px" }}
          className="flex-1 md:flex-grow-0 py-8 px-23"
          onClick={() => setIsAdded((prev) => !prev)}
        >
          {!isAdded ? "Dodaj" : "Zamknij"}
        </Button>
      </div>

      {isAdded && (
        <div>
          <div
            className="px-18 py-8 bg-white opacity-80 rounded-t-sm"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "12px",
              marginTop: "10px",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "13px",
                alignItems: "center",
                minWidth: "150px",
              }}
            >
              <p>Akademia</p>
              <ValueBox>
                <TextInput
                  style={{ width: "65px" }}
                  type="text"
                  name="academy"
                  value={newValues.academy}
                  onChange={handleNewValuesOnChange}
                />
              </ValueBox>
            </div>

            <div style={{ display: "flex", gap: "13px", alignItems: "center" }}>
              <p>Rocznik</p>
              <ValueBox>
                {" "}
                <TextInput
                  type="text"
                  name="year"
                  value={newValues.year}
                  onChange={handleNewValuesOnChange}
                />
              </ValueBox>

              <p>Grupa</p>
              <ValueBox>
                {" "}
                <TextInput
                  type="text"
                  name="group"
                  value={newValues.group}
                  onChange={handleNewValuesOnChange}
                />
              </ValueBox>

              <p>Trener</p>
              <ValueBox>
                {" "}
                <TextInput
                  type="text"
                  name="trainer"
                  value={newValues.trainer}
                  onChange={handleNewValuesOnChange}
                />
              </ValueBox>
            </div>

            <div style={{ display: "flex", gap: "13px", alignItems: "center" }}>
              <p>Od</p>
              <ValueBox>
                {" "}
                <DateInput
                  type="date"
                  name="dataFrom"
                  value={newValues.dataFrom}
                  onChange={handleNewValuesOnChange}
                />
              </ValueBox>
              <p>Do</p>
              <ValueBox>
                {" "}
                <DateInput
                  type="date"
                  name="dataTo"
                  value={newValues.dataTo}
                  onChange={handleNewValuesOnChange}
                />
              </ValueBox>

              <Button
                variant={ButtonVariant.Submit}
                style={{ padding: "6px 12px" }}
                className="flex-1 md:flex-grow-0 py-8 px-18"
                onClick={() => {
                  addPlayerHistory();
                  setIsAdded(false);
                }}
              >
                Zapisz
              </Button>
            </div>
          </div>

          <div
            className="px-18 py-8 bg-white  rounded-t-sm"
            style={{
              display: "flex",
              minHeight: "350px",
              padding: "50px 50px 30px 50px",
              background: "rgba(255,255,255,0.2)",
              color: "rgba(0,0,0,0.7)",
            }}
          >
            <div style={{ width: "100%" }}>
              <p style={{ fontSize: "18px" }}> Sukcesy:</p>
              <StyledTextArea
                type="text"
                name="achievements"
                value={newValues.achievements}
                // @ts-ignore
                onChange={handleNewValuesOnChange}
              />
            </div>
          </div>
        </div>
      )}

      {academy && VALUES && !isEdited && (
        <div>
          <HorizontalBox>
            <HorizontalTimeline
              index={state.value}
              indexClick={(index: any) => {
                setState({ value: index, previous: state.value });
              }}
              values={VALUES.map((x) => x.dataFrom)}
              styles={{
                background: "#f8f8f8",
                foreground: "#609bff",
                outline: "#747373",
              }}
            />
          </HorizontalBox>
          <div
            className="px-18 py-8 bg-white opacity-80 rounded-t-sm"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "12px",
              marginTop: "10px",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "13px",
                alignItems: "center",
                minWidth: "150px",
              }}
            >
              <p>Akademia</p>
              <ValueBox>{academy}</ValueBox>
            </div>

            <div style={{ display: "flex", gap: "13px", alignItems: "center" }}>
              <p>Rocznik</p>
              <ValueBox> {year}</ValueBox>

              <p>Grupa</p>
              <ValueBox>{group}</ValueBox>

              <p>Trener</p>
              <ValueBox>{trainer}</ValueBox>
            </div>

            <div style={{ display: "flex", gap: "13px", alignItems: "center" }}>
              <p>Od</p>
              <ValueBox> {dataFrom}</ValueBox>
              <p>Do</p>
              <ValueBox>{dataTo}</ValueBox>

              <Button
                style={{ padding: "6px 12px" }}
                variant={ButtonVariant.Remove}
                className="flex-1 md:flex-grow-0 py-8 px-18"
                onClick={() => {
                  // @ts-ignore
                  deletePlayerHistory(historyId);
                }}
              >
                Usuń
              </Button>

              <Button
                variant={ButtonVariant.Submit}
                style={{ padding: "6px 12px" }}
                className="flex-1 md:flex-grow-0 py-8 px-18"
                onClick={() => setIsEdited(true)}
              >
                Edytuj
              </Button>
            </div>
          </div>

          <div
            className="px-18 py-8 bg-white  rounded-t-sm"
            style={{
              display: "flex",
              minHeight: "350px",
              padding: "50px 50px 30px 50px",
              background: "rgba(255,255,255,0.2)",
              color: "rgba(0,0,0,0.7)",
            }}
          >
            <div>
              <p style={{ fontSize: "18px" }}> Sukcesy:</p>
              <p
                style={{
                  marginLeft: "20px",
                  marginTop: "20px",
                  fontSize: "12px",
                }}
              >
                {achievements}
              </p>
            </div>
          </div>
        </div>
      )}

      {academy && VALUES && isEdited && (
        <div>
          <HorizontalBox>
            <HorizontalTimeline
              index={state.value}
              indexClick={(index: any) => {
                setState({ value: index, previous: state.value });
              }}
              values={VALUES.map((x) => x.dataFrom)}
              styles={{
                background: "#f8f8f8",
                foreground: "#609bff",
                outline: "#747373",
              }}
            />
          </HorizontalBox>
          <div
            className="px-18 py-8 bg-white opacity-80 rounded-t-sm"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "12px",
              marginTop: "10px",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "13px",
                alignItems: "center",
                minWidth: "150px",
              }}
            >
              <p>Akademia</p>
              <ValueBox>
                <TextInput
                  style={{ width: "65px" }}
                  type="text"
                  name="academy"
                  value={editedValues.academy}
                  onChange={handleOnChange}
                />
              </ValueBox>
            </div>

            <div style={{ display: "flex", gap: "13px", alignItems: "center" }}>
              <p>Rocznik</p>
              <ValueBox>
                {" "}
                <TextInput
                  type="text"
                  name="year"
                  value={editedValues.year}
                  onChange={handleOnChange}
                />
              </ValueBox>

              <p>Grupa</p>
              <ValueBox>
                {" "}
                <TextInput
                  type="text"
                  name="group"
                  value={editedValues.group}
                  onChange={handleOnChange}
                />
              </ValueBox>

              <p>Trener</p>
              <ValueBox>
                {" "}
                <TextInput
                  style={{ width: "70px" }}
                  type="text"
                  name="trainer"
                  value={editedValues.trainer}
                  onChange={handleOnChange}
                />
              </ValueBox>
            </div>

            <div style={{ display: "flex", gap: "13px", alignItems: "center" }}>
              <p>Od</p>
              <ValueBox>
                {" "}
                <DateInput
                  type="date"
                  name="dataFrom"
                  value={editedValues.dataFrom}
                  onChange={handleOnChange}
                />
              </ValueBox>
              <p>Do</p>
              <ValueBox>
                {" "}
                <DateInput
                  type="date"
                  name="dataTo"
                  value={editedValues.dataTo}
                  onChange={handleOnChange}
                />
              </ValueBox>

              <Button
                style={{ padding: "6px 12px" }}
                variant={ButtonVariant.Remove}
                className="flex-1 md:flex-grow-0 py-8 px-18"
                onClick={() => {
                  // @ts-ignore
                  deletePlayerHistory(historyId);
                }}
              >
                Usuń
              </Button>

              <Button
                variant={ButtonVariant.Submit}
                style={{ padding: "6px 12px" }}
                className="flex-1 md:flex-grow-0 py-8 px-18"
                onClick={() => {
                  editPlayerHistory();
                  setIsEdited(false);
                }}
              >
                Zapisz
              </Button>
            </div>
          </div>

          <div
            className="px-18 py-8 bg-white  rounded-t-sm"
            style={{
              display: "flex",
              minHeight: "350px",
              padding: "50px 50px 30px 50px",
              background: "rgba(255,255,255,0.2)",
              color: "rgba(0,0,0,0.7)",
            }}
          >
            <div style={{ width: "100%" }}>
              <p style={{ fontSize: "18px" }}> Sukcesy:</p>
              <StyledTextArea
                type="text"
                name="achievements"
                value={editedValues.achievements}
                // @ts-ignore
                onChange={handleOnChange}
              />
            </div>
          </div>
        </div>
      )}
    </TabContent>
  );
};

export default CareerTab;
