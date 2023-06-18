import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import SalesChannelForm from "./SalesChannelForm";
import ContentContainer from "../../layout/ContentContainer";

import salesChannelsService from "../../../services/salesChannelServices";
import { getNotEmptyFields } from "../../../utils/objectUtils";
import { showServerErrors } from "../../../utils/errorsUtils";
import { ISalesChannelRequest } from "types/salesChannelTypes";
import { salesChannelToReqestObject } from "utils/salesChannelUtils";

const EditSalesChannel: React.FC = () => {
  const [salesChannel, setSalesChannel] =
    useState<ISalesChannelRequest | null>(null);
  const { goBack } = useHistory();
  const { id } = useParams<{ id: string }>();

  const handleSubmit = async ({
    id,
    ...salesChannel
  }: ISalesChannelRequest) => {
    try {
      const newSalesChannel =
        getNotEmptyFields<ISalesChannelRequest>(salesChannel);
      await salesChannelsService.edit({
        salesChannelId: id,
        ...newSalesChannel,
      });
      toast.success(`Poprawnie edytowano kanał sprzedaży!`);
      goBack();
    } catch (errors: any) {
      showServerErrors(errors);
    }
  };

  useEffect(() => {
    salesChannelsService
      .get(id)
      .then((salesChannelData) => {
        if (salesChannelData) {
          const formatted = salesChannelToReqestObject(salesChannelData);
          setSalesChannel(formatted);
        }
      })
      .catch((errors: any) => {
        showServerErrors(errors);
      });
  }, [id]);

  return (
    salesChannel && (
      <ContentContainer title="Edycja kanału sprzedaży">
        <SalesChannelForm
          salesChannel={salesChannel}
          onSubmit={handleSubmit}
          isEdit={true}
        />
      </ContentContainer>
    )
  );
};

export default EditSalesChannel;
