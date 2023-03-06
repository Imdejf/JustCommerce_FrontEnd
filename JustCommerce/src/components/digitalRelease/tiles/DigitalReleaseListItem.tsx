import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { IDigitalRelease, Product } from "types/digitalReleaseTypes";
import logo from "../../../assets/images/logo.svg";
import Placeholder from "assets/images/placeholder.png";

interface IDigitalReleaseListItemProps {
  product: Product;
  innerRef?: any;
}

const DigitalReleaseListItem: React.FC<IDigitalReleaseListItemProps> = ({
  product,
  innerRef,
}) => {
  const { t } = useTranslation();

  const typeSwitch = (type: number) => {
    switch (type) {
      case 1:
        return "produkt";
      case 2:
        return "usługa";
      case 3:
        return "licencja";
      default:
        return type;
    }
  };

  return (
    <Link
      to={`/shop/products/detail/${product.ProductId}`}
      ref={innerRef}
      className="flex flex-col rounded bg-opacity-50 bg-white py-12 px-18 text-sm leading-relaxed hover:bg-opacity-90 relative"
    >
      <div className="text-base font-medium opacity-80 p-4">{product.Name}</div>

      <div className="flex py-4 px-12">
        <div className="flex flex-col flex-grow ">
          <div className="tileInfo">
            <div className="my-1">
              <span className="tileInfo__label">{"Nazwa"}</span>
              <span>{product.Name}</span>
            </div>

            <div className="my-1">
              <span className="tileInfo__label">{"Kategoria"}</span>
              <span>{product.CategoryName}</span>
            </div>

            <div className="my-1">
              <span className="tileInfo__label">{"Typ produktu"}</span>
              <span>{typeSwitch(product.Type)}</span>
            </div>

            <div className="my-1">
              <span className="tileInfo__label">{"EAN"}</span>
              <span>{product.EAN}</span>
            </div>

            <div className="my-1">
              <span className="tileInfo__label">{"Zapas"}</span>
              <span>{product.TotalAmount}</span>
            </div>

            <div className="my-1">
              {/* <span className='tileInfo__label'>{DigitalReleaseLabels.lastName}</span>
              <span>{DigitalRelease.contactLastName}</span> */}
            </div>
          </div>
        </div>

        <div
          className="w-28 h-28 shadow-md"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <img
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
            }}
            src={
              product.FtpBannerPhotoFilePath
                ? product.FtpBannerPhotoFilePath
                : logo
            }
            alt=""
          />
        </div>
      </div>
    </Link>
  );
};

export default DigitalReleaseListItem;
