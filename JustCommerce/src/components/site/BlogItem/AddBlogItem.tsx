// @ts-nocheck
import { Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import ContentContainer from "../../../layout/ContentContainer";
import FormSection from "../../../common/forms/FormSection";
import SubmitButton from "../../../common/buttons/submitButton/SubmitButton";
import TextField from "../../../common/inputs/textInput/TextField";
import { showServerErrors } from "../../../../utils/errorsUtils";
import TextInput from "components/common/inputs/textInput/TextInput";
import attributeGroupServices from "services/Attribute/attributeGroupServices";
import attributeServices from "services/Attribute/attributeServices";
import {productAttributeValidationSchema, addBlogCategory} from "./BlogCategoryHelper"
import SelectProfiles from "components/common/inputs/select/SelectProfiles";
import { ILanguage, LanguageInterface } from "../../../../types/Language/languageTypes"
import languageServices from "services/Language/languageServices";
import { BlogCategoryInterface } from "types/Blog/blogTypes";
import LanugagesTabs from "../../../common/languages/LanguagesTabs";
import ImageField from "components/common/inputs/imageInput/ImageField";
import HtmlEditor from "components/common/inputs/htmlEditor/htmlEditor";
import TextAreaField from "components/common/inputs/textArea/TextAreaField";
import blogServices from "services/Blog/blogServices";
import { convertToHTML } from 'draft-convert';

const AddBlogItem: React.FC = () => {
    const { currentUser, activeLanguages } = useSelector((state: RootState) => state);
    const [currentLanguage, setCurrentLanguage] = useState('');
    const [base64, setBase64] = useState("");
    const [view, setView] = useState(null);
    const [viewTab, setViewTab] = useState(null);
    const [checkbox, setCheckbox] = useState(false);

    return (
        <a>dsa</a>
    )
}

export default AddBlogItem