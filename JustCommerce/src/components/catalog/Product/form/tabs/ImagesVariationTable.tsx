// @ts-nocheck
import { useState, useEffect, useRef, useCallback  } from "react";

import ImageField from "components/common/inputs/imageInput/ImageField";
import Button from "components/common/buttons/basicButton/Button";
import { ButtonVariant } from "components/common/buttons/buttonTypes";
import EditIco from "assets/icons/edit.svg";
import CancelIco from "assets/icons/status/unverified.svg";
import SaveIco from "assets/icons/save.svg";

import { IMedia, IProduct, IProductMediaLang } from "types/Product/product";
import styled from "styled-components";
import debounce from 'lodash/debounce';

const GridColumn = styled.div<{ cols: number }>`
  display: grid;
  position: relative;
  gap: 1px;
  margin: 1px 0;
  grid-template-columns: ${(props) => `repeat(${props.cols}, minmax(0, 1fr))`};
`;


interface IImagesVariationTableProps {
    product: IProduct;
    activeLanguages: any;
    photos: any;
    editPhoto: boolean;
    toggleEditPhotos: React.Dispatch<React.SetStateAction<boolean>>;
    addImage: (media: IMedia, base64: string) => void;
    editImage: (
        index: number,
        base64File: string,
        seoFileName: string,
        titleAttribute: string,
        altAttribute:string,
        displayOrder: number,
        productMediaLang: Array<IProductMediaLang>,
    ) => void;
}

const ImagesVariationTable: React.FC<IImagesVariationTableProps> = ({
    product,
    activeLanguages,
    photos,
    editPhoto,
    toggleEditPhotos,
    addImage,
    editImage,
}) => {
    const [view, setView] = useState(null);

    const [thumbnailBase64, setThumbnailBase64] = useState("");
    const [toggleShowNewPhoto, setToggleShowNewPhoto] = useState(false);
    const [newPhoto, setNewPhoto] = useState<IMedia | null>(null);
    const [currentLanguagePhoto, setCurrentLanguagePhoto] = useState("");
    const [mediaList, setMediaList] = useState<any[]>([]);
    const [editedMediaIndex, setEditedMediaIndex] = useState(null);

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
        setThumbnailBase64("");
    }

    function getBase64ImageType(base64String) {
        const binaryString = window.atob(base64String);
        const binaryData = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          binaryData[i] = binaryString.charCodeAt(i);
        }
      
        const uint = new Uint8Array(binaryData);
        let bytes = [];
        uint.forEach((byte) => {
          bytes.push(byte.toString(16));
        });
        const hex = bytes.join('').toUpperCase();
        let format = '';
        if (hex.startsWith('FFD8')) {
          format = 'jpeg';
        } else if (hex.startsWith('89504E47')) {
          format = 'png';
        } else if (hex.startsWith('47494638')) {
          format = 'gif';
        } else {
          return null;
        }
      
        return format;
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

      const handleEditedSeoNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedSeoName(e.target.value);
      };

      const handleEditedTitleAttributeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedTitleAttribute(e.target.value);
      };

      const handleEditedAltAttributeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedAltAttribute(e.target.value);
      };

      const handleEditedDisplayOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedDisplayOrder(e.target.value);
      };
      const debouncedUpdateMediaLangs = useCallback(debounce((newProductMediaLangs) => {
        setNewPhoto({...newPhoto, productMediaLangs: newProductMediaLangs});
      }, 500), [newPhoto]);

    useEffect(() => {
        setMediaList(photos);
        setToggleShowNewPhoto(false)
    }, [photos]);

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
                            event.persist();
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
                                event.persist();
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
                                event.persist();
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
                                event.persist();
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
                <div className="opacity-70 flex">
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
                    {toggleShowNewPhoto ? (
                    <Button
                    onClick={() => {
                        addImage(newPhoto, thumbnailBase64)
                    }}
                    // disabled={!permissions.Edit}
                    variant={ButtonVariant.Submit}
                    >
                    Dodaj
                    </Button>
                    ) : (
                        <Button
                        onClick={() => {
                        setToggleShowNewPhoto((prev) => !prev);
                        toggleEditPhotos(false);
                        addNewPhoto(false);
                        }}
                        // disabled={!permissions.Edit}
                        variant={ButtonVariant.Submit}
                        >
                        Nowy atrybut
                        </Button>
                    )}

                    {toggleShowNewPhoto ? (
                    <Button
                    onClick={() => {
                        setToggleShowNewPhoto(false)
                    }}
                    // disabled={!permissions.Edit}
                    variant={ButtonVariant.Remove}
                    >
                    Anuluj
                    </Button>
                    ) : (
                        <Button
                        onClick={() => {
                        toggleEditPhotos((prev) => !prev);
                        setToggleShowNewPhoto(false)
                        setEditedMediaIndex(null);
                        }}
                        // disabled={!permissions.Edit}
                        variant={ButtonVariant.Submit}
                    >
                        {editPhoto ? "Zapisz" : "Edytuj"}
                    </Button>
                    )}
                </div>
            </div>
            {toggleShowNewPhoto && (
            <>
                <GridColumn cols={6}>
                    {/* {photos.map((singlePhoto: any) => {
                        return (
                            <div className="bg-white bg-opacity-80 p-12 text-center">
                            <span className="opacity-70">{singlePhoto.SeoFileName}</span>
                            </div>
                        );
                    })} */}

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
                <GridColumn cols={6} className="align-center">
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
                            <GridColumn cols={6}>
                            {/* {photos.map((singlePhoto: any) => {
                                return (
                                <div className="bg-white bg-opacity-80 p-12 text-center">
                                    <span className="opacity-70">{singlePhoto.SeoFileName}</span>
                                </div>
                                );
                            })} */}
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
                                <div className="bg-white bg-opacity-80 p-12 text-center">
                                    <span className="opacity-70">Opcje</span>
                                </div>
                            </GridColumn>
                        </>
                    )}
                    {mediaList?.map((singleMedia: any, index) => {
                        if(index === editedMediaIndex) {
                            return (
                                <GridColumn cols={6}>
                                    <div className="bg-white inline-flex bg-opacity-80 p-12 text-center ">
                                        <ImageField
                                            name="PhotoFile"
                                            //  @ts-ignore
                                            imgSrc={editedPhotoSrc}
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
                                                value={editedSeoName}
                                                onChange={handleEditedSeoNameChange}
                                            />
                                        </div>
                                        <div className="bg-white bg-opacity-30 p-12 text-center">
                                            <input
                                                style={{ background: "rgba(0,0,0,0.04)" }}
                                                type="text"
                                                value={editedTitleAttribute}
                                                onChange={handleEditedTitleAttributeChange}
                                            />
                                        </div>
                                        <div className="bg-white bg-opacity-30 p-12 text-center">
                                            <input
                                                style={{ background: "rgba(0,0,0,0.04)" }}
                                                type="text"
                                                value={editedAltAttribute}
                                                onChange={handleEditedAltAttributeChange}
                                            />
                                        </div>
                                        <div className="bg-white bg-opacity-30 p-12 text-center">
                                            <input
                                                style={{ background: "rgba(0,0,0,0.04)" }}
                                                type="text"
                                                value={editedDisplayOrder}
                                                onChange={handleEditedDisplayOrderChange}
                                            />
                                        </div>
                                    </div>
                                    {editRecordView}
                                    {editPhoto && (
                                    <div
                                        className="bg-white bg-opacity-30 p-12 text-center "
                                        style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: "25px",
                                        }}
                                    >
                                        <img
                                        src={SaveIco}
                                        onClick={() => {
                                            editImage(
                                                editedMediaIndex,
                                                thumbnailBase64,
                                                editedSeoName,
                                                editedTitleAttribute,
                                                editedAltAttribute,
                                                editedDisplayOrder,
                                                editedMediaLang
                                            )
                                            setEditedMediaIndex(null);
                                        }}
                                        alt="save"
                                        style={{
                                            width: "18px",
                                            height: "18px",

                                            cursor: "pointer",
                                        }}
                                        />
                                        <img
                                        src={CancelIco}
                                        onClick={() =>  { setEditedMediaIndex(null) 
                                        }}
                                        alt="cancel"
                                        style={{
                                            width: "18px",
                                            height: "18px",

                                            cursor: "pointer",
                                        }}
                                        />
                                    </div>
                                    )}
                                </GridColumn>
                            )
                        } else {
                            return (
                                    <GridColumn cols={6}>
                                        <div className="bg-white bg-opacity-30 p-12 text-center">
                                            <div className="opacity-70">
                                                <img src={`data:image/${getBase64ImageType(singleMedia.base64File.Base64String)};base64, ${singleMedia.base64File.Base64String}`}/>
                                            </div>
                                        </div>
                                        <div className={`${currentLanguagePhoto === "" ? "contents":"hidden"}`}>
    
                                            <div className="bg-white bg-opacity-30 p-12 text-center">
                                                <span className="opacity-70">{singleMedia.seoFileName}</span>
                                            </div>

                                            <div className="bg-white bg-opacity-30 p-12 text-center relative">
                                                <span className="opacity-70">{singleMedia.titleAttribute}</span>
                                            </div>
                                            <div className="bg-white bg-opacity-30 p-12 text-center">
                                                <span className="opacity-70">{`${singleMedia.altAttribute }`}</span>
                                            </div>
                                            <div className="bg-white bg-opacity-30 p-12 text-center">
                                                <span className="opacity-70">{`${singleMedia.displayOrder}`}</span>
                                            </div>
                                        </div>
                                        <div className="contents">
                                        <div key={index} className={`contents ${currentLanguagePhoto !== "" ? "contents":"hidden"}`} >
                                            {singleMedia.productMediaLangs
                                            .filter((mediaLang: IProductMediaLang) => mediaLang.languageId === currentLanguagePhoto)
                                            .map((mediaLang: IProductMediaLang) => (
                                                <div key={mediaLang.languageId} className="contents">
                                                    <div className="bg-white bg-opacity-30 p-12 text-center">
                                                        <span className="opacity-70">{mediaLang.seoFileName}</span>
                                                    </div>
                                                    <div className="bg-white bg-opacity-30 p-12 text-center relative">
                                                        <span className="opacity-70">{mediaLang.titleAttribute}</span>
                                                    </div>
                                                    <div className="bg-white bg-opacity-30 p-12 text-center">
                                                        <span className="opacity-70">{`${mediaLang.altAttribute}`}</span>
                                                    </div>
                                                    <div className="bg-white bg-opacity-30 p-12 text-center">
                                                        <span className="opacity-70">{`${mediaLang.displayOrder}`}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                        {editPhoto ? (
                                        <div
                                            className="bg-white bg-opacity-30 p-12 text-center "
                                            style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            gap: "25px",
                                            }}
                                        >
                                            <>
                                            <img
                                                src={EditIco}
                                                onClick={() => {
                                                    setEditedPhotoSrc("")
                                                    setEditedMediaIndex(index)
                                                }}
                                                alt="edit"
                                                style={{
                                                width: "18px",
                                                height: "18px",

                                                cursor: "pointer",
                                                }}
                                            />
                                            <span
                                                onClick={() => 
                                                    setEditedMediaIndex(null) 
                                                }                                                
                                                className={` text-red cursor-pointer`}
                                                style={{ fontSize: "18px" }}
                                            >
                                                X
                                            </span>
                                            </>
                                        </div>
                                        ) : (
                                        <div className="bg-white bg-opacity-30 p-12 text-center">
                                            <span className="opacity-70"></span>
                                        </div>
                                        )}
                                        
                                    </GridColumn>
                            )
                        }
                    })}
                </div>

    </div>
    )
}

export default ImagesVariationTable;