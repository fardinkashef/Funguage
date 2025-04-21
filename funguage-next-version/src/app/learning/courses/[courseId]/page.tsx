import { Button } from "@/components/ui/button";
import { getChapters } from "@/lib/server-actions/chapters";
import { getCourseById } from "@/lib/server-actions/courses";
import Image from "next/image";
import { BookOpen, PlaySquare, CircleGauge } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserByID } from "@/lib/server-actions/users";
import { user } from "@/lib/types";
import ProgressCircle from "@/components/ProgressCircle";

type CoursePageProps = {
  params: Promise<{ courseId: string }>;
};
export default async function CoursePage({ params }: CoursePageProps) {
  const session = await auth();
  const user = session?.user;
  const { courseId } = await params;
  if (!user) redirect(`/login?callbackUrl=/learning/courses/${courseId}`);

  const userData = (await getUserByID(user._id as string)) as user;
  // const dbWords = await getWords(userData.learntWordsIds);

  const course = await getCourseById(courseId);
  const chapters = await getChapters(courseId);

  const learnedWordsCount = course.usedDatabaseWordIds.filter((id) =>
    userData.learntWordsIds.includes(id)
  ).length;

  const enrolled = false;
  const progressPercentage =
    (learnedWordsCount * 100) / (course.usedDatabaseWordIds as string[]).length;

  // Todo: Add course enroll handler
  // const handleEnroll = () => {
  // };
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
                Teaches {course.usedDatabaseWordIds?.length} Words
              </span>
            </div>
            <div className="flex items-center">
              <CircleGauge className="mr-2 h-5 w-5 text-primary" />
              <span className="font-medium">{"beginner"} level</span>
            </div>
          </div>
        </Card>

        {/* User Progress */}
        <Card className="p-6 flex flex-col items-center justify-center gap-8">
          <h2 className="text-xl font-semibold">Your Progress</h2>
          <ProgressCircle percentage={progressPercentage} />
          <p className="text-center text-gray-600">
            {`You've already learned ${learnedWordsCount} of
            ${course.usedDatabaseWordIds?.length} words`}
          </p>
        </Card>
      </div>
    </div>
  );
}
