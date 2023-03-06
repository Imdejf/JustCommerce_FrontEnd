import { ArtistPropItem } from "types/artistTypes";
import {
  DigitalReleaseRequest,
  IDigitalRelease,
  IAddProduct,
} from "types/digitalReleaseTypes";
import { IListPageRequest, IListPageResponse } from "types/globalTypes";

import { conn } from "../api/BaseConnection";

const endpoint = conn.endpoints.product;
const deliveryEndpoint = conn.endpoints.delivery;

const add = (digitalRelease: IDigitalRelease | any) => {
  return conn.postJSON(endpoint, "json", digitalRelease);
};

const remove = (id: string) => {
  return conn.deleteJSON(`${endpoint}/${id}`);
};

const edit = (digitalRelease: Partial<DigitalReleaseRequest>) => {
  return conn.putJSON(endpoint, "json", digitalRelease);
};

const getAll = (
  pageInfo: IListPageRequest,
): Promise<IListPageResponse<IDigitalRelease>> => {
  return conn.getJSON<IListPageResponse<IDigitalRelease>>(
    endpoint,
    "json",
    pageInfo,
  );
};

const getAttributes = (): Promise<IDigitalRelease> => {
  return conn.getJSON(`${endpoint}/Attribute`, "json");
};

const getCategories = (): Promise<IDigitalRelease> => {
  return conn.getJSON(`${endpoint}/Category`, "json");
};

const getArtists = (): Promise<ArtistPropItem[]> => {
  //TODO: remove formatting from this endpoint after backend is fixed
  return conn
    .getJSON<{ items: ArtistPropItem[] }>(endpoint, "json")
    .then((response) => response.items);
};

const getAllDelivery = (pageInfo: any) => {
  return conn.getJSON(`${deliveryEndpoint}`, "json", { ...pageInfo });
};

const getAllProducts = (pageInfo: any) => {
  return conn.getJSON(`${endpoint}/GetProducts`, "json", { ...pageInfo });
};

const getProduct = (id: string) => {
  return conn.getJSON(`${endpoint}/${id}`, "json");
};

const addProduct = (
  product: IAddProduct | any,
  type: number,
  availableFrom: string,
  availableTo: string,
  base64: string,
  categoryId: string,
) => {
  return conn.postJSON(`${endpoint}/Product`, "json", {
    ...product,
    Type: type,
    AvailableFrom: availableFrom,
    AvailableTo: availableTo,
    CategoryId: categoryId,
    File: {
      Base64String: base64,
    },
  });
};

const removeProduct = (id: string) => {
  return conn.deleteJSON(`${endpoint}/Product/${id}`);
};

const removeDocument = (DocumentId: any) => {
  return conn.deleteJSON(`${endpoint}/Documents`, DocumentId);
};

const editProduct = (
  product: IAddProduct | any,
  type: number,
  availableFrom: string,
  availableTo: string,
  base64: string,
  categoryId: string,
  UpdateCategory: boolean,
  removedFileId?: string,
) => {
  const body = base64
    ? {
        ...product,
        Netto: +product.Netto,
        Type: type,
        AvailableFrom: availableFrom,
        AvailableTo: availableTo,
        NewCategoryId: categoryId,
        UpdateCategory,
        NewBannerFile: {
          Base64String: base64,
        },
        BannerUpdated: true,
      }
    : {
        ...product,
        Type: type,
        AvailableFrom: availableFrom,
        AvailableTo: availableTo,
        NewCategoryId: categoryId,
        UpdateCategory,
      };

  return conn.putJSON(`${endpoint}/Product`, "json", body);
};

const getAllCategories = () => {
  return conn.getJSON(`${endpoint}/Category`, "json");
};

const getCategory = (id: string) => {
  return conn.getJSON(`${endpoint}/Category/${id}`, "json");
};

const getSubCategories = (categoryId: string) => {
  return conn.getJSON(`${endpoint}/SubCategories/${categoryId}`, "json");
};

const updateDescription = (ProductId: string, Description: string) => {
  const body = {
    ProductId,
    Description,
  };

  return conn.putJSON(`${endpoint}/UpdateDescription`, "json", body);
};

const getCategoriesByProductType = (productType: number) => {
  return conn.getJSON(`${endpoint}/GetCategoriesByProductType`, "json", {
    productType,
  });
};

const addProductFiles = (ProductId: string, base64: string) => {
  const body = {
    ProductId,
    RemovedFiles: [],
    AddedFiles: [
      {
        File: {
          Base64String: base64,
        },
        Position: 0,
      },
    ],
  };

  return conn.putJSON(`${endpoint}/UpdateFiles`, "json", body);
};

const addDocument = (ProductId: string, Name: string, base64: string) => {
  const body = {
    ProductId,
    Name,
    File: {
      Base64String: base64,
    },
  };

  return conn.postJSON(`${endpoint}/Documents`, "json", body);
};

const removeProductFiles = (
  ProductId: string,
  removedId: string,
  ftp: string,
) => {
  const body = {
    ProductId,
    RemovedFiles: [{ FileId: removedId, FtpPhotoFilePath: ftp }],
    AddedFiles: [],
  };

  return conn.putJSON(`${endpoint}/UpdateFiles`, "json", body);
};

const getDeliveryByProductType = (productType: number) => {
  return conn.getJSON(`${deliveryEndpoint}/GetAvailableDelivery`, "json", {
    productType,
  });
};

const revokeDelivery = (ProductId: string, DeliveryId: string) => {
  const body = {
    ProductId,
    DeliveryId,
  };

  return conn.postJSON(`${endpoint}/Delivery/Revoke`, "json", body);
};

const deleteCombination = (id: string) => {
  return conn.deleteJSON(`${endpoint}/Combination/${id}`);
};

const grantDelivery = (ProductId: string, DeliveryId: string) => {
  const body = {
    ProductId,
    DeliveryId,
  };

  return conn.postJSON(`${endpoint}/Delivery/Grant`, "json", body);
};

const updatePrice = (CombinationId: string, Netto: number, Tax: number) => {
  const body = {
    CombinationId,
    Netto,
    Tax,
  };

  return conn.putJSON(`${endpoint}/UpdatePrice`, "json", body);
};

const getAttributesByCategoryId = (categoryId: string) => {
  return conn.getJSON(`${endpoint}/Attribute/${categoryId}`, "json");
};

const addCombination = (
  ProductId: string,
  CategoryId: string,
  EAN: string,
  Netto: number,
  Tax: number,
  Amount: number,
  Period: number | null,
  array: any,
) => {
  const body = {
    ProductId,
    CategoryId,
    EAN,
    Netto,
    Tax,
    Amount,
    Period,
    AttributeValues: array,
  };

  return conn.postJSON(`${endpoint}/Combination`, "json", body);
};

const getCombinations = (productId: string) => {
  return conn.getJSON(`${endpoint}/Combination/${productId}`, "json");
};

const editCombination = (
  ProductId: string,
  CategoryId: string,
  CombinationId: string,
  EAN: string,
  Netto: number,
  Tax: number,
  Amount: number,
  Period: number | null,
  array: any,
) => {
  const body = {
    ProductId,
    CategoryId,
    CombinationId,
    EAN,
    Netto,
    Tax,
    Amount,
    Period,
    AttributeValues: array,
  };

  return conn.putJSON(`${endpoint}/Combination`, "json", body);
};

const getRaportByProductId = (id: string,From:any,To:any) => {
  return conn.getJSON(`${endpoint}/Report?ProductId=${id}&From=${From}&To=${To}`, "json");
};

const getProductDiscountByCombinationId = (id: string) => {
  return conn.getJSON(`${endpoint}/Discount/GetByCombinationId/${id}`,"json")
}

const addDiscount = (
  CombinationId: string,
  Netto:number,
  Tax:number,
  Sale:number,
  Started:string,
  Finished:string,
) =>{
  const body = {
  CombinationId,
  Netto,
  Tax,
  Sale,
  Started,
  Finished,
  }
  return conn.postJSON(`${endpoint}/Discount`,"json",body)
}

const editDiscount = (
  DiscountId:string,
  CombinationId: string,
  Netto:number,
  Tax:number,
  Sale:number,
  Started:string,
  Finished:string,
) =>{
  const body = {
  DiscountId,
  CombinationId,
  Netto,
  Tax,
  Sale,
  Started,
  Finished,
  }
  return conn.putJSON(`${endpoint}/Discount`,"json",body)
}

const deleteDiscount = (id:string) =>{
  return conn.deleteJSON(`${endpoint}/Discount/${id}`);
}


const productServices = {
  add,
  edit,
  remove,
  getAll,
  getAttributes,
  getArtists,
  getCategories,
  getAllDelivery,
  getAllProducts,
  getProduct,
  addProduct,
  removeProduct,
  editProduct,
  getAllCategories,
  getCategory,
  getSubCategories,
  updateDescription,
  getCategoriesByProductType,
  addProductFiles,
  removeProductFiles,
  getDeliveryByProductType,
  revokeDelivery,
  grantDelivery,
  updatePrice,
  deleteCombination,
  getAttributesByCategoryId,
  addCombination,
  editCombination,
  removeDocument,
  addDocument,
  getCombinations,
  getRaportByProductId,
  getProductDiscountByCombinationId,
  addDiscount,
  deleteDiscount,
  editDiscount,
};

export default productServices;
