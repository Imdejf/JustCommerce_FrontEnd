import artistMessages from "components/artists/artistMessages";
import digitalReleaseMessages from "components/digitalRelease/utils/messages";
// import providerMessages from "components/providers/providerMessages";
import trackMessages from "components/tracks/utils/trackMessages";

import commonMessages from "./messages/common";
import permissionsMessages from "./messages/permissions";
import validationMessages from "./messages/validation";

const dictionary = {
  ...commonMessages.en,
  artist: {
    ...artistMessages.en,
  },
  digitalRelease: { ...digitalReleaseMessages.en },
  permissions: { ...permissionsMessages.en },
  // provider: { ...providerMessages.en },
  track: { ...trackMessages.en },
  validation: { ...validationMessages.en },
};

export default dictionary;
