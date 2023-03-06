import { IDigitalRelease, Product } from "types/digitalReleaseTypes";

import DigitalReleaseListItem from "./DigitalReleaseListItem";

interface IDigitalReleasesListProps {
  products: Array<Product>;
  isDataLoading: boolean;
  lastItemRef: any;
  containerRef: any;
}

const DigitalReleasesList: React.FC<IDigitalReleasesListProps> = ({
  products,
  isDataLoading,
  lastItemRef,
  containerRef,
}) => {
  return (
    <div
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        gap: "30px",
      }}
      className="flex flex-col md:grid gap-8 px-8 md:px-36 md:py-24"
      ref={containerRef}
    >
      {products.map((product, index) => {
        const isLast = index === products.length - 1;
        return isLast ? (
          <DigitalReleaseListItem
            key={product.ProductId}
            // @ts-ignore
            product={product}
            innerRef={lastItemRef}
          />
        ) : (
          <DigitalReleaseListItem
            key={product.ProductId}
            // @ts-ignore
            product={product}
          />
        );
      })}
      <div>{isDataLoading && "Loading..."} </div>
    </div>
  );
};

export default DigitalReleasesList;
