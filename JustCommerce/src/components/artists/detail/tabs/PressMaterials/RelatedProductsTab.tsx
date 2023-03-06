import TabContent from "components/common/tabs/TabContent";
import DetailTable from "../../DetailTable";

const RelatedProductsTab = () => {
  return (
    <TabContent id="relatedProducts">
      <div className="flex flex-col lg:flex-row gap-16 mx-auto w-full">
        <DetailTable
          label="Wydania"
          items={Array.from({ length: 4 }).map(() => ({
            label: "Tytuł",
            value: "EAN/ISRC",
          }))}
        />
        <DetailTable
          label="Wydania"
          items={Array.from({ length: 4 }).map(() => ({
            label: "Tytuł",
            value: "EAN/ISRC",
          }))}
        />
      </div>
    </TabContent>
  );
};

export default RelatedProductsTab;
