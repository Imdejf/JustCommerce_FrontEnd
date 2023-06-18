import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { showServerErrors } from "utils/errorsUtils";
import AttributeGroupServices from "services/Attribute/attributeGroupServices"
import {AttributeGroupInterface} from "../../../../types/Attribute/attributeGroupTypes"
import ContentContainer from "../../../layout/ContentContainer";
import ProductAttributeGroupDetailTopBar from "./ProductAttributeGroupDetailTopBar";
import InfoBox from "../../../common/boxes/InfoBox/InfoBox";
import InfoBoxPlaceholder from "../../../common/boxes/InfoBox/InfoBoxPlaceholder";

const ProductAttributeGroupDetail: React.FC = () => {
    const [attributeGroup, setAttributeGroup] = 
        useState<AttributeGroupInterface | null>(null)
    const { id } = useParams<{ id: string, storeId: string }>();

    useEffect(() => {
        AttributeGroupServices
          .getById(id)
          .then((attributeGroupData) => {
            // @ts-ignore
            setAttributeGroup(attributeGroupData);
          })
          .catch((errors) => {
            showServerErrors(errors);
          });
      }, [id]);
    
      if (!attributeGroup) {
        return <InfoBoxPlaceholder />;
      }

      return (
        <ContentContainer
        title={`${attributeGroup?.name}`}
        TopBar={
            <ProductAttributeGroupDetailTopBar
            attributeGroup={attributeGroup}/>
        }
        path="/catalog/product-attribute-group"
        >
            <InfoBox className="bg-white-dirty p-18">
                <InfoBox.Items>
                    <InfoBox.InfoItem label={"Nazwa"} value={`${attributeGroup.name}`} />
                </InfoBox.Items>
            </InfoBox>
        </ContentContainer>
      )
}

export default ProductAttributeGroupDetail