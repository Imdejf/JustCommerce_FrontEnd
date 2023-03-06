export interface IUserRole {
  role: string;
}

export interface IUserManagementEditData {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  position: string;
  userId: string;
  userName: string;
}

export interface UserManagmentEditInterface {
  Email: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Position: string;
  ProfileId: string;
  UserName: string;
  Type: number;
  FtpPhotoFilePath: string;
}

export interface Permission {
  IsAvailable: boolean;
  PermissionDomainName: string;
  PermissionFlagName: string;
  PermissionFlagValue: number;
}
interface SubscribedNotification {
  Name: string;
  NotificationType: number;
}
export interface UserInterface {
  Email: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Position: string;
  UserId: string;
  UserName: string;
  IsActivate: boolean;
  Id: string;
  ProfileId: string;
  Nickname: string;

  Permissions: Permission[];
  SubscribedNotificaitons: SubscribedNotification[];
}

interface PlayerHistory {
  Academy: string;
  From: string;
  Group: string;
  HistoryId: string;
  To: string;
  Trainer: string;
  Year: string;
  Achievements: string;
}

export interface PlayerCard {
  ProfileId: string;
  Id: string;
  Discipline: {
    Name: string;
  };
  Target: string;
  PlayerHistories: PlayerHistory[];
  DominantLeg: number;
  FifaId: string;
  PreferredPosition: number;
  IsPlayerAssociated: boolean;
}

export interface Countries {
  FlagValue: number;
  Name: string;
  FullName: string;
}

interface Subscription {
  SubscriptionId: string;
  From: string;
  To: string;
  Employee: string;
}

interface MedicalCard {
  From: string;
  Height: number;
  Id: string;
  IsActual: boolean;
  To: string;
  Weight: number;
}

interface AcademyRelation {
  AccessType: number;
  From: string;
  Id: string;
  Name: string;
  RelationUserType: number;
}

interface TrainerRelation {
  AccessType: number;
  From: string;
  Id: string;
  Name: string;
  RelationUserType: number;
}

interface AllowedUser {
  Id: string;
  Name: string;
  Access: number;
}

interface TrainerAllowedUser {
  Id: string;
  Name: string;
  FtpPhotoFilePath: string;
}

export interface TrainerProfileDetailInterface {
  FirstName: string;
  LastName: string;
  IsVerified: boolean;
  Id: string;
  PhotoFilePath: string;
  Description: string;
  LicenseId: string;
  DisciplineName: string;
  Created: string;

  Contact: {
    Email: string;
    PhoneNumber: string;
  };

  Address: {
    BuildingNumber: string;
    City: string;
    Country: number;
    FlatNumber: string;
    PostCode: string;
    Region: string;
    Street: string;
  };

  MarketingConsents: {
    AcceptedPrivatePolicyAndRegulation: boolean;
    InformationClausule: boolean;
    LaunchTask: boolean;
    MarketingDataProcessing: boolean;
    MarketingDataRecieving: boolean;
  };

  AllowedUsers: TrainerAllowedUser[];
}

export interface PlayerProfileDetailInterface {
  LastName: string;
  IsProfilePrivate: boolean;
  Id: string;
  Gender: number;
  FtpPhotoFilePath: string;
  LastChangedMedicalCard: string;
  FirstName: string;
  Birthdate: string;
  IsActivated: boolean;
  IsBanned: boolean;
  MedicalCards: MedicalCard[];
  Subscriptions: Subscription[];
  OwnerId: string;
  TrainerRelations: TrainerRelation[];
  AcademyRelations: AcademyRelation[];
  AllowedUsers: AllowedUser[];

  Contact: {
    Email: string;
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
  };

  Address: {
    BuildingNumber: string;
    City: string;
    Country: number;
    FlatNumber: string;
    PostCode: string;
    Region: string;
    Street: string;
  };

  Device: {
    Uuid: string;
    DeviceName: string;
    ConnectedDate: string;
  };
}

export interface TrainerProfileDetailInterface {
  LastName: string;
  FirstName: string;
  Id: string;
  Email: string;
  PhoneNumber: string;
}

export interface PlayerProfileInterface {
  Id: string;
  IsProfilePrivate: boolean;
  Name: string;
  Email: string;
  Type: number;
  Associated: boolean;
  FtpPhotoFilePath: string;
  IsActivated: boolean;
}

interface DeliveryHistory {
  Description: string;
  State: number;
  Updated: string;
  Employee: string;
}

interface AttributeValue {
  AttributeId: string;
  AttributeName: string;
  Value: string;
  ValueName: string;
}

interface ItemOrder {
  EAN: string;
  ItemId: string;
  Name: string;
  ProductId: string;
  Quantity: number;
  TotalTax: number;
  CurrentPrice: number;
  CombinationId: string;
  FtpPhotoFilePath: string;
  Combination: {
    AttributeValues: AttributeValue[];
  };
}

interface RefundCombination {
  CombinationId: string;
  ProductId: string;
  Netto: number;
  Tax: number;
  Gross: number;
  EAN: string;
  Amount: number;
  AttributeValues: AttributeValue;
}

interface RefundOrder {
  ItemId: string;
  Reasone: string;
  Quantity: number;
  TotalTax: number;
  CurrentPrice: number;
  Created: string;
  Status: number;
  Combination: {
    ItemId: string;
    Name: string;
    EAN: string;
    Quantity: number;
    FtpPhotoFilePath: string;
    CurrentPrice: number;
    CombinationId: string;
    TotalTax: number;
    ProductId: string;
    Combination: RefundCombination;
  };
}

interface OrderDocument {
  Added: string;
  FtpFilePath: string;
  Name: string;
  OrderFileId: string;
}

export interface OrderInterface {
  Id: string;
  TotalTax: number;
  Created: string;
  Payment: number;
  Numer: string;
  DeliveryHistories: DeliveryHistory[];
  Items: ItemOrder[];
  Refunds: RefundOrder[];
  DeliveryName: string;

  Documents: OrderDocument[];

  Address: {
    BuildingNumber: string;
    City: string;
    Country: number;
    FlatNumber: string;
    PostCode: string;
    Region: string;
    Street: string;
    TrackingNumer: {
      TrackingNumer: string;
      Link: string;
    };
  };

  User: {
    Email: string;
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
  };

  Delivery: {
    DeliveryId: string;
    Name: string;
    Description: string;
    Deadline: number;
    Gross: number;
    Tax: number;
    AreaOfActivity: number;
    OnPrice: number;
    Netto: number;
    IsActivate: boolean;
  };
}

export interface AcademyInterface {
  Name: string;
  Country: number;
  Region: string;
  City: string;
  Street: string;
  BuildingNumber: string;
  FlatNumber: string;
  PostCode: string;
  IsVerified: boolean;
  FtpFilePath: string;
  NIP: string;
  PhoneNumber: string;
  Email: string;
  Type: number;
  Id: string;
}

export interface DeliveryInterface {
  Id: string;
  Name: string;
  AreaOfActivity: number;
  Deadline: number;
  Description: string;
  Netto: number;
  OnPrice: number;
  Tax: number;
  Gross: number;
  FtpPhotoFilePath: string | null;
}

export interface IUserManagement extends IUserManagementEditData {
  isActive: boolean;
}

export interface IUser extends IUserManagement {
  fullName: string;
  userName: string;
  storeId: string;
  permissions: Array<number>;
  role: number;
}

export interface IUserContact {
  email: string;
  firstName: string;
  fullName: string;
  lastName: string;
  phoneNumber: string;
  position: string;
}

export interface ITokenUser {
  Email: string;
  FirstName: string;
  LastName: string;
  UserId: string;
  ROLE: number;
}

export interface IRegisterDTO {
  Email: string;
  FirstName: string;
  LastName: string;
  Password: string;
  ReplyPassword: string;
  FtpPhotoFilePath: string;
  Theme: number;
  Profile: number;
}

export interface IChangePasswordValues {
  currentPassword: string;
  newPassword: string;
  newPasswordCopy: string;
}

export const UserLabels = {
  email: "e-mail",
  firstName: "imię",
  fullName: "imię i nazwisko",
  lastName: "nazwisko",
  phoneNumber: "numer telefonu",
  position: "stanowisko",
  userName: "login",
};
