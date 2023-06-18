import TabContent from "components/common/tabs/TabContent";
import DetailTable from "../../DetailTable";
import PlayerProfilesDetailTable from "../../PlayerProfileDetailTable";
import TrainerProfilesDetailTable from "../../TrainerProfileDetailTable";

interface Profile {
  Access: number;
  FtpPhotoFilePath: string;
  Id: string;
  Name: string;
  Type: number;
}

const RelatedProfilesTab = (user: any) => {
  const accessSwitch = (access: number) => {
    switch (access) {
      case 0:
        return "Administrator";
      case 1:
        return "Użytkownik";

      default:
        return access;
    }
  };

  const { AllowedPlayerProfiles, AllowedTrainerProfiles } = user.user.user;

  return (
    <TabContent id="relatedProfiles">
      <div className="flex flex-col lg:flex-row gap-16 mx-auto w-full">
        {/* @ts-ignore */}
        <PlayerProfilesDetailTable
          label="Profile zawodników"
          items={AllowedPlayerProfiles.map((profile: Profile) => ({
            label: profile.Name,
            value: accessSwitch(profile.Access),
            id: profile.Id,
          }))}
        />
        <TrainerProfilesDetailTable
          label="Profile Trenerów"
          items={AllowedTrainerProfiles.map((profile: Profile) => ({
            label: profile.Name,
            value: accessSwitch(profile.Access),
            id: profile.Id,
          }))}
        />
      </div>
    </TabContent>
  );
};

export default RelatedProfilesTab;
