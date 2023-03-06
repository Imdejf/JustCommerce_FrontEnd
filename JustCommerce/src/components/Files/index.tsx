import React, { useState, useEffect } from "react";
import { Container } from "./style";
import SingleFile from "./SingleFile";
import useInfiniteScroll from "hooks/useInfiniteScroll";
import filesService from "services/filesService";
import ContentContainer from "../layout/ContentContainer";
import FilesTopBar from "./FilesTopBar";

export const Files: React.FC = () => {
  const [queryString, setQueryString] = useState("");
  const [fileCategories, setFileCategories] = useState([]);

  const {
    items: files,
    loading,
    containerRef,
    lastItemRef,
  } = useInfiniteScroll(filesService.getAll, queryString);

  const getAllFileCategories = async () => {
    try {
      const resp = await filesService.getAllCategories();

      //@ts-ignore
      setFileCategories(resp);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllFileCategories();
  }, []);

  return (
    <>
      <ContentContainer title="Pliki wewnętrzne" TopBar={<FilesTopBar />} />

      <Container className="bg-white-dirty">
        <table>
          <thead>
            <tr>
              <th>Nazwa</th>
              <th>Nazwa pliku</th>
              <th>Kategoria</th>
            </tr>
          </thead>
          <tbody>
            {files &&
              files.map((file) => {
                //@ts-ignore
                const { FileName, Name, FtpFilePath, FileCategoryId, Id } =
                  file;

                const filtered =
                  fileCategories &&
                  fileCategories.filter(
                    //@ts-ignore
                    (category) => category.Id === FileCategoryId
                  );

                return (
                  <SingleFile
                    name={Name}
                    fileName={FileName}
                    //@ts-ignore
                    category={filtered[0] && filtered[0].Name}
                    ftpFilePath={FtpFilePath}
                    id={Id}
                  />
                );
              })}
          </tbody>
        </table>
      </Container>
    </>
  );
};

export default Files;
