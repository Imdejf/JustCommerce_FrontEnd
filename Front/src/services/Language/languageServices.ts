import { LanguageInterface } from "types/Language/languageTypes";
import { conn } from "../../api/BaseConnection";

const endpoint = conn.endpoints.language;

const getAll = (
    storeId: string,
    ): Promise<Array<LanguageInterface>> => {

        return conn.getJSON(`${endpoint}`, "json", {storeId: storeId});
    };

const languageServices = {
    getAll,
}

export default languageServices;