import { Button } from "@/components/ui/button";
import { getChapters } from "@/lib/server-actions/chapters";
import { getCourseById } from "@/lib/server-actions/courses";
import Image from "next/image";
import { BookOpen, PlaySquare, CircleGauge } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

type CoursePageProps = {
  params: Promise<{ courseId: string }>;
};
export default async function CoursePage({ params }: CoursePageProps) {
  const { courseId } = await params;
  const course = await getCourseById(courseId);
  const chapters = await getChapters(courseId);
  const enrolled = false;

  const handleEnroll = () => {
    // In a real app, this would call your API to enroll the user
  };
  return (
    <div className="mx-auto py-8 px-4 lg:max-w-3xl">
      <div className="flex flex-col gap-8 px-8 pb-16 justify-center lg:items-center lg:flex-row lg:gap-32">
        <div className="w-full max-w-96 md:max-w-lg">
          <h2 className="text-4xl font-bold mb-6">{course.title}</h2>
          <div className="flex gap-4">
            <Link href="/" className="">
              <Button className="w-36">Check out Words</Button>
            </Link>
            {enrolled ? (
              <p>You&apos;ve already enrolled to this course.</p>
            ) : (
              <Button className="bg-orange-500 w-36">Enroll</Button>
            )}
          </div>
        </div>
        <div className="relative w-full max-w-96 aspect-video rounded-md overflow-hidden">
          <Image src={course.imageUrl as string} fill alt="course image" />
        </div>
      </div>
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">About this course</h2>
        <p className="text-gray-700">{course.description}</p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Course Details</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <PlaySquare className="mr-2 h-5 w-5 text-primary" />
              <span className="font-medium">{chapters.length} Chapters</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5 text-primary" />
              <span className="font-medium">
                {course.usedDatabaseWordIds?.length} Words to Learn
              </span>
            </div>
            <div className="flex items-center">
              <CircleGauge className="mr-2 h-5 w-5 text-primary" />
              <span className="font-medium">Level: {"beginner"}</span>
            </div>
          </div>
        </Card>

        {/* {courseMockData.isEnrolled && (
        <Card className="p-6 flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
          <div className="relative w-40 h-40 mb-4">
            <ProgressCircle percentage={courseMockData.progress} />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold">{courseMockData.progress}%</span>
            </div>
          </div>
          <p className="text-center text-gray-600">
            You've learned {Math.round((courseMockData.progress * courseMockData.wordCount) / 100)} of {course.wordCount} words
          </p>
        </Card>
      )} */}
      </div>
    </div>
  );
}
