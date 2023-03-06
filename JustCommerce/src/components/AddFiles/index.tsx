import React, { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import ContentContainer from "../layout/ContentContainer";
import SelectFileCategories from "components/common/inputs/select/SelectFileCategories";
import SubmitButton from "../common/buttons/submitButton/SubmitButton";
import TextField from "../common/inputs/textInput/TextField";
import FormSection from "../common/forms/FormSection";
import { categoryValidationSchema } from "../auth/authHelpers";
import filesService from "services/filesService";
import { showServerErrors } from "../../utils/errorsUtils";
import { useHistory } from "react-router-dom";
import { SelectOptionInterface } from "components/common/inputs/inputTypes";

interface ISelectedFile {
  name: string;
}

export const AddFiles: React.FC = () => {
  const { goBack } = useHistory();
  const [fileCategories, setFileCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState<ISelectedFile | null>(null);
  const [base64, setBase64] = useState("");
  const [selectedItem, setSelectedItem] =
    useState<SelectOptionInterface | null>(null);

  const handleFileSubmit = async (values: string) => {
    if (!selectedItem?.Id || !selectedFile) return;
    try {
      await filesService.addNewFile(
        values,
        selectedItem.Id,
        selectedFile.name.split(".")[0],
        base64,
      );
      toast.success("Dodano nowy plik");
      goBack();
    } catch (errors: any) {
      showServerErrors(errors);
    }
  };

  const handleCategorySubmit = async (values: string) => {
    try {
      await filesService.addNewCategory(values);
      toast.success("Dodano nową kategorie");
      goBack();
    } catch (errors: any) {
      showServerErrors(errors);
    }
  };

  const getAllFileCategories = async () => {
    try {
      const resp = await filesService.getAllCategories();

      //@ts-ignore
      setFileCategories(resp);
    } catch (error) {
      console.log(error);
    }
  };

  function getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          let encoded = reader.result.toString().replace(/^data:(.*,)?/, "");
          if (encoded.length % 4 > 0) {
            encoded += "=".repeat(4 - (encoded.length % 4));
          }
          return setBase64(encoded);
        }
      };
      reader.onerror = (error) => reject(error);
    });
  }

  useEffect(() => {
    getAllFileCategories();
  }, []);

  return (
    <ContentContainer title="Dodaj plik" path="/files">
      <Formik
        initialValues={{
          CategoryId: "",
          Name: "",
          FileName: "",
          File: { Base64String: "" },
        }}
        //@ts-ignore
        onSubmit={handleFileSubmit}
        validationSchema={categoryValidationSchema}
      >
        {({ values, isSubmitting }) => (
          <Form className="flex flex-col gap-x-6 mx-auto  px-24 lg:px-36 pb-36 xl:gap-x-10 bg-white-dirty bg-opacity-70 border-t border-gray border-opacity-40 pt-30">
            <FormSection isDisabled={isSubmitting} label="Dodaj plik">
              <TextField name="Name" label="Nazwa" />
              <SelectFileCategories
                name="CategoryId"
                items={fileCategories}
                label="Kategoria"
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                // defaultValue={values.profile}
              />
              <input
                type="file"
                name="File"
                onChange={(e) => {
                  //@ts-ignore
                  getBase64(e.target.files[0]);
                  //@ts-ignore
                  setSelectedFile(e.target.files[0]);
                }}
              />
            </FormSection>

            <SubmitButton
              isSubmitting={isSubmitting}
              type="submit"
              className="w-80"
            >
              Zapisz
            </SubmitButton>
          </Form>
        )}
      </Formik>
      <Formik
        initialValues={{ Description: "", Position: 0 }}
        //@ts-ignore
        onSubmit={handleCategorySubmit}
        validationSchema={categoryValidationSchema}
      >
        {({ values, isSubmitting }) => (
          <Form className="flex flex-col gap-x-6 mx-auto  px-24 lg:px-36 pb-36 xl:gap-x-10 bg-white-dirty bg-opacity-70 border-t border-gray border-opacity-40 pt-30">
            <FormSection
              isDisabled={isSubmitting}
              label="Dodaj kategorie pliku"
            >
              <TextField name="Name" label="Nazwa kategorii" />
            </FormSection>

            <SubmitButton
              isSubmitting={isSubmitting}
              type="submit"
              className="w-80"
            >
              Zapisz
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </ContentContainer>
  );
};

export default AddFiles;
