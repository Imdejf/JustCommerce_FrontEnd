import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { ISelectOption } from "components/common/inputs/inputTypes";
import SelectInput from "components/common/inputs/select/Select";

import licensorsService from "services/licensorServices";
import { showServerErrors } from "utils/errorsUtils";

interface Props {
  defaultValue: string;
}

const ProviderSelect: React.FC<Props> = ({ defaultValue }) => {
  const [providerOptions, setProviderOptions] = useState<Array<ISelectOption>>([
    { value: null, label: "" },
  ]);

  const { t } = useTranslation();

  useEffect(() => {
    const getProviders = async () => {
      try {
        const providers = await licensorsService.getPartons();
        const options = providers.map((provider) => ({
          label: provider.userName,
          value: provider.id,
        }));

        setProviderOptions(options);
      } catch (errors: any) {
        showServerErrors(errors);
      }
    };

    getProviders();
  }, []);

  return (
    <SelectInput
      name="provider"
      label={t("labels.label")}
      items={providerOptions}
      defaultValue={defaultValue}
    />
  );
};

export default ProviderSelect;
