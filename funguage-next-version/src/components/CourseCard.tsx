import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type CourseCardProps = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  wordCount: number;
  level?: "beginner" | "intermediate" | "advanced";
};

export default function CourseCard({
  _id,
  title,
  description,
  imageUrl,
  wordCount,
  level = "beginner",
}: CourseCardProps) {
  return (
    <Link href={`/learning/courses/${_id}`}>
      <Card className="overflow-hidden transition-all duration-200 hover:scale-[1.03] hover:shadow-lg flex flex-col h-full">
        <div className="aspect-video relative">
          <Image
            src={imageUrl || "/placeholder.svg?height=200&width=400"}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <CardHeader>
          <h3 className="text-lg font-semibold">{title}</h3>
        </CardHeader>
        <CardContent className="grow">
          <p className="text-muted-foreground line-clamp-3">{description}</p>
        </CardContent>
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
            {wordCount} words
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
