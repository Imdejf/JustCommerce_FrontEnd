import React from "react";

import Button from "../common/buttons/basicButton/Button";
import InfoBox from "../common/boxes/InfoBox/InfoBox";
import Badge, { BagdeVariant } from "../common/bagdes/Badge";

import Placeholder from "../../assets/images/placeholder.png";

interface IProductsProps {}

const mockProduct = {
  title: { label: "Tytuł", value: "Tytuł" },
  version: { label: "Wersja", value: "Wersja" },
  genre: { label: "Gatunek", value: "Gatunek" },
  lang: { label: "Język", value: "Język" },
  ISRC: { label: "ISRC", value: "PLH181600668" },
  P: { label: `(P))`, value: `Stick's Music` },
  C: { label: "(C)", value: "Po prostu BojsBend" },
  metaLang: { label: "Język metadanych", value: "Meta język" },
  relaseDate: { label: "Data wydania", value: "2020.02.02" },
  keeper: { label: "Opiekun", value: "Opiekun" },
  spotifyId: { label: "Spotify ID", value: "Spotify ID" },
  censorship: { label: "Cenzuralność utworu", value: "Not_Explicit" },
};

const Products: React.FC<IProductsProps> = () => {
  return (
    <div>
      <div className="flex justify-end items-center gap-8 py-12 ">
        <h4 className="opacity-50 text-lg font-semibold">
          Wydania - Detal produktu
        </h4>
      </div>
      <InfoBox>
        <InfoBox.Image src={Placeholder} />

        <InfoBox.Items>
          <InfoBox.InfoItem
            label={mockProduct.title.label}
            value={mockProduct.title.value}
          />
          <InfoBox.InfoItem
            label={mockProduct.version.label}
            value={mockProduct.version.value}
          />
          <InfoBox.InfoItem
            label={mockProduct.genre.label}
            value={mockProduct.genre.value}
          />
          <InfoBox.InfoItem
            label={mockProduct.lang.label}
            value={mockProduct.lang.value}
          />

          <InfoBox.LinkItem
            label={mockProduct.ISRC.label}
            value={mockProduct.ISRC.value}
            href="/oiid"
          />
          <InfoBox.LinkItem
            label={mockProduct.P.label}
            value={mockProduct.P.value}
            href="/asd"
          />
          <InfoBox.LinkItem
            label={mockProduct.C.label}
            value={mockProduct.C.value}
            href="#"
          />
          <InfoBox.LinkItem
            label={mockProduct.metaLang.label}
            value={mockProduct.metaLang.value}
            href="#"
          />

          <InfoBox.InfoItem
            label={mockProduct.relaseDate.label}
            value={mockProduct.relaseDate.value}
          />
          <InfoBox.InfoItem
            label={mockProduct.keeper.label}
            value={mockProduct.keeper.value}
          />
          <InfoBox.InfoItem
            label={mockProduct.spotifyId.label}
            value={mockProduct.spotifyId.value}
          />
          <InfoBox.InfoItem
            label={mockProduct.censorship.label}
            value={mockProduct.censorship.value}
          />
        </InfoBox.Items>
        <div className="flex md:flex-col md:w-32 md:justify-end gap-1">
          <Button className="flex-1 md:flex-grow-0 mb-auto">Edytuj</Button>
          <div className="flex md:flex-col flex-grow md:flex-grow-0 gap-1">
            <Badge>Muzyka</Badge>
            <Badge>Audio</Badge>
            <Badge>Single</Badge>
            <Badge variant={BagdeVariant.Success}>W uzytku</Badge>
          </div>
        </div>
      </InfoBox>
    </div>
  );
};

export default Products;
