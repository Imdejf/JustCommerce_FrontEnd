// @ts-nocheck
import React, { useState, useEffect  } from "react";
import { IProduct, IProductVariation, IProductOptionCombination, IMedia, ProductDTO } from "types/Product/product";
import Button from "components/common/buttons/basicButton/Button";
import { ButtonVariant } from "components/common/buttons/buttonTypes";
import ImageField from "components/common/inputs/imageInput/ImageField";
import ImageInput from "components/common/inputs/imageInput/ImageInput";

import EditIco from "assets/icons/edit.svg";
import CancelIco from "assets/icons/status/unverified.svg";
import SaveIco from "assets/icons/save.svg";
import SelectOptions from "components/common/inputs/select/SelectOption";
import DropdownPanel from "components/common/panels/DropdownPanel";
import FormSection from "../../../../common/forms/FormSection";

interface ThumbnailVariationProps {
    currentLanguage: string
    thumbnail: IMedia
    setThumbnailsVariationIsActive: (isActive: boolean) => void
    addThumbnail: (thumbnail: IMedia) => void
}

const ThumbnailVariation: React.FC<ThumbnailVariationProps> = ({
    currentLanguage,
    thumbnail,
    setThumbnailsVariationIsActive,
    addThumbnail
}) => {
    const [thumbnailBase64, setThumbnailBase64] = useState("");
    const [addedThumbnailsVariation, setAddedThumbnailsVariation] = useState<IMedia | null>(null);
    const [viewThumbnails, setViewThumbnails] = useState(null);

    useEffect(() => {
        if(thumbnail != null) {
            setAddedThumbnailsVariation(thumbnail)
            console.log(thumbnail)
        }
    }, [thumbnail])

    useEffect(() => {
        if(addedThumbnailsVariation !== null) {
            const viewToRender = (
                <div className="flex">
                   {addedThumbnailsVariation.productMediaLangs.map((language,index) => {
                    return (
                        <div key={index} className={`flex ${language.languageId === currentLanguage ? "" : "hidden"}`}>
                            <div className="bg-white bg-opacity-30 p-12 text-center">
                                <input
                                style={{ background: "rgba(0,0,0,0.04)" }}
                                type="text"
                                placeholder="SEO file name"
                                value={language.seoFileName || ""}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    const updatedLangs = addedThumbnailsVariation.productMediaLangs.map((lang) =>
                                    lang.languageId === language.languageId ? { ...lang, seoFileName: value } : lang
                                    );
                                    setAddedThumbnailsVariation((prevState) => ({
                                    ...prevState,
                                    productMediaLangs: updatedLangs,
                                    }));
                                }}
                                key={language.languageId}
                                />
                            </div>
                            <div className="bg-white bg-opacity-30 p-12 text-center">
                                <input
                                    style={{ background: "rgba(0,0,0,0.04)" }}
                                    type="text"
                                    placeholder="Alt attribute"
                                    value={language.altAttribute || ""}
                                    onChange={(event) => {
                                        const value = event.target.value;
                                        const updatedLangs = addedThumbnailsVariation.productMediaLangs.map((lang) =>
                                        lang.languageId === language.languageId ? { ...lang, altAttribute: value } : lang
                                        );
                                        setAddedThumbnailsVariation((prevState) => ({
                                        ...prevState,
                                        productMediaLangs: updatedLangs,
                                        }));
                                    }}
                                    key={language.languageId}
                                />
                            </div>
                                <div className="bg-white bg-opacity-30 p-12 text-center">
                                    <input
                                    style={{ background: "rgba(0,0,0,0.04)" }}
                                    type="text"
                                    placeholder="Title attribute"
                                    value={language.titleAttribute || ""}
                                    onChange={(event) => {
                                        const value = event.target.value;
                                        const updatedLangs = addedThumbnailsVariation.productMediaLangs.map((lang) =>
                                        lang.languageId === language.languageId ? { ...lang, titleAttribute: value } : lang
                                        );
                                        setAddedThumbnailsVariation((prevState) => ({
                                        ...prevState,
                                        productMediaLangs: updatedLangs,
                                        }));
                                    }}
                                    key={language.languageId}
                                    />
                            </div>
                        </div>
                    );
                })}
                </div>
            )
            setViewThumbnails(viewToRender)
        }
    }, [currentLanguage, addedThumbnailsVariation])
    
    if(!addedThumbnailsVariation) {
        return null
    }

    return (
        <div>
          <FormSection>
                <Button
                variant={ButtonVariant.Normal}
                className="mb-5"
                onClick={() => {
                        setThumbnailsVariationIsActive(false)
                    }
                }>
                Wróć
            </Button>
            </FormSection>
            <FormSection label="Miniatura">
            <ImageInput
                name="PhotoFile"
                className="mx-auto md:mx-0 mb-8"
                //  @ts-ignore
                imgSrc={thumbnail?.filePath}
                base64={thumbnailBase64}
                setBase64={setThumbnailBase64}
              />
            </FormSection>
            <FormSection label="Miniatura">
                {thumbnail !== null && (
                    <div>
                    <div className={`${currentLanguage === "" ? "" : "hidden"}`}>
                            <div className="flex">
                                <div className="bg-white bg-opacity-30 p-12 text-center">
                                    <input
                                    style={{ background: "rgba(0,0,0,0.04)" }}
                                    type="text"
                                    placeholder="Seo file name"
                                    value={addedThumbnailsVariation.seoFileName}
                                    onChange={(event) => {
                                        const value = event.target.value;
                                        setAddedThumbnailsVariation({
                                        ...addedThumbnailsVariation,
                                        seoFileName: value,
                                        });
                                    }}
                                    />
                                </div>
                                <div className="bg-white bg-opacity-30 p-12 text-center">
                                    <input
                                        style={{ background: "rgba(0,0,0,0.04)" }}
                                        type="text"
                                        placeholder="Alt attribute"
                                        value={addedThumbnailsVariation.altAttribute}
                                        onChange={(event) => {
                                            const value = event.target.value;
                                            setAddedThumbnailsVariation({
                                            ...addedThumbnailsVariation,
                                            altAttribute: value,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="bg-white bg-opacity-30 p-12 text-center">
                                    <input
                                        style={{ background: "rgba(0,0,0,0.04)" }}
                                        type="text"
                                        placeholder="Title attribute"
                                        value={addedThumbnailsVariation.titleAttribute}
                                        onChange={(event) => {
                                            const value = event.target.value;
                                            setAddedThumbnailsVariation({
                                            ...addedThumbnailsVariation,
                                            titleAttribute: value,
                                            });
                                        }}
                                    />
                                </div>
                        </div>
                    </div>
                    {viewThumbnails}
                    </div>
                )}
                <Button
                    className="h-10"
                    variant={ButtonVariant.Submit}
                    onClick={() => {
                        const addedThumbnailsVariationFile = addedThumbnailsVariation
                        ? {
                            ...addedThumbnailsVariation,
                            base64File: {
                              Base64String: thumbnailBase64
                            }
                          }
                        : null;

                        console.log(addedThumbnailsVariationFile)
                        addThumbnail(addedThumbnailsVariationFile)
                        setThumbnailBase64("")
                        setThumbnailsVariationIsActive(false)
                    }}
                >
                    Dodaj miniature
                </Button>
            </FormSection>
        </div>
    )
}

export default ThumbnailVariation