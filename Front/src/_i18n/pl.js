import artistMessages from "components/artists/artistMessages";
import digitalReleaseMessages from "components/digitalRelease/utils/messages";
// import providerMessages from "components/providers/providerMessages";
import trackMessages from "components/tracks/utils/trackMessages";

import commonMessages from "./messages/common";
import permissionsMessages from "./messages/permissions";
import validationMessages from "./messages/validation";

const dictionary = {
  ...commonMessages.pl,
  artist: {
    ...artistMessages.pl,
  },
  digitalRelease: { ...digitalReleaseMessages.pl },
  permissions: { ...permissionsMessages.pl },
  // provider: { ...providerMessages.pl },
  track: { ...trackMessages.pl },
  validation: { ...validationMessages.pl },
};
export default dictionary;
