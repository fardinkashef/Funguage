import { useState } from "react";
import FileUpload from "./FileUpload";
import "./VideoUploadPart.scss";
import axios from "axios";
import { extractErrorMessage } from "@/shared/util/extractErrorMessage";

type VideoUploadPartProps = {
  courseName: string;
  sectionName: string;
  videoFile: File;
  setVideoFile: (newVideoFile: File) => void;
  /////////
  videoUploaded: boolean;
  setVideoUploaded: (boolean: boolean) => void;
};

function VideoUploadPart({
  courseName,
  sectionName,
  videoFile,
  setVideoFile,
  ///////
  videoUploaded,
  setVideoUploaded,
}: VideoUploadPartProps) {
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setVideoFile(files[0]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("courseName", courseName);
    formData.append("sectionName", sectionName);
    formData.append("fileType", "video");
    if (videoFile) formData.append("file", videoFile);
    setVideoUploaded(true);
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
  const note = videoFile
    ? `Video file named "${videoFile.name}" selected.`
    : undefined;
  return (
    <div className="VideoUploadPart">
      <FileUpload
        title={
          videoUploaded
            ? `Video file named ${videoFile.name} has successfully uploaded`
            : "Upload your video file"
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
export default VideoUploadPart;
