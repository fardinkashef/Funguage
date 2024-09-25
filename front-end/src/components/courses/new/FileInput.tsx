import "./FileInput.scss";

type FileInputProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  note?: string;
};

function FileInput({
  onChange,
  note = "Click or Drag a file here...",
}: FileInputProps) {
  return (
    <label className="FileInput">
      <i></i>
      <span>{note}</span>
      <input type="file" onChange={onChange} />
    </label>
  );
}

export default FileInput;
