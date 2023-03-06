import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

import SubmitButton from "../../common/buttons/submitButton/SubmitButton";
import SelectInput from "../../common/inputs/select/Select";

import permissionService from "../../../services/permissionServices";
import { useProfiles } from "../../../hooks/useProfiles";
import { ButtonVariant } from "../../common/buttons/buttonTypes";
import SelectProfiles from "components/common/inputs/select/SelectProfiles";

type Props = {
  userId: string;
};

const initValues = {
  profile: 0,
};

const AssignToProfileSelect: React.FC<Props> = ({
  userId,
  //@ts-ignore
  profiles,
  //@ts-ignore
  selectedItem,
  //@ts-ignore
  setSelectedItem,
}) => {
  const { selectOptions } = useProfiles();

  const { go } = useHistory();

  const handleSubmit = async ({ profile }: typeof initValues) => {
    try {
      await permissionService.assignToProfile(userId, profile);
      const profileName = selectOptions.find(
        (select) => select.value === profile
      )?.label;
      toast.success(`Przypisano do roli ${profileName}`);
      go(0);
    } catch (errors: any) {
      toast.error("Błąd: " + errors.join(" | "));
    }
  };

  return (
    <Formik initialValues={initValues} onSubmit={handleSubmit}>
      {({ values, isSubmitting }) => (
        <Form className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 pb-12 px-24 my-4 border-b">
          {/* <SelectInput
            style={{ minWidth: '25ch' }}
            showErrors={false}
            defaultValue={values.profile}
            items={selectOptions}
            label='Profil'
            name='profile'
          /> */}
          <SelectProfiles
            name="Profile"
            items={profiles}
            label="Profil"
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            // defaultValue={values.profile}
          />
          <SubmitButton
            disabled={values.profile === 0}
            isSubmitting={isSubmitting}
            className="px-18 mb-2 text-sm"
            variant={ButtonVariant.Normal}
          >
            Kopiuj uprawnienia
          </SubmitButton>
        </Form>
      )}
    </Formik>
  );
};

export default AssignToProfileSelect;
