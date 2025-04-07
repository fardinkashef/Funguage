import { databaseWord } from "@/lib/types";
import { Play } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function ClipReviewItem({ word }: { word: databaseWord }) {
  return (
    <Link href={`/learning/review/clip/${word._id}`}>
      <Card className="flex gap-4 w-64 h-full transition-all duration-200 hover:scale-[1.03] hover:shadow-lg">
        <div className="flex justify-center items-center border-r-2 border-r-orange-500">
          <Play color="grey" />
        </div>
        <CardHeader>
          <CardTitle className="text-lg">{word.title}</CardTitle>
          <CardDescription className="first-letter:uppercase">
            {word.meaning.definition.text}{" "}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
