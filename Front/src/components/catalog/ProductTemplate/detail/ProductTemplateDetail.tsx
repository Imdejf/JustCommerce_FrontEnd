import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { showServerErrors } from "utils/errorsUtils";
import productTemplateServices from "services/ProductTemplate/productTemplateServices"
import ContentContainer from "../../../layout/ContentContainer";
import ProductTemplateDetailTopBar from "./ProductTemplateDetailTopBar";
import InfoBox from "../../../common/boxes/InfoBox/InfoBox";
import InfoBoxPlaceholder from "../../../common/boxes/InfoBox/InfoBoxPlaceholder";
import { ProductTemplateInterface } from "types/ProductTemplate/productTemplateTypes";

const ProductTemplateDetail: React.FC = () => {
    const [productTemplate, setProductTemplate] = 
        useState<ProductTemplateInterface | null>(null)
    const { id } = useParams<{ id: string, storeId: string }>();

    useEffect(() => {
        productTemplateServices
          .getById(id)
          .then((productTemplateData) => {
            // @ts-ignore
            setProductTemplate(productTemplateData);
          })
          .catch((errors) => {
            showServerErrors(errors);
          });
      }, [id]);
    
      if (!productTemplate) {
        return <InfoBoxPlaceholder />;
      }

      return (
        <ContentContainer
        title={`${productTemplate?.name}`}
        TopBar={
            <ProductTemplateDetailTopBar
            productTemplate={productTemplate}/>
        }
        path="/catalog/product-template"
        >
            <InfoBox className="bg-white-dirty p-18">
                <InfoBox.Items>
                    <InfoBox.InfoItem label={"Nazwa"} value={`${productTemplate.name}`} />
                </InfoBox.Items>
            </InfoBox>
        </ContentContainer>
      )
}

export default ProductTemplateDetail