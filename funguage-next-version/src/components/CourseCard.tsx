import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  // CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type CourseCardProps = {
  _id: string;
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  imageUrl: string;
  wordCount: number;
};

export default function CourseCard({
  _id,
  title,
  description,
  level,
  imageUrl,
  wordCount,
}: CourseCardProps) {
  return (
    <Link href={`/learning/courses/${_id}`}>
      <Card className="overflow-hidden transition-all duration-200 hover:scale-[1.03] hover:shadow-lg flex flex-col h-full w-full">
        <div className="aspect-video relative">
          <Image
            src={imageUrl || "/placeholder.svg?height=200&width=400"}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <CardHeader className="grow flex flex-col">
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription className="grow first-letter:uppercase line-clamp-3">
            {description}
          </CardDescription>
        </CardHeader>
        {/* <CardContent className="grow">
          <p className="text-muted-foreground line-clamp-3">{description}</p>
        </CardContent> */}
        <CardFooter className="flex justify-between items-center">
          <Badge
            variant="outline"
            className={cn(
              "capitalize",
              level === "beginner" &&
                "border-green-200 bg-green-100 text-green-800",
              level === "intermediate" &&
                "border-blue-200 bg-blue-100 text-blue-800",
              level === "advanced" &&
                "border-purple-200 bg-purple-100 text-purple-800"
            )}
          >
            {level}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            <span className="w-max">{wordCount} words</span>
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
