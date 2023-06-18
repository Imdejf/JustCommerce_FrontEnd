import React from "react";
import { Container } from "./style";
import xIco from "../../../assets/icons/xIco.svg";
import filesService from "services/filesService";
import { toast } from "react-toastify";

interface Props {
  name: string;
  fileName: string;
  category: string;
  ftpFilePath: string;
  id: string;
}

export const SingleFile: React.FC<Props> = ({
  name,
  fileName,
  category,
  ftpFilePath,
  id,
}) => {
  const handleClick = async (id: string) => {
    await filesService.remove(id);
    toast.success("Usunięto plik!");
    window.location.reload();
  };

  return (
    <Container>
      <td>{name}</td>
      <td>{fileName}</td>
      <td>{category}</td>
      <td>
        <a href={ftpFilePath} rel="noreferrer" download target="_blank">
          Pobierz
        </a>
      </td>
      <td>
        <img onClick={() => handleClick(id)} src={xIco} alt="delete" />
      </td>
    </Container>
  );
};

export default SingleFile;
