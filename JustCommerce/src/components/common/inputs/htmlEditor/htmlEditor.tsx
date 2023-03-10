// @ts-nocheck
import React from "react";
import { useField } from "formik";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertFromHTML } from 'draft-convert';
import { EditorState } from 'draft-js'
const toolbar = {
  options: [
    "inline",
    "blockType",
    "fontSize",
    "fontFamily",
    "list",
    "textAlign",
    "colorPicker",
    "link",
    "embedded",
    "remove",
  ],
  inline: {
    inDropdown: false,
    options: ["bold", "italic", "underline", "strikethrough"],
  },
  blockType: {
    inDropdown: true,
    options: [
      "Normal",
      "H1",
      "H2",
      "H3",
      "H4",
      "H5",
      "H6",
      "Blockquote",
      "Code",
    ],
  },
  fontSize: {
    options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
  },
  fontFamily: {
    options: [
      "Arial",
      "Georgia",
      "Impact",
      "Tahoma",
      "Times New Roman",
      "Verdana",
      "Poppins",
    ],
  },
  list: {
    inDropdown: false,
    options: ["unordered", "ordered"],
  },
  textAlign: {
    inDropdown: false,
    options: ["left", "center", "right", "justify"],
  },
  colorPicker: {
    colors: [
      "rgb(97,189,109)",
      "rgb(26,188,156)",
      "rgb(84,172,210)",
      "rgb(44,130,201)",
      "rgb(147,101,184)",
      "rgb(71,85,119)",
      "rgb(204,204,204)",
      "rgb(65,168,95)",
      "rgb(0,168,133)",
      "rgb(61,142,185)",
      "rgb(41,105,176)",
      "rgb(85,57,130)",
      "rgb(40,50,78)",
      "rgb(0,0,0)",
      "rgb(247,218,100)",
      "rgb(251,160,38)",
      "rgb(235,107,86)",
      "rgb(226,80,65)",
      "rgb(163,143,132)",
      "rgb(239,239,239)",
      "rgb(255,255,255)",
      "rgb(250,197,28)",
      "rgb(243,121,52)",
      "rgb(209,72,65)",
      "rgb(184,49,47)",
      "rgb(124,112,107)",
      "rgb(209,213,216)",
    ],
  },
  link: {
    showOpenOptionOnHover: true,
    defaultTargetOption: "_self",
    options: ["link", "unlink"],
  },
  embedded: {
    defaultSize: {
      height: "auto",
      width: "auto",
    },
  },
};

export default function HtmlEditor(props) {
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField(props);

  function handleChange(value) {
    helpers.setValue(value)
  }

  function handleBlur() {
    helpers.setTouched(true);
  }

  return (
    <div class="w-full mb-5">
      <div class="bg-white">
        <Editor
          toolbar={toolbar}
          editorState={field.value}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
}

