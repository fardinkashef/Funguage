import "./ImageInput.scss";

type ImageInputProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  text?: string;
  imageSrc: string;
  onRemoveButtonClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
};

function ImageInput({
  onChange,
  text = "Click or Drag a file here...",
  imageSrc,
  onRemoveButtonClick,
}: ImageInputProps) {
  const style = {
    backgroundImage: `url(${imageSrc})`,
    width: "100%",
    height: "100%",
  };

  return (
    <label className="ImageInput">
      <i></i>
      <span>{text}</span>
      <input type="file" onChange={onChange} />
      {imageSrc && (
        <div className="overlay">
          <img src={imageSrc} alt="Selected image" />
          <button
            onClick={(event) => onRemoveButtonClick(event)}
            title="Remove image"
          />
        </div>
      )}
    </label>
  );
}

export default ImageInput;
