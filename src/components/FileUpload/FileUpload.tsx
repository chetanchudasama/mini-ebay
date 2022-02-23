import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import FileModel from "../../models/FileModel";
import "./FileUpload.css";

interface FileUploadProps {
  onChangeFile?: (fileObject: FileModel) => void;
  file: FileModel;
}

const FileUpload: React.FC<FileUploadProps> = ({ onChangeFile, file }) => {
  const mimeType: string[] = ["image/png", "image/jpeg"];
  const [fileObject, setFileObject] = useState<any>([]);

  const handleFile = (event: any) => {
    const selectedFIles: string[] = [];
    const targetFiles = event.target.files;
    const targetFilesObject = [...targetFiles];
    targetFilesObject.map((file) => {
      return selectedFIles.push(URL.createObjectURL(file));
    });
    setFileObject(selectedFIles);
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
          Upload
          <input
            type="file"
            hidden
            accept={mimeType.join(",")}
            onChange={handleFile}
            multiple
          />
        </Button>
        <p>Only JPEG and PNG support</p>
        <br />
        {fileObject &&
          fileObject.length > 0 &&
          fileObject.map((url: any) => {
            return (
              <>
                <img
                  src={url}
                  alt="test"
                  style={{
                    width: "100px",
                    height: "100px",
                    paddingRight: "20px",
                  }}
                />
              </>
            );
          })}
      </div>
    </>
  );
};

export default FileUpload;
