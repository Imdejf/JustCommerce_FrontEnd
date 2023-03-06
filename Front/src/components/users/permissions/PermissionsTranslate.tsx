export const translateDomainNames = (englishDomainName: string) => {
  switch (englishDomainName) {
    case "AcademyFeatures":
      return "Akademia";

    case "ApplicationUser":
      return "Konta użytkowników";

    case "Combinations":
      return "Kombinacje";

    case "CouponFeatures":
      return "Kupon";

    case "Deliveries":
      return "Dostawy";

    case "Files":
      return "Pliki";

    case "FilesCategory":
      return "Kategorie plików";

    case "Identity":
      return "Zarządzanie";

    case "InvoiceFeatures":
      return "Faktury";

    case "OrderFeatures":
      return "Zamówienia";

    case "Permission":
      return "Uprawnienia";

    case "PlayerCardFeatures":
      return "Karta zawodnika";

    case "PlayerProfileFeatures":
      return "Profil zawodnika";

    case "Product":
      return "Produkty";

    case "TrainerProfileFeatures":
      return "Profil trenera";

    default:
      return englishDomainName;
  }
};

export const translateFlagNames = (englishFlagName: string) => {
  switch (englishFlagName) {
    //AKADEMIE
    case "CreateAcademy":
      return "Tworzenie akademii";

    case "DeleteAcademy":
      return "Usuwanie akademii";

    case "UpdateAcademy":
      return "Aktualizacja akademii";

    case "VerifyAcademy":
      return "Weryfikacja akademii";

    //KONTA UŻYTKOWNIKÓW

    case "ActivateApplicationUser":
      return "Aktywacja użytkownika";

    case "CreateApplicationUser":
      return "Tworzenie użytkownika";

    case "DeactivateApplicationUser":
      return "Dezaktywacja użytkownika";

    case "DeleteApplicationUser":
      return "Usuwanie użytkownika";

    case "UpdateApplicationUser":
      return "Aktualizacja użytkownika";

    //KOMBINACJE

    case "CreateCombination":
      return "Tworzenie kombinacji";

    case "DeleteCombination":
      return "Usuwanie kombinacji";

    case "UpdateCombination":
      return "Aktualizacja kombinacji";

    case "UpdatePrice":
      return "Aktualizacja cen";

    //KUPON

    case "CreateCoupon":
      return "Tworzenie kuponu";

    case "DeleteCoupon":
      return "Usuwanie kuponu";

    case "UpdateCoupon":
      return "Aktualizacja kuponu";

    //DOSTAWY

    case "ActivateDelivery":
      return "Aktywacja dostawy";

    case "CreateDelivery":
      return "Tworzenie dostawy";

    case "DeactivateDelivery":
      return "Dezaktywowanie dostawy";

    case "DeleteDelivery":
      return "Usuwanie dostawy";

    case "GrantDelivery":
      return "Nadawanie dostawy";

    case "RevokeDelivery":
      return "Odbieranie dostawy";

    case "UpdateDelivery":
      return "Aktualizacja dostawy";

    //PLIKI

    case "CreateFile":
      return "Tworzenie plików";

    case "DeleteFile":
      return "Usuwanie plików";

    case "UpdateFile":
      return "Aktualizacja plików";

    //KATEGORIE PLIKÓW

    case "CreateFileCategory":
      return "Tworzenie kategorii plików";

    case "RemoveFileCategory":
      return "Usuwanie kategorii plików";

    case "UpdateFileCategory":
      return "Aktualizacja kategorii plików";

    //ZARZĄDZANIE

    case "ActivateUser":
      return "Aktywacja pracownika";

    case "ChangePassword":
      return "Zmiana hasła";

    case "DeactivateUser":
      return "Dezaktywacja pracownika";

    case "DeleteUser":
      return "Usuwanie pracownika";

    case "Register":
      return "Tworzenie konta";

    case "ResetPassword":
      return "Resetowanie hasła";

    case "UpdateUser":
      return "Aktualizacja pracownika";

    //FAKTURY

    case "CreateInvoice":
      return "Tworzenie faktury";

    case "DeleteInvoice":
      return "Usuwanie faktury";

    case "UpdateInvoice":
      return "Aktualizacja faktury";

    //ZAMÓWIENIA

    case "AddDocumentToOrder":
      return "Dodawanie dokumentu do zamówienia";

    case "AddTrakingNumber":
      return "Dodawanie numeru trackingu";

    case "ChangeOrderDeliveryState":
      return "Zmiana dostawy zamówienia";

    case "DeleteDocumentFromOrder":
      return "Usuwanie dokumentów z zamówienia";

    case "DeleteOrderDeliveryState":
      return "Usuwanie dostawy z zamówienia";

    case "UpdateOrderDeliveryAddress":
      return "Aktualizacja dostawy w zamówieniu";

    case "UpdateOrderFiles":
      return "Aktualizacja plików w zamówieniu";

    case "UpdateRefundStatus":
      return "Aktualizacja statusu zwrotów";

    //UPRAWNIENIA

    case "GrantPermissionForUser":
      return "Nadawanie uprawnień dla użytkownika";

    case "GrantProfilePermissionToUser":
      return "Nadawanie użytkownikowi uprawnienia profili";

    case "RevokePermissionFromUser":
      return "Odbieranie uprawnienia od użytkownika";

    //KARTA ZAWODNIKA

    case "CreateHistory":
      return "Tworzenie historii";

    case "DeleteHistory":
      return "Usuwanie historii";

    case "UpdateHistory":
      return "Aktualizacja historii";

    //PROFIL ZAWODNIKA

    case "BanPlayerProfile":
      return "Zablokowanie profilu";

    case "CreatePlayerProfile":
      return "Tworzenie profilu";

    case "DeletePlayerProfile":
      return "Usuwanie profilu";

    case "DeleteSubscription":
      return "Usuwanie subskrypcji";

    case "RenewSubscription":
      return "Odnowienie subskrypcji";

    case "UnbanPlayerProfile":
      return "Odblokowywanie profilu";

    case "UpdatePlayerProfile":
      return "Aktualizacja profilu";

    //PRODUKTY

    case "AddDocumentToProduct":
      return "Dodawanie dokumentów do produktów";

    case "CreateProduct":
      return "Tworzenie produktów";

    case "DeleteDocumentToProduct":
      return "Usuwanie dokumentów z produktu";

    case "DeleteProduct":
      return "Usuwanie produktów";

    case "RemoveDocumentFromProduct":
      return "Usuwanie dokumentów z produktów";

    case "UpdateDescription":
      return "Aktualizacja opisu produktów";

    case "UpdateProduct":
      return "Aktualizacja produktów";

    case "UpdateProductFiles":
      return "Aktualizacja plików produktów";

    //PROFIL TRENERA

    case "CreateTrainerProfile":
      return "Tworzenie profilu";

    case "DeleteTrainerProfile":
      return "Usuwanie profilu";

    case "UpdateTrainerProfile":
      return "Aktualizacja profilu";

    default:
      return englishFlagName;
  }
};
