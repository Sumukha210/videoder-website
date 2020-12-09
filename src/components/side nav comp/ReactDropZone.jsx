import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const ReactDropZone = ({ setVideoFile }) => {
  const onDrop = useCallback(
    acceptedFiles => {
      acceptedFiles[0].type === "video/mp4" && setVideoFile(acceptedFiles[0]);
    },
    [setVideoFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="file__input">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>
          Drag 'n' drop video, or click here to select video(only mp4 format
          allowed)
        </p>
      )}
    </div>
  );
};

export default ReactDropZone;
