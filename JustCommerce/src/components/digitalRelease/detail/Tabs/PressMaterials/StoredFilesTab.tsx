import { useCallback, useEffect, useState } from "react";
import { FormikHelpers, useFormik } from "formik";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import * as Yup from "yup";

import Button from "components/common/buttons/basicButton/Button";
import FileInput from "components/common/inputs/FileInput/FileInput";
import TabContent from "components/common/tabs/TabContent";
import Table from "components/common/table/Table";

import { ReactComponent as SaveIco } from "assets/icons/save.svg";
import { ReactComponent as DeleteIco } from "assets/icons/delete.svg";
import { ReactComponent as FileIco } from "assets/icons/filesIco.svg";

import artistsService from "services/artistServices";
import { showServerErrors } from "utils/errorsUtils";
import { validateFile } from "utils/validation";
import { IFile } from "types/globalTypes";
import { ArtistStoredFile } from "types/artistTypes";
import { Product } from "types/digitalReleaseTypes";
import productServices from "../../../../../services/productServices";
import axios from "axios";

type FormValues = {
  newFile: null | IFile;
};

interface Props {
  product: Product;
  refreshProduct: any;
}

const StoredFilesTab: React.FC<Props> = ({ product, refreshProduct }) => {
  const [storedFiles, setStoredFiles] = useState<ArtistStoredFile[]>([]);
  const { id } = useParams<{ id: string }>();

  const fetchStoredFiles = useCallback(async () => {
    const response = await artistsService.getStoredFiles(id);
    setStoredFiles(response);
  }, [id]);

  useEffect(() => {
    fetchStoredFiles();
  }, [fetchStoredFiles]);

  const removeFile = async (DocumentId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete("https://adminapi.justwin.pl/api/product/Documents", {
        headers: {
          Authorization: `bearer ${token}`,
        },
        data: {
          DocumentId,
        },
      });
      refreshProduct();
      setStoredFiles((prev) =>
        prev.filter((document) => document.id !== DocumentId),
      );
      toast.success("Usunięto plik");
    } catch (error: any) {
      showServerErrors(error);
    }
  };

  const handleSubmit = async (
    { newFile }: FormValues,
    { resetForm }: FormikHelpers<FormValues>,
  ) => {
    try {
      if (!newFile) return;
      const response = await productServices.addDocument(
        product.ProductId,
        newFile?.file.name,
        newFile?.base64String,
      );
      refreshProduct();
      setStoredFiles((prev) => [...prev, response]);
      resetForm();
      toast.success("Dodano plik!");
    } catch (error: any) {
      showServerErrors(error);
    }
  };

  const formik = useFormik<FormValues>({
    initialValues: { newFile: null },
    onSubmit: handleSubmit,
  });

  return (
    <TabContent id="storedFiles">
      <div className="flex items-start gap-2">
        <div className="flex-1">
          <FileInput
            label="Dodaj nowy plik"
            name="newFile"
            onChange={formik.handleChange}
            value={formik.values.newFile}
          />
        </div>
        <Button
          className="py-8 px-12 group"
          disabled={!formik.values.newFile}
          onClick={() => formik.handleSubmit()}
        >
          <SaveIco className="w-5 opacity-70 group-hover:opacity-100 transition-opacity duration-100" />
        </Button>
      </div>
      <Table
        headers={[
          { key: "name", label: "Nazwa pliku", sortable: false },
          { key: "action", label: "Akcja" },
        ]}
        rows={product.Documents.map((document) => ({
          cols: [
            { key: "name", content: document.Name, title: document.Name },
            {
              key: "action",
              content: (
                <div className="flex gap-x-6 justify-center">
                  <button
                    title="download"
                    className="opacity-70 transition-colors duration-150 hover:text-green"
                  >
                    <a
                      href={document.FtpFilePath}
                      target="_blank"
                      rel="noreferrer"
                      download={document.Name}
                      className="flex items-center h-full w-full"
                    >
                      <FileIco />
                    </a>
                  </button>
                  <button
                    title="remove"
                    onClick={() => removeFile(document.Id)}
                    className="opacity-70 transition-colors duration-150 hover:text-red"
                  >
                    <DeleteIco className="w-5" />
                  </button>
                </div>
              ),
              title: "",
            },
          ],
        }))}
      />
    </TabContent>
  );
};

export default StoredFilesTab;
