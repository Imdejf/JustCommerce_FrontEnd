import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import usersService from "../../../services/usersService";

import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import { RootState } from "../../../store/store";
import { DataViewMode } from "../../../types/globalTypes";
import { IUserManagement, UserInterface } from "../../../types/userTypes";

import ContentContainer from "../../layout/ContentContainer";
import FilterPanel from "../../filters/FilterPanel";
import GroupPanel from "./GroupPanel/GroupPanel";
import { Formik } from "formik";
import productServices from "services/productServices";
import CategoryiesPanel from "./CategoryiesPanel/CategoryiesPanel";

const filters = [
  {
    name: "Aktywny",
    values: ["Tak", "Nie"],
  },
  {
    name: "Sample",
    values: ["Val1", "Val2", "Val3"],
  },
];

const Categories: React.FC = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    productServices
      .getCategories()
      // @ts-ignore
      .then((resp) => setItems(resp));
  }, []);

  const template = {
    id: "d",
    name: "d",
    isTemplate: true,
    isActive: false,
    comments: "",
    licensor: null,
    conditionsGroups: [],
  };

  return (
    <ContentContainer title="Kategorie">
      {/* @ts-ignore */}
      {/* <Formik initialValues={template} validateOnMount enableReinitialize>
        {items && <GroupPanel isSubmitting={false} groups={items} />}
      </Formik> */}

      <CategoryiesPanel groups={items} />
    </ContentContainer>
  );
};

export default Categories;
