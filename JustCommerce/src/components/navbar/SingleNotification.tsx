import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import notificationsServices from "services/notificationsServices";
import styled from "styled-components";

const SingleNotificationBox = styled.div<{
  completed: boolean;
  hasBeenCompleted: boolean;
}>`
  width: 100%;
  display: flex;
  padding: 8px 15px;
  font-size: 11px;
  height: 90px;
  background: rgb(250, 251, 251);
  cursor: pointer;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  flex-direction: column;
  transition: background-color 0.2s ease;
  font-weight: ${(props) =>
    props.completed === false && props.hasBeenCompleted === false
      ? "600"
      : "unset"};

  &:first-child {
    border-top: unset;
  }

  &:hover {
    background: rgba(243, 243, 243, 1);
    transition: background-color 0.2s ease;
  }
`;

const SingleNotificationTop = styled.div`
  height: 25px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
`;

const Circle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 100%;
  background: #0099ff;
`;

const SingleNotificationBottom = styled.div`
  /* max-height: 54px; */
  width: 100%;
  overflow: hidden;
  /* white-space: nowrap; */
  text-overflow: ellipsis;
  font-size: 11px;
  line-height: 13px;
`;

interface Props {
  notification: {
    Id: string;
    Completed: boolean;
    Description: string;
    CreationDate: string;
    NotificationType: number;
    Seen: boolean;
    ObjectId: string;
  };
  setUnseenNotificationsNumber: React.Dispatch<React.SetStateAction<number>>;
}

const SingleNotification: React.FC<Props> = ({
  notification,
  setUnseenNotificationsNumber,
}) => {
  const history = useHistory();
  const [hasBeenSeen, setHasBeenSeen] = useState(false);
  const [hasBeenCompleted, setHasBeenCompleted] = useState(false);
  const token = localStorage.getItem("token");
  const seeNotification = async (notificationId: string) => {
    try {
      if (token) {
        const decodedToken: any = jwtDecode(token);
        notificationsServices.seeNotification(decodedToken.jti, notificationId);
        setUnseenNotificationsNumber((prev) => prev - 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const completeNotification = async (notificationId: string) => {
    try {
      if (token) {
        const decodedToken: any = jwtDecode(token);
        notificationsServices.completeNotification(
          decodedToken.jti,
          notificationId,
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const goToSwitch = (notificationType: number, objectId: string) => {
    switch (notificationType) {
      case 1:
        return history.push(`/accounts/detail/${objectId}`);
      case 2:
        return history.push(`/accounts/detail/${objectId}`);
      case 3:
        return;
      case 4:
        return history.push(`/accounts/detail/${objectId}`);
      case 5:
        return history.push(`/accounts/detail/${objectId}?tab=agreements`);
      case 6:
        return history.push(`/academies/detail/${objectId}`);
      case 7:
        return history.push(`/academies/detail/${objectId}`);
      case 8:
        return;
      case 9:
        return history.push(`/trainer-profiles/detail/${objectId}`);
      case 10:
        return history.push(`/trainer-profiles/detail/${objectId}`);
      case 11:
        return;
      case 12:
        return history.push(`/player-profiles/detail/${objectId}`);
      case 13:
        return history.push(`/player-profiles/detail/${objectId}`);
      case 14:
        return history.push(`/player-profiles/detail/${objectId}`);
      case 15:
        return;
      case 16:
        return;
      case 17:
        return;
      case 18:
        return;
      case 19:
        return;
      case 20:
        return history.push(
          `/player-profiles/detail/${objectId}?tab=playerCard`,
        );
      case 21:
        return history.push(`/player-profiles/detail/${objectId}?tab=career`);
      case 22:
        return history.push(`/player-profiles/detail/${objectId}?tab=career`);
      case 23:
        return;
      case 24:
        return history.push(`/player-profiles/detail/${objectId}`);
      case 25:
        return history.push(`/player-profiles/detail/${objectId}`);
      case 26:
        return history.push(
          `/player-profiles/detail/${objectId}?tab=statistics`,
        );
      case 27:
        return history.push(`/shop/orders/detail/${objectId}`);
      case 28:
        return history.push(`/shop/orders/detail/${objectId}?tab=refunds`);
      case 29:
        return;
      case 30:
        return history.push(
          `/player-profiles/detail/${objectId}?tab=relations`,
        );
      case 31:
        return history.push(
          `/trainer-profiles/detail/${objectId}?tab=relations`,
        );
      case 32:
        return history.push(
          `/player-profiles/detail/${objectId}?tab=relations`,
        );
      case 33:
        return history.push(
          `/trainer-profiles/detail/${objectId}?tab=relations`,
        );
      case 34:
        return history.push(`/player-profiles/detail/${objectId}`);
      case 35:
        return history.push(`/trainer-profiles/detail/${objectId}`);
      case 36:
        return history.push(`/trainer-profiles/detail/${objectId}`);
      case 37:
        return history.push(`/player-profiles/detail/${objectId}`);
      case 38:
        return history.push(
          `/player-profiles/detail/${objectId}?tab=relations`,
        );
      case 39:
        return history.push(`/trainer-profiles/detail/${objectId}?tab=menager`);
      case 40:
        return history.push(`/trainer-profiles/detail/${objectId}?tab=menager`);
      case 41:
        return history.push(`/player-profiles/detail/${objectId}?tab=menager`);
      case 42:
        return history.push(`/player-profiles/detail/${objectId}?tab=payments`);
      case 43:
        return history.push(`/shop/orders/detail/${objectId}?tab=status`);
      case 44:
        return history.push(`/shop/orders/detail/${objectId}?tab=status`);
      case 45:
        return history.push(`/shop/orders/detail/${objectId}`);
      case 46:
        return;
      case 47:
        return history.push(`/player-profiles/detail/${objectId}?tab=menager`);
      case 48:
        return history.push(`/player-profiles/detail/${objectId}?tab=menager`);
      default:
        return;
    }
  };
  const notificationDescriptionSwitch = (notificationType: number) => {
    switch (notificationType) {
      case 1:
        return "Użytkownik utworzony";
      case 2:
        return "Dane użytkownika zostały zaktualizowane";
      case 3:
        return "Użytkownik usunięty";
      case 4:
        return "Konto zostało aktywowane przez użytkownika";
      case 5:
        return "Użytkownik zaktualizował swoje zgody";
      case 6:
        return "Akademia utworzona";
      case 7:
        return "Dane Akademii zostały zaktualizowane";
      case 8:
        return "Akademia usunięta";
      case 9:
        return "Utworzono trenera";
      case 10:
        return "Zaktualizowano dane trenera";
      case 11:
        return "Trener usunięty";
      case 12:
        return "Utworzono profil zawodnika";
      case 13:
        return "Zaktualizowano dane profilu zawodnika";
      case 14:
        return "Zaktualizowano dostęp do profilu zawodnika";
      case 15:
        return "Usunięto profil zawodnika";
      case 16:
        return "Wysłano zaproszenie do profilu";
      case 17:
        return "Zaproszenie do profilu zaakceptowane";
      case 18:
        return "Odrzucenie zaproszenia do profilu";
      case 19:
        return "Usunięto zaproszenie do profilu";
      case 20:
        return "Zaktualizowano dane karty zawodnika";
      case 21:
        return "Utworzono historię zawodnika";
      case 22:
        return "Zaktualizowano dane historii zawodnika";
      case 23:
        return "Usunięto historię zawodnika";
      case 24:
        return "Zawodnik sparował urządzenie";
      case 25:
        return "Zawodnik odłączył urządzenie";
      case 26:
        return "Zaktualizowano kartę medyczną zawodnika";
      case 27:
        return "Utworzono zamówienie";
      case 28:
        return "Zwrot utworzony";
      case 29:
        return "Usunięto przeterminowaną subskrypcję";
      case 30:
        return "Zawodnik zaakceptował prośbę o dołączenie do akademii";
      case 31:
        return "Trener zaakceptował prośbę o dołączenie do akademii";
      case 32:
        return "Akademia zaakceptowała prośbę o dołączenie zawodnika";
      case 33:
        return "Akademia zaakceptowała prośbę o dołączenie trenera";
      case 34:
        return "Zawodnik opuścił akademię";
      case 35:
        return "Trener opuścił akademię";
      case 36:
        return "Trener zwolniony z Akademii";
      case 37:
        return "Zawodnik zwolniony z Akademii";
      case 38:
        return "Zawodnik zaakceptował prośbę o obserwacje";
      case 39:
        return "Trener zaakceptował prośbę o obserwacje";
      case 40:
        return "Trener odrzucił obserwacje";
      case 41:
        return "Zawodnik odrzucił obserwacje";
      case 42:
        return "Zawodnik kupił subskrypcję";
      case 43:
        return "Zaktualizowano status płatności zamówienia";
      case 44:
        return "Transakcja zamówienia została utworzona";
      case 45:
        return "Użytkownik zaktualizował typ płatności w zamówieniu";
      case 46:
        return "Użytkownik usunął zamówienie";
      case 47:
        return "Zawodnik zaktualizował typ dostępu do relacji trenera";
      case 48:
        return "Zawodnik zaktualizował typ dostępu do relacji akademii";
      default:
        return "Nowe powiadomienie";
    }
  };

  const {
    Id,
    Completed,
    Description,
    CreationDate,
    NotificationType,
    Seen,
    ObjectId,
  } = notification;
  return (
    <SingleNotificationBox
      completed={Completed}
      hasBeenCompleted={hasBeenCompleted}
      key={Id}
      onClick={() => {
        if (!Completed && !hasBeenCompleted) {
          completeNotification(Id);
          goToSwitch(NotificationType, ObjectId);
          setHasBeenCompleted(true);
        } else {
          goToSwitch(NotificationType, ObjectId);
        }
      }}
      onMouseOver={() => {
        if (!Seen && !hasBeenSeen) {
          seeNotification(Id);
          setHasBeenSeen(true);
        }
      }}
    >
      <SingleNotificationTop>
        {/* @ts-ignore */}
        <p>{`${CreationDate.slice(0, 10)}  ${CreationDate.slice(11, 16)}`}</p>
        {!Seen && !hasBeenSeen && <Circle />}
      </SingleNotificationTop>
      <SingleNotificationBottom>
        {/* {notificationDescriptionSwitch(NotificationType)} */}
        {Description}
      </SingleNotificationBottom>
    </SingleNotificationBox>
  );
};

export default SingleNotification;
