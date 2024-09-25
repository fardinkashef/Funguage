import ImageInput from "@/components/courses/new/ImageInput";
import "./CourseProfile.scss";

type CourseProfileProps = {
  courseName: string;
  setCourseName: (courseName: string) => void;
  courseDescription: string;
  setCourseDescription: (courseDescription: string) => void;
  courseProfileImageFile: File | null;
  setCourseProfileImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  courseProfileImageSrc: string;
  setCourseProfileImageSrc: React.Dispatch<React.SetStateAction<string>>;
};

function CourseProfile({
  courseName,
  setCourseName,
  courseDescription,
  setCourseDescription,
  courseProfileImageFile,
  setCourseProfileImageFile,
  courseProfileImageSrc,
  setCourseProfileImageSrc,
}: CourseProfileProps) {
  // Handlers 👇:
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCourseName(event.target.value);
  };
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => setCourseDescription(event.target.value);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    if (!setCourseProfileImageFile || !setCourseProfileImageSrc) return;

    setCourseProfileImageFile(files[0]);
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = function () {
      if (typeof reader.result === "string")
        setCourseProfileImageSrc(reader.result);
    };
  };

  const handleRemoveCourseProfileImage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setCourseProfileImageFile(null);
    setCourseProfileImageSrc("");
  };

  return (
    <form className="CourseProfile">
      <label>
        <span>Course name</span>
        <input
          type="text"
          id="name"
          name="name"
          value={courseName}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="description">
        <span>Course description</span>
        <textarea
          id="description"
          name="description"
          value={courseDescription}
          onChange={handleDescriptionChange}
        />
      </label>
      <ImageInput
        onChange={handleImageChange}
        text="Click or Drag a profile image here..."
        imageSrc={courseProfileImageSrc}
        onRemoveButtonClick={handleRemoveCourseProfileImage}
      />
    </form>
  );
}
export default CourseProfile;
