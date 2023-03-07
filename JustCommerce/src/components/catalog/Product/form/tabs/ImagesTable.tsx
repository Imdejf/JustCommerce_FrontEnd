// @ts-nocheck
import { useState, useEffect, useRef, useCallback  } from "react";

import ImageField from "components/common/inputs/imageInput/ImageField";
import Button from "components/common/buttons/basicButton/Button";
import { ButtonVariant } from "components/common/buttons/buttonTypes";

import { IMedia, IProduct } from "types/Product/product";
import styled from "styled-components";
import debounce from 'lodash/debounce';
import TextField from "components/common/inputs/textInput/TextField";


const GridColumn = styled.div<{ cols: number }>`
  display: grid;
  position: relative;
  gap: 1px;
  margin: 1px 0;
  grid-template-columns: ${(props) => `repeat(${props.cols}, minmax(0, 1fr))`};
`;


interface IImageTable {
    product: IProduct,
    activeLanguages: any,
}

const ImagesTable: React.FC<IImageTable> = ({
    product,
    activeLanguages
}) => {

    const [thumbnailBase64, setThumbnailBase64] = useState("");
    const [editedPhotoId, setEditedPhotoId] = useState("");
    const [toggleEditPhotos, setToggleEditPhotos] = useState(false);
    const [toggleShowNewPhoto, setToggleShowNewPhoto] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [newPhoto, setNewPhoto] = useState<IMedia | null>(null);

    const [currentLanguagePhoto, setCurrentLanguagePhoto] = useState("");

    const [view, setView] = useState(null);

    const addNewPhoto = () => {
        const photo: IMedia = {
            seoFileName: "",
            altAttribute: "",
            titleAttribute: "",
            displayOrder: 0,
            productMediaLangs: activeLanguages.languages.map((lang) => ({
              languageId: lang.id,
              seoFileName: "",
              altAttribute: "",
              titleAttribute: "",
            }))
        }
        setNewPhoto(photo)
    }

    const handleSeoFileNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedPhoto = { ...newPhoto, seoFileName: event.target.value };
        setNewPhoto(updatedPhoto);
      };

      const handleAltAttributeNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedPhoto = { ...newPhoto, altAttribute: event.target.value };
        setNewPhoto(updatedPhoto);
      };

      const handleTitleAttributeNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedPhoto = { ...newPhoto, titleAttribute: event.target.value };
        setNewPhoto(updatedPhoto);
      };

      const handleDisplayOrderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedPhoto = { ...newPhoto, displayOrder: event.target.value };
        setNewPhoto(updatedPhoto);
      };

      const debouncedUpdateMediaLangs = useCallback(debounce((newProductMediaLangs) => {
        alert()
        setNewPhoto({...newPhoto, productMediaLangs: newProductMediaLangs});
      }, 500), [newPhoto]);

      const handleProductMediaLangChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = event.target;
        const updatedProductMediaLangs = newPhoto.productMediaLangs.map((productMediaLang, i) => {
          if (i === index) {
            return { ...productMediaLang, [name]: value };
          }
          return productMediaLang;
        });
        const updatedPhoto = { ...newPhoto, productMediaLangs: updatedProductMediaLangs };
        setNewPhoto(updatedPhoto);
      };

      useEffect(() => {
        if (newPhoto !== null) {
          const viewToRender = (
            <div className="contents">
              {newPhoto.productMediaLangs.map((mediaLang, index) => (
                <div className={`${mediaLang.languageId === currentLanguagePhoto ? "contents":"hidden"}`}>
                  <div key={index} className="contents">
                    <div className="bg-white bg-opacity-30 p-12 text-center">
                    <input
                        value={mediaLang.seoFileName}
                        onChange={async (event) => {
                            event.persist(); // utrzymaj zdarzenie
                            const newProductMediaLangs = [...newPhoto.productMediaLangs];
                            newProductMediaLangs[index].seoFileName = event.target.value;
                            await setNewPhoto({
                            ...newPhoto,
                            productMediaLangs: newProductMediaLangs
                            });
                        }}
                        />
                    </div>
                    <div className="bg-white bg-opacity-30 p-12 text-center">
                        <input
                            value={mediaLang.titleAttribute}
                            onChange={async (event) => {
                                event.persist(); // utrzymaj zdarzenie
                                const newProductMediaLangs = [...newPhoto.productMediaLangs];
                                newProductMediaLangs[index].titleAttribute = event.target.value;
                                await setNewPhoto({
                                ...newPhoto,
                                productMediaLangs: newProductMediaLangs
                                });
                            }}
                            />
                    </div>
                    <div className="bg-white bg-opacity-30 p-12 text-center">
                        <input
                            value={mediaLang.altAttribute}
                            onChange={async (event) => {
                                event.persist(); // utrzymaj zdarzenie
                                const newProductMediaLangs = [...newPhoto.productMediaLangs];
                                newProductMediaLangs[index].altAttribute = event.target.value;
                                await setNewPhoto({
                                ...newPhoto,
                                productMediaLangs: newProductMediaLangs
                                });
                            }}
                            />
                    </div>
                    <div className="bg-white bg-opacity-30 p-12 text-center">
                        <input
                            value={mediaLang.displayOrder}
                            type="number"
                            onChange={async (event) => {
                                event.persist(); // utrzymaj zdarzenie
                                const newProductMediaLangs = [...newPhoto.productMediaLangs];
                                newProductMediaLangs[index].displayOrder = event.target.value;
                                await setNewPhoto({
                                ...newPhoto,
                                productMediaLangs: newProductMediaLangs
                                });
                            }}
                            />
                        </div>
                    </div>
                </div>
              ))}
            </div>
          );
          setView(viewToRender);
        }
      }, [currentLanguagePhoto, newPhoto, debouncedUpdateMediaLangs]);

    const cols = {
        Photo: "Zdjęcie",
        SeoFileName: "Nazwa Seo",
        AltAttribute: "Alt attribute",
        TitleAttribute: "Title attribute",
        DisplayOrder: "Display order",
    };

    return (
        <div className="w-full text-sm">
        <div className="px-18 flex justify-between py-8 bg-white opacity-80 rounded-t-sm">
            <div className="opacity-70 flex" >
            <div
            className={`flex justify-center mx-0 items-center flex-shrink-0 relative 
            bg-white bg-opacity-50 
            hover:bg-opacity-90 
            w-36 h-12 
            rounded-b-md cursor-pointer 
            text-sm
            transition-opacity duration-150
            
            `}
            onClick={() => setCurrentLanguagePhoto("")}
            >
                <span className="capitalize-first">Domyślny</span>
            </div>
                {activeLanguages.languages.map((tab) => (
                    <div key={tab.id} className={`flex justify-center mx-0 items-center flex-shrink-0 relative 
                    bg-white bg-opacity-50 
                    hover:bg-opacity-90 
                    w-36 h-12 
                    rounded-b-md cursor-pointer 
                    text-sm
                    transition-opacity duration-150
                    `}
                    onClick={() => setCurrentLanguagePhoto(tab.id)}
                    >
                        <span>{tab.nameOrginal}</span>
                    </div>
                ))}
            </div>
            <div style={{ display: "flex", gap: "25px" }}>
            <Button
            onClick={() => {
            setToggleShowNewPhoto((prev) => !prev);
            addNewPhoto(false);
            }}
            // disabled={!permissions.Edit}
            variant={ButtonVariant.Submit}
            >
            Dodaj atrybut
            </Button>

            <Button
                onClick={() => {
                // toggleEditAttributes((prev) => !prev);
                setToggleEditPhotos(false);
                setEditedPhotoId("");
                }}
                // disabled={!permissions.Edit}
                variant={ButtonVariant.Submit}
            >
                {toggleEditPhotos ? "Zapisz" : "Edytuj"}
            </Button>
            </div>
        </div>
        {toggleShowNewPhoto && (
            <>
                <GridColumn cols={5 + photos.length}>
                    {photos.map((singlePhoto: any) => {
                        return (
                            <div className="bg-white bg-opacity-80 p-12 text-center">
                            <span className="opacity-70">{singleAttribute.SeoFileName}</span>
                            </div>
                        );
                    })}

                    <div className="bg-white bg-opacity-80 p-12 text-center">
                    <span className="opacity-70">{cols.Photo}</span>
                    </div>
                    <div className="bg-white bg-opacity-80 p-12 text-center">
                    <span className="opacity-70">{cols.SeoFileName}</span>
                    </div>

                    <div className="bg-white bg-opacity-80 p-12 text-center">
                    <span className="opacity-70">{cols.TitleAttribute}</span>
                    </div>
                    <div className="bg-white bg-opacity-80 p-12 text-center">
                    <span className="opacity-70">{cols.AltAttribute}</span>
                    </div>
                    <div className="bg-white bg-opacity-80 p-12 text-center">
                    <span className="opacity-70">{cols.DisplayOrder}</span>
                    </div>

                </GridColumn>
            </>
        )}

        {toggleShowNewPhoto && (
            <>
                <GridColumn cols={5 + photos.length} className="align-center">
                    <div className="bg-white inline-flex bg-opacity-80 p-12 text-center ">
                        <ImageField
                            name="PhotoFile"
                            className="h-180px"
                            //  @ts-ignore
                            // imgSrc={product.ThumbnailImage.FilePath}
                            // @ts-ignore
                            base64={thumbnailBase64}
                            setBase64={setThumbnailBase64}
                        />
                    </div>
                    <div className={`${currentLanguagePhoto === "" ? "contents":"hidden"}`}>
                        <div className="bg-white bg-opacity-30 p-12 text-center">
                            <input
                                style={{ background: "rgba(0,0,0,0.04)" }}
                                type="text"
                                value={newPhoto?.seoFileName}
                                onChange={handleSeoFileNameChange}
                            />
                        </div>
                        <div className="bg-white bg-opacity-30 p-12 text-center">
                            <input
                                style={{ background: "rgba(0,0,0,0.04)" }}
                                type="text"
                                value={newPhoto?.altAttribute}
                                onChange={handleAltAttributeNameChange}
                            />
                        </div>
                        <div className="bg-white bg-opacity-30 p-12 text-center">
                            <input
                                style={{ background: "rgba(0,0,0,0.04)" }}
                                type="text"
                                value={newPhoto?.titleAttribute}
                                onChange={handleTitleAttributeNameChange}
                            />

                        {/* {newPhoto.productMediaLangs.map((productMediaLang, index) => (
                        <input
                        key={index}
                        name="seoFileName"
                        type="text"
                        value={productMediaLang.seoFileName}
                        onChange={(event) => handleProductMediaLangChange(event, index)}
                        />
                        ))} */}
                        </div>
                        <div className="bg-white bg-opacity-30 p-12 text-center">
                            <input
                                style={{ background: "rgba(0,0,0,0.04)" }}
                                type="number"
                                value={newPhoto?.displayOrder}
                                onChange={handleDisplayOrderChange}
                            />
                        </div>
                    </div>
                    {view}
                </GridColumn>
            </>
        )}
               <div className="max-h-96 overflow-y-auto">
                    {!toggleShowNewPhoto && (
                        <>
                            <GridColumn cols={5 + photos.length}>
                            {photos.map((singlePhoto: any) => {
                                return (
                                <div className="bg-white bg-opacity-80 p-12 text-center">
                                    <span className="opacity-70">{singlePhoto.SeoFileName}</span>
                                </div>
                                );
                            })}

                            <div className="bg-white bg-opacity-80 p-12 text-center">
                                <span className="opacity-70">{cols.SeoFileName}</span>
                            </div>
                            <div className="bg-white bg-opacity-80 p-12 text-center">
                                <span className="opacity-70">{cols.TitleAttribute}</span>
                            </div>
                            <div className="bg-white bg-opacity-80 p-12 text-center">
                                <span className="opacity-70">{cols.AltAttribute}</span>
                            </div>
                            <div className="bg-white bg-opacity-80 p-12 text-center">
                                <span className="opacity-70">{cols.DisplayOrder}</span>
                            </div>
                            <div className="bg-white bg-opacity-80 p-12 text-center">
                                <span className="opacity-70">Język</span>
                            </div>
                            </GridColumn>
                        </>
                    )}

                    {}
                </div>

    </div>
    )
}

export default ImagesTable;