// @ts-nocheck
import { useState, useEffect, useRef, useCallback  } from "react";
import { useSelector } from "react-redux";
import { IProductOption, DisplayType, ProductDTO,  } from "types/Product/product";
import Button from "components/common/buttons/basicButton/Button";
import { ButtonVariant } from "components/common/buttons/buttonTypes";
import ImageField from "components/common/inputs/imageInput/ImageField";
import EditIco from "assets/icons/edit.svg";
import CancelIco from "assets/icons/status/unverified.svg";
import SaveIco from "assets/icons/save.svg";
import { toast } from "react-toastify";
import { showServerErrors } from "../../../../../utils/errorsUtils";
import productOptionServices from "services/ProductOption/productOptionServices";
import productServices from "../../../../../services/Product/productServices"
import SelectOptions from "components/common/inputs/select/SelectOption";
import FormSection from "../../../../common/forms/FormSection";
import DropdownPanel from "components/common/panels/DropdownPanel";
import { IListPageRequest } from "types/globalTypes";
import { TagsInput } from "react-tag-input-component";
import LanugagesTabs from "../../../../common/languages/LanguagesTabs";

interface IProductOptionProps {
    product: ProductDTO
}

const ProductOptions: React.FC<IProductOptionProps> = ({
    product
}) => {
    const { currentUser, activeLanguages } = useSelector((state: RootState) => state);
    const [options, setOptions] = useState<{ value: number; label: string }[]>([]);
    const [option, setOption] = useState<{ value: number; label: string } | null>(null);
    const [configureIndex, setConfigureIndex] = useState<number>(null)
    const [addedOptions, setAddedOptions] = useState<Array<IProductOption>>([]);
    const [tags, setTags] = useState([]);
    const [viewTab, setViewTab] = useState(null);
    const [currentLanguageValue, setLanguageValue] = useState('');
    const [view, setView] = useState(null);
    const [base64, setBase64] = useState("");

    function handleLanguageValue(value) {
        setLanguageValue(value);
      }

    const addOption = (optionId: string, optionName: string) => {
        const newOption: IProductOption = {
            optionName, optionName,
            optionId: optionId,
            name: "",
            displayType: 0,
            values: [],
        }

        setAddedOptions(prevAddedOptions => [...prevAddedOptions, newOption]);
        setOptions(options.filter(option => option.value !== optionId));
    }

    const addOptionValue = async (index: number) => {
        const option = addedOptions[index]
        
        try {
            const optionDTO = {
                productId: product.id,
                storeId: currentUser.storeId,
                option: option
            }

            // await productServices.addOptionValue(optionDTO)
            toast.success("Dodano opcje");
        } catch(errors: any) {
            showServerErrors(errors);
        }
    }

    const updateOptionValue = async (index: number) => {
        const option = addedOptions[index]
        
        try {
            const optionDTO = {
                productId: product.id,
                storeId: currentUser.storeId,
                option: option
            }

            await productServices.editOptionValue(optionDTO)
            toast.success("Edytowano opcje");
        } catch(errors: any) {
            showServerErrors(errors);
        }
    }

    const handleTagsInputChange = (tags: string[], index: number) => {
        const option = addedOptions[index];
        
        const newOptionValue: IProductOptionValue = {
          key: tags[tags.length - 1],
          displayType: option.displayType,
          productOptionValueLangs: activeLanguages?.languages?.map(lang => ({ 
            languageId: lang.id,
            key: "",
            display: ""             
          })),
        };
      
        const newValues = [...option.values, newOptionValue];
        const newOption = { ...option, values: newValues };
        const newAddedOptions = [...addedOptions];
        newAddedOptions[index] = newOption;
      
        setAddedOptions(newAddedOptions);
    };

    const updateAddedOptions = (configureIndex: number, index:number, langIndex: number, newKey: string, newDisplay: string) => {
        setAddedOptions(prevAddedOptions => {
          const updatedOptionValueLangs = [...prevAddedOptions[configureIndex].values[index].productOptionValueLangs];
          updatedOptionValueLangs[langIndex] = { ...updatedOptionValueLangs[langIndex], key: newKey, display: newDisplay };
          const updatedOptionValues = [...prevAddedOptions[configureIndex].values];
          updatedOptionValues[index] = { ...updatedOptionValues[index], productOptionValueLangs: updatedOptionValueLangs };
          const updatedOptions = [...prevAddedOptions];
          updatedOptions[configureIndex] = { ...updatedOptions[configureIndex], values: updatedOptionValues };
          return updatedOptions;
        });
      };

    useEffect(async () => {
        const request: IListPageRequest = {
            pageNumber: 1,
            pageSize: 50,
            searchString: "",
            storeId: currentUser?.storeId
        }
        const productOptions = await productOptionServices.getAll(request)
        
        const visibleOptions = productOptions.items.map((item) => ({
            value: item.id,
            label: item.name
          }));
          
          setOptions(visibleOptions);
    }, [currentUser])

    useEffect(() => {
        if (product) {
          if (product.options.length > 0 && addedOptions.length < 1) {
            const newOptions = product.options.map((option) => {
              const newOption: IProductOption = {
                optionName: option.name,
                optionId: option.id,
                name: "",
                displayType: option.displayType,
                values: option.values,
              };
              const newTags = option.values.map((value) => value.key);
              setTags((prevTags) => prevTags.concat([newTags]));
              return newOption;
            });
            setAddedOptions((prevOptions) => [...prevOptions, ...newOptions]);
          }
        }
      }, [product]);

    useEffect(() => {
        if (activeLanguages !== null) {
            const viewTabToRender = (
                <div className="block">
                    <LanugagesTabs tabs={activeLanguages.languages.map((t) => t)} onLanguageValueHandle={handleLanguageValue} />
                </div>
              );
              setViewTab(viewTabToRender);
        }
    }, [activeLanguages]);

    useEffect(() => {
        if(currentLanguageValue !== "") {
            if(configureIndex != null) {
                const viewToRender = (
                    <div>
                    {addedOptions[configureIndex].values.map((value, index) => (
                      <FormSection label={value.optionId}>
                        <div className="mt-5">
                          {value.productOptionValueLangs.map((language, langIndex) => {
                              return (
                                <div className={`${language.languageId === currentLanguageValue ? "block":"hidden"}`}> 
                                    <div className="flex">
                                        <div>
                                        <span>Klucz</span>
                                        <input   
                                            value={language.key}
                                            onChange={e => updateAddedOptions(configureIndex, index, langIndex, e.target.value, language.display)} />
                                        </div>
                                        <div className="ml-5">
                                        <span>Wyświetl</span>
                                        <input   
                                            value={language.display}
                                            onChange={e => updateAddedOptions(configureIndex, index, langIndex, language.key, e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            );
                          })}
                        </div>
                      </FormSection>
                    ))}
                  </div>
                )
                setView(viewToRender)
            }
        }
        else {
            const viewToRender = (
                <a></a>
            )

            setView(viewToRender)
        }
    },[configureIndex, currentLanguageValue, addedOptions])
    
    return (
        <DropdownPanel
        label="Opcje produktu"
        >
            <div>
                <FormSection label="Dostępne opcje">
                    <SelectOptions
                    name="Option"
                    items={options}
                    label="Opcje"
                    selectedItem={option}
                    setSelectedItem={setOption}
                    />
                    <Button
                    disabled={!option}
                    className="h-10"
                    onClick={() => {
                        addOption(option.value, option.label)
                    }}
                    variant={ButtonVariant.Submit}>
                        Dodaj opcje
                    </Button>
                </FormSection>
                <div className={`${addedOptions?.length > 0 ? "" : "hidden"}`}>
                {viewTab}
                    <FormSection label="Wartość opcji">                    
                        <div>
                            {addedOptions?.map((option, index) => (
                            <div>
                                <div className="flex">
                                    <div className="text-sm font-medium opacity-80 mt-4 mb-5 capitalize-first px-18">
                                        <span>{option.optionName}</span>
                                    </div>
                                    <TagsInput
                                    key={option.optionId}
                                    value={tags[index]}
                                    onChange={(newTags: string[]) => handleTagsInputChange(newTags, index)}
                                    name={`option-${option.optionId}`}
                                    placeholder={`Enter ${option.name} values`}
                                    classNames={{
                                        input: 'border-b-2 w-full',
                                        tag: ''
                                    }}
                                    />
                                    <Button
                                    className="h-10"
                                    onClick={() => {
                                        const exist = product.options.some(c => c.id == option.optionId)
                                        if(exist) 
                                        {
                                            updateOptionValue(index)
                                        } else {
                                            addOptionValue(index)
                                        }
                                    }}
                                    variant={ButtonVariant.Submit}>
                                        Zapisz
                                    </Button>
                                    <Button
                                    className="h-10"
                                    onClick={() => {
                                        if(configureIndex == index) {
                                            setConfigureIndex(null)
                                        }
                                        else {
                                            setConfigureIndex(index)
                                        }
                                    }}
                                    variant={ButtonVariant.Normal}>
                                        {configureIndex != index ? "Konfiguruj wyświetlanie" : "Zakończ konfiguracje"}
                                    </Button>
                                    <Button
                                    className="h-10"
                                    onClick={() => {
                                        removeOption(option.optionId, option.optionName)
                                    }}
                                    variant={ButtonVariant.Abort}>
                                        Usuń opcje
                                    </Button>
                                </div>
                                <div className={`${configureIndex == index ? "" : "hidden"}`}>
                                    <div className="flex">
                                        <label className="flex ml-5">
                                            <input
                                            type="checkbox"
                                            checked={addedOptions[index].displayType === DisplayType.text}
                                            onChange={() => {
                                                const updatedOptions = [...addedOptions];
                                                updatedOptions[index] = {
                                                ...updatedOptions[index],
                                                displayType: DisplayType.text,
                                                };
                                                setAddedOptions(updatedOptions);
                                            }}
                                            />
                                            Text
                                        </label>
                                        <label className="flex ml-5">
                                            <input
                                            type="checkbox"
                                            checked={addedOptions[index].displayType === DisplayType.color}
                                            onChange={() => {
                                                const updatedOptions = [...addedOptions];
                                                updatedOptions[index] = {
                                                ...updatedOptions[index],
                                                displayType: DisplayType.color,
                                                };
                                                setAddedOptions(updatedOptions);
                                            }}
                                            />
                                            Color
                                        </label>
                                    </div>
                                    <div className={`${currentLanguageValue !== "" ? "hidden" : ""}`}>
                                        {addedOptions[index].values.map((value, valueIndex) => {
                                            return (
                                                <div className="flex mt-5 ml-5" key={valueIndex}>
                                                    <span>{value.key}</span>
                                                    <div className="ml-5">
                                                    <input
                                                        type="text"
                                                        value={value.display}
                                                        onChange={(event) => {
                                                        const updatedOptions = [...addedOptions];
                                                        const updatedValue = {
                                                            ...updatedOptions[index].values[valueIndex],
                                                            display: event.target.value,
                                                        };
                                                        updatedOptions[index].values[valueIndex] = updatedValue;
                                                        setAddedOptions(updatedOptions);
                                                        }}
                                                    />
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    {view}
                                </div>
                            </div>
                            ))}
                        </div>
                    </FormSection>
                </div>
            </div>
        </DropdownPanel>
    )
}

export default ProductOptions