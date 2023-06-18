// @ts-nocheck
import { Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router";
import ContentContainer from "../../../layout/ContentContainer";
import { showServerErrors } from "../../../../utils/errorsUtils";
import blogServices from "services/Blog/blogServices";
import blogItemServices from "services/BlogItem/blogItemServices"
import LanugagesTabs from "../../../common/languages/LanguagesTabs";
import BlogCategoryDetailTopBar from "./BlogCategoryDetailTopBar";
import InfoBox from "components/common/boxes/InfoBox/InfoBox";
import InfoBoxPlaceholder from "components/common/boxes/InfoBox/InfoBoxPlaceholder";
import { BlogCategoryInterface } from "types/Blog/blogTypes";
import BlogCategoryDetailTable from "./Table/BlogCategoryDetailTable";
import { IBlogItemInterface } from "types/BlogItem/blogItemTypes";
import useInfiniteScroll from "../../../../hooks/useInfiniteScroll";
import BlogCategoryDetailTableTopBar from "./Table/BlogCategoryDetailTableTopBar";
import { DefaultSortContext } from "contexts/defaultSortContext";

const BlogCategoryDetail: React.FC = () => { 
    const { currentUser, activeLanguages } = useSelector((state: RootState) => state);
    const { id } = useParams<{ id: string, storeId: string }>();
    const [view, setView] = useState(null);
    const [viewTab, setViewTab] = useState(null);
    const [currentLanguageValue, setLanguageValue] = useState('');
    const [defaultSort, setDefaultSort] = useContext(DefaultSortContext);
    const [sortBy, setSortBy] = useState<{ value: number; label: string } | null>(null);
     const [sorts, setSorts] = useState<{ value: number; label: string }[]>([]);



    const [blogCategory, setBlogCategory] = useState<BlogCategoryInterface | null>(null);
    const [queryString, setQueryString] = useState("");

    const handleSearch = (query: string) => {
        setQueryString(query);
    };

    useEffect(() => {
        blogServices
            .getById(id)
            .then((response) => {
                setBlogCategory(response)
            })
            .catch((errors) => {
                showServerErrors(errors);
            });
    },[id])

    useEffect(() => {
        if (activeLanguages !== null) {
            const viewTabToRender = (
                <div className="block">
                    <LanugagesTabs tabs={activeLanguages.languages.map((t) => t)} onLanguageValueHandle={handleLanguageValue} />
                </div>
              );
              setViewTab(viewTabToRender);
        }
      }, [activeLanguages])

      function handleLanguageValue(value) {
        setLanguageValue(value);
    }

    const {
        items: blogItems,
        loading,
        containerRef,
        lastItemRef,
    } = useInfiniteScroll<IBlogItemInterface>(
        blogItemServices.getAll,
        queryString,
        undefined,
        undefined, 
        id);


    if (!blogCategory) {
      return <InfoBoxPlaceholder />;
    }

    if (!activeLanguages) {
      return null;
    }

  

    return (
        <ContentContainer
        title={`${blogCategory?.name}`}
        TopBar={
            <BlogCategoryDetailTopBar
            blogCategory={blogCategory}
            path="/catalog/category"/>
        }>
        {viewTab}  
        <div className={`${currentLanguageValue !== "" ? "hidden" : ""}`}>
                <InfoBox className="bg-white-dirty p-18">
                    <InfoBox.Image src={blogCategory ? blogCategory.thumbnailImage.filePath : ""}/>
                    <InfoBox.Items>
                        <InfoBox.InfoItem label={"Nazwa"} value={`${blogCategory.name}`}/>
                        <InfoBox.InfoItem label={"Adres"} value={`${blogCategory.slug}`}/>
                        <InfoBox.HtmlEditor label={"Opis"} value={`${blogCategory.description}`}/>
                        <InfoBox.InfoItem label={"Tytuł meta"} value={`${blogCategory.metaTitle}`}/>
                        <InfoBox.InfoItem label={"Opis meta"} value={`${blogCategory.metaDescription}`}/>
                        <InfoBox.InfoItem label={"Słowa kluczowe"} value={`${blogCategory.metaKeywords}`}/>
                    </InfoBox.Items>
                </InfoBox>
        </div>
        <div className="mt-10">
            <BlogCategoryDetailTableTopBar
            sorts={sorts}
            sortBy={sortBy}
            setSortBy={setSortBy}
            handleQueryChange={handleSearch}
            defaultSort={defaultSort}
            />
            <BlogCategoryDetailTable
            blogItems={blogItems}/>
        </div>
        </ContentContainer>
    )
}

export default BlogCategoryDetail