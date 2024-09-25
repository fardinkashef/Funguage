import { useState } from "react";
import FileUpload from "./FileUpload";
import "./SubtitleUploadPart.scss";
import axios from "axios";
import { extractErrorMessage } from "@/shared/util/extractErrorMessage";

type SubtitleUploadPartProps = {
  courseName: string;
  sectionName: string;
  subtitleFile: File;
  setSubtitleFile: (newSubtitleFile: File) => void;
  setSubtitleSrc: (newSubtitleSrc: string) => void;
  ///////////
  subtitleUploaded: boolean;
  setSubtitleUploaded: (boolean: boolean) => void;
};

function SubtitleUploadPart({
  courseName,
  sectionName,
  subtitleFile,
  setSubtitleFile,
  setSubtitleSrc,
  //////////
  subtitleUploaded,
  setSubtitleUploaded,
}: SubtitleUploadPartProps) {
  const [message, setMessage] = useState("");

  const [uploadPercentage, setUploadPercentage] = useState(0);
  // Handlers 👇:
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    if (!setSubtitleFile || !setSubtitleSrc) return;
    setSubtitleFile(files[0]);
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = function () {
      if (typeof reader.result === "string") setSubtitleSrc(reader.result);
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("courseName", courseName);
    formData.append("sectionName", sectionName);
    formData.append("fileType", "subtitle");
    if (subtitleFile) formData.append("file", subtitleFile);
    setSubtitleUploaded(true);
    try {
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/courses/new/section",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (!progressEvent.total) return;
            setUploadPercentage(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
          },
        }
      );

      setMessage("File Uploaded");
    } catch (error) {
      // if (err.response.status === 500) {
      //   setMessage("There was a problem with the server");
      // } else {
      //   setMessage(err.response.data.msg);
      // }
      const errorMessage = extractErrorMessage(error);
      setMessage(errorMessage);
      setUploadPercentage(0);
    }
  };
  const note = subtitleFile
    ? `Subtitle file named "${subtitleFile.name}" selected.`
    : undefined;
  return (
    <div className="SubtitleUploadPart">
      <FileUpload
        title={
          subtitleUploaded
            ? `Subtitle file named ${subtitleFile.name} has successfully uploaded`
            : "Upload your subtitle file"
        }
        uploadPercentage={uploadPercentage}
        note={note}
        message={message}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
export default SubtitleUploadPart;
