import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import FileModel from "../../models/FileModel";
import "./FileUpload.css";

interface FileUploadProps {
  onFileChange?: (fileObject: FileModel) => void;
  imageFile: FileModel;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileChange, imageFile }) => {
  const mimeType: string[] = ["image/png", "image/jpeg"];

  const handleFileChange = (event: any) => {
    let file = event.target.files[0];
    const srcUrl = URL.createObjectURL(file);
    onFileChange &&
      onFileChange({
        fileName: file.name,
        file: file!,
        fileSrc: srcUrl,
      });
  };

  return (
    <>
      <div className="file-upload-container">
        <Button
          variant="contained"
          color="primary"
          size="small"
          component="label"
        >
          Upload Image
          <input
            type="file"
            hidden
            accept={mimeType.join(",")}
            onChange={handleFileChange}
            multiple
          />
        </Button>
        <p>Only JPEG and PNG support</p>
        <br />
        {imageFile.fileSrc && (
          <img
            src={imageFile.fileSrc}
            alt={imageFile.fileName}
            className="image-preview"
          />
        )}
      </div>
    </>
  );
};

export default FileUpload;
