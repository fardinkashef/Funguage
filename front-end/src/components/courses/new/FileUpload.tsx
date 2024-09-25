import Progress from "./Progress";
import "./FileUpload.scss";

import FileInput from "./FileInput";

type FileUploadProps = {
  title: string;
  uploadPercentage: number;
  note?: string;
  message: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

const FileUpload = ({
  title,
  uploadPercentage,
  note,
  message,
  handleChange,
  handleSubmit,
}: FileUploadProps) => {
  return (
    <div className="FileUpload">
      <h3>{title}</h3>
      <form onSubmit={handleSubmit}>
        <FileInput onChange={handleChange} note={note} />
        <input type="submit" value="Upload" />
      </form>
      <Progress percentage={uploadPercentage} />
      <p>{message}</p>
    </div>
  );
};

export default FileUpload;
