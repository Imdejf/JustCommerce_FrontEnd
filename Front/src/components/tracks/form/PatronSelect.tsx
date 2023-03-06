import React, { useEffect, useState } from "react";

import { ISelectOption } from "components/common/inputs/inputTypes";
import SelectInput from "components/common/inputs/select/Select";

import licensorsService from "services/licensorServices";
import { LicensorLabels } from "types/licensorTypes";
import { showServerErrors } from "utils/errorsUtils";

interface Props {
  defaultValue: string;
}

const PatronSelect: React.FC<Props> = ({ defaultValue }) => {
  const [patronOptions, setPatronOptions] = useState<Array<ISelectOption>>([
    { value: null, label: "" },
  ]);

  useEffect(() => {
    const getPatrons = async () => {
      try {
        const patrons = await licensorsService.getPartons();
        const options = patrons.map((patron) => ({
          label: patron.userName,
          value: patron.id,
        }));

        setPatronOptions(options);
      } catch (errors: any) {
        showServerErrors(errors);
      }
    };

    getPatrons();
  }, []);

  return (
    <SelectInput
      name="patron"
      label={LicensorLabels.patron}
      items={patronOptions}
      defaultValue={defaultValue}
    />
  );
};

export default PatronSelect;
