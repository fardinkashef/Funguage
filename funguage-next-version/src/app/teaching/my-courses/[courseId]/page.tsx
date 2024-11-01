import { IconBadge } from "@/components/IconBadge";
import { getCourseById } from "@/lib/server-actions/courses";
import { LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
import { TitleForm } from "./_components/TitleForm";
import { DescriptionForm } from "./_components/DescriptionForm";
import { ImageForm } from "./_components/ImageForm";
import ChaptersForm from "./_components/ChaptersForm";
import { getChapters } from "@/lib/server-actions/chapters";

type MyCoursePageProps = {
  params: { courseId: string };
};

export default async function MyCoursePage({ params }: MyCoursePageProps) {
  const { courseId } = await params;
  const course = await getCourseById(courseId);
  const chapters = await getChapters(courseId);

  if (!course || !course._id) {
    return redirect("/");
  }
  console.log("This is the course:", course);

  const requiredFields = [course.title, course.description, course.imageUrl];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields} / ${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <div className="p-6">
      {/* 2 header*/}
      <div className="flex items-center justify-between">
        {/* 3 */}
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course Setup</h1>
          <span className="text-sm text-slate-700">
            Complete all fields {2 / 5}
          </span>
        </div>
      </div>
      {/* 2 body*/}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        {/* 3 column 1*/}
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your course</h2>
          </div>
          <TitleForm initialTitle={course.title} courseId={course._id} />
          <DescriptionForm
            initialDescription={course.description}
            courseId={course._id}
          />
          <ImageForm initialImageUrl={course.imageUrl} courseId={course._id} />
          {/* <CategoryForm
            initialData={course}
            courseId={course._id}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          /> */}
        </div>
        {/* 3 column 2*/}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecks} />
              <h2 className="text-xl">Course chapters</h2>
            </div>
            <ChaptersForm initialChapters={chapters} courseId={course._id} />
          </div>
        </div>
      </div>
    </div>
  );
}
