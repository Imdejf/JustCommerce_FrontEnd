// @ts-nocheck
import styled from "styled-components";
import notificationIco from "../../assets/icons/notificationIco.png";
import React, { useState, useEffect, useRef } from "react";
import notificationsServices from "services/notificationsServices";
import jwtDecode from "jwt-decode";
import SingleNotification from "./SingleNotification";
import { toast } from "react-toastify";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import * as signalR from "@microsoft/signalr";

const Container = styled.div<{ isOpen: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 99;
  height: ${(props) => (props.isOpen ? "345px" : "40px")};
  background: rgb(250, 251, 251);
`;

const NotificationButton = styled.div`
  width: 100%;
  display: flex;
  height: 40px;
  padding: 8px 15px;
  justify-content: space-between;
  font-size: 14px;
  background: rgb(250, 251, 251);
  cursor: pointer;
  position: relative;
  user-select: none;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  &:hover {
    background: rgba(243, 243, 243, 1);
    transition: background-color 0.2s ease;
  }
`;

const ImageBox = styled.div`
  width: 24px;
  height: 24px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
`;

const NotificationsNumber = styled.div`
  width: 16px;
  height: 16px;
  border: 1px solid white;
  border-radius: 100%;
  background: #0099ff;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -6px;
  right: -8px;
  font-size: 8px;
  user-select: none;
`;

const NotificationsBox = styled.div`
  width: 100%;
  min-height: 271px;
  max-height: 271px;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 6px;
    background-color: rgb(250, 251 251);
  }
  ::-webkit-scrollbar-thumb {
    width: 6px;
    background-color: #0099ff;
  }
`;

const ClearNotificationsBox = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: background-color 0.2s ease;
  background: rgb(250, 251 251);
  z-index: 99;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background: rgba(243, 243, 243, 1);
    transition: background-color 0.2s ease;
  }
`;

interface Notification {
  seen: boolean;
  completed: boolean;
  creationDate: string;
  description: string;
  notificationId: string;
  notificationType: number;
  objectId: string;
}

const Notifications: React.FC = () => {
  const [connection, setConnection] = useState<any>(null);
  const [notifications, setNotifications] = useState([]);
  const [unseenNotificationsNumber, setUnseenNotificationsNumber] = useState(0);
  const [isOpen, toggleOpen] = useState(false);
  const token = localStorage.getItem("token");
  const latestChat = useRef(null);

  // useEffect(() => {
  //   try {
  //     const newConnection = new HubConnectionBuilder()
  //       .withUrl("https://adminapi.justwin.pl/NotificationHub")
  //       .configureLogging(LogLevel.Information)
  //       .build();

  //     newConnection.on("ReceiveMessage", (user: any, message: any) => {
  //       console.log("Nowe powiadomienie!", message);
  //     });

  //     newConnection.start();

  //     // setConnection(newConnection);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const connection = new signalR.HubConnectionBuilder()
  //     .withUrl("https://adminapi.justwin.pl/NotificationHub", {
  //       // skipNegotiation: true,
  //       transport: signalR.HttpTransportType.LongPolling,
  //       // transport: signalR.HttpTransportType.WebSockets,
  //       // headers: {
  //       //   "Access-Control-Allow-Origin": "https://adminapi.justwin.pl",
  //       // },
  //     })
  //     // .withAutomaticReconnect()
  //     .build();

  //   connection.on("ReceiveMessage", (message) => {
  //     console.log(message);
  //   });

  //   connection.start().catch((err) => console.error(err.toString()));
  // }, []);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const connection = new signalR.HubConnectionBuilder()
  //     .withUrl("https://adminapi.justwin.pl/NotificationHub", {
  //       // skipNegotiation: true,
  //       // transport: signalR.HttpTransportType.LongPolling,
  //       transport: signalR.HttpTransportType.WebSockets,
  //     })
  //     // .withAutomaticReconnect()
  //     .build();

  //   connection.on("ReceiveMessage", (message) => {
  //     console.log(message);
  //   });

  //   connection.start().catch((err) => console.error(err.toString()));
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const newConnection = new HubConnectionBuilder()
        .withUrl("https://adminapi.justwin.pl/NotificationHub", {
          // transport: signalR.HttpTransportType.WebSockets,
          transport: signalR.HttpTransportType.LongPolling,
          headers: {
            // "Access-Control-Allow-Origin": "http://localhost:3000",
            Authorization: `Bearer ${token}`,
          },
        })
        // .withAutomaticReconnect()
        .configureLogging(LogLevel.Error)
        .build();
      setConnection(newConnection);
    }
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result: any) => {
          console.log("Connected!");

          connection.on("ReceiveMessage", (notification: Notification) => {
            console.log("powiadomienie1:", notification);

            toast.info("Dostałeś nowe powiadomienie!");
            setNotifications((prev) => [
              ...prev,
              {
                Id: notification.notificationId,
                NotificationType: notification.notificationType,
                Description: notification.description,
                Seen: notification.seen,
                Completed: notification.completed,
                CreationDate: notification.creationDate,
                ObjectId: notification.objectId,
              },
            ]);
            setUnseenNotificationsNumber((prev) => prev + 1);
          });

          connection.on("ReciveMessage", (message: any) => {
            console.log("powiadomienie2:", message);
          });
        })
        .catch((e: any) => console.log("Connection failed: ", e));
    }
  }, [connection]);

  // useEffect(() => {
  //   if (connection) {
  //     connection
  //       .start()
  //       .then((result: any) => {
  //         console.log("Connected!");

  //         connection.on("ReceiveMessage", (user: any, message: any) => {
  //           // const updatedChat = [...latestChat.current];
  //           // updatedChat.push(message);

  //           // setChat(updatedChat);
  //           console.log("Nowe powiadomienie!", message);
  //         });
  //       })
  //       .catch((e: any) => console.log("Connection failed: ", e));
  //   }
  // }, [connection]);

  useEffect(() => {
    if (token) {
      const decodedToken: any = jwtDecode(token);
      notificationsServices
        .getAllNotifications(decodedToken.jti)
        .then((notifications: any) => {
          setNotifications(notifications.Items);
          const unseenNotifications = notifications.Items.filter(
            (notification) => notification.Seen === false,
          );

          setUnseenNotificationsNumber(unseenNotifications.length);
        });
    }
  }, []);

  const clearAllNotifications = async () => {
    try {
      if (token) {
        const decodedToken: any = jwtDecode(token);
        notificationsServices.clearAllNotifications(decodedToken.jti);
        toast.success("Wyczyszczono powiadomienia!");
        setNotifications([]);
        setUnseenNotificationsNumber(0);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container isOpen={isOpen}>
      <NotificationButton onClick={() => toggleOpen((prev) => !prev)}>
        <p>Powiadomienia</p>
        <ImageBox>
          <img src={notificationIco} alt="notification" />
          {unseenNotificationsNumber > 0 && (
            <NotificationsNumber>
              {unseenNotificationsNumber > 99
                ? "99"
                : unseenNotificationsNumber}
            </NotificationsNumber>
          )}
        </ImageBox>
      </NotificationButton>
      <NotificationsBox>
        {isOpen &&
          notifications
            .map((notification) => {
              return (
                <SingleNotification
                  notification={notification}
                  setUnseenNotificationsNumber={setUnseenNotificationsNumber}
                />
              );
            })
            .reverse()}

        {/* {isOpen && (
          <>
            <SingleNotification
              notification={{
                Id: "test",
                Description: "test",
                Seen: false,
                CreationDate: "2023-01-13T15:54",
                NotificationType: 5,
                Completed: false,
              }}
            />
          </>
        )} */}
      </NotificationsBox>
      {isOpen &&
        (notifications.length > 0 ? (
          <ClearNotificationsBox onClick={() => clearAllNotifications()}>
            Wyczyść powiadomienia
          </ClearNotificationsBox>
        ) : (
          <ClearNotificationsBox>
            Nie masz żadnych powiadomień
          </ClearNotificationsBox>
        ))}
    </Container>
  );
};

export default Notifications;
