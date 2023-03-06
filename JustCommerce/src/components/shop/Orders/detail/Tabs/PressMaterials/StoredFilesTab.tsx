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
import productServices from "../../../../../../services/productServices";
import orderServices from "../../../../../../services/orderServices";
import axios from "axios";
import { OrderInterface } from "types/userTypes";

type FormValues = {
  newFile: null | IFile;
};

interface Props {
  order: OrderInterface;
  refreshOrder: any;
}

const StoredFilesTab: React.FC<Props> = ({ order, refreshOrder }) => {
  const [availableDocuments, setAvailableDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState({
    id: "",
    name: "",
  });
  const { id } = useParams<{ id: string }>();

  const getAvailableDocument = async () => {
    try {
      const response = await orderServices.getAllAvailableDocument(id);

      // @ts-ignore
      setAvailableDocuments(response);
    } catch (error: any) {
      showServerErrors(error);
    }
  };

  useEffect(() => {
    getAvailableDocument();
  }, []);

  const handleDocumentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // setSelectedDocument({id:e.target.value});
    // @ts-ignore
    setSelectedDocument(JSON.parse(e.target.value));
  };

  const removeFile = async (DocumentId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete("https://adminapi.justwin.pl/api/Order/Document", {
        headers: {
          Authorization: `bearer ${token}`,
        },
        data: {
          OrderId: id,
          DocumentId,
        },
      });
      refreshOrder();

      toast.success("Usunięto dokument!");
    } catch (error: any) {
      showServerErrors(error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!selectedDocument.id) return toast.error("Wybierz dokument!");
      await orderServices.addDocument(
        order.Id,
        selectedDocument.id,
        selectedDocument.name,
      );
      refreshOrder();

      toast.success("Dodano dokument!");
    } catch (error: any) {
      showServerErrors(error);
    }
  };

  const sendAllDocuments = async () => {
    try {
      await orderServices.addAllDocuments(order.Id);
      refreshOrder();

      toast.success("Dodano wszystkie dokumenty!");
    } catch (error: any) {
      showServerErrors(error);
    }
  };

  return (
    <TabContent id="documents">
      <div className="flex items-start gap-2">
        <div className="flex-1">
          {/* @ts-ignore */}
          {availableDocuments.length === 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "white",
                borderRadius: "5px",
                padding: "0 10px",
                width: "100%",
                height: "40px",
                marginBottom: "10px",
              }}
            >
              Brak dokumentów
            </div>
          )}

          {availableDocuments.length > 0 && (
            <select
              style={{
                borderRadius: "5px",
                padding: "0 10px",
                width: "100%",
                height: "40px",
                marginBottom: "10px",
              }}
              name=""
              id=""
              onChange={handleDocumentChange}
            >
              <option selected hidden disabled>
                Wybierz dokument
              </option>
              {availableDocuments.map((singleDocument) => {
                const { FtpFilePath, Id, Name } = singleDocument;
                // @ts-ignore
                return (
                  <option value={JSON.stringify({ id: Id, name: Name })}>
                    {Name}
                  </option>
                );
              })}
            </select>
          )}
        </div>

        {availableDocuments.length > 1 && order.Documents.length === 0 && (
          <Button
            className="py-8 px-12 group"
            style={{ height: "40px" }}
            onClick={() => sendAllDocuments()}
          >
            Wyślij wszystkie dokumenty
          </Button>
        )}

        <Button
          className="py-8 px-12 group"
          disabled={!selectedDocument.id}
          onClick={() => handleSubmit()}
        >
          <SaveIco className="w-5 opacity-70 group-hover:opacity-100 transition-opacity duration-100" />
        </Button>
      </div>
      <Table
        headers={[
          { key: "name", label: "Nazwa pliku", sortable: false },
          { key: "action", label: "Akcja" },
        ]}
        rows={order.Documents.map((document) => ({
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
                    onClick={() => removeFile(document.OrderFileId)}
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
