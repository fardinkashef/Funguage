import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { databaseWord } from "@/lib/types";
import WordsModalDialog from "./video-player/word-modal/WordsModalDialog";

export default function VocabularyCard({
  databaseWord,
}: {
  databaseWord: databaseWord;
}) {
  return (
    <Card className="w-full max-w-xs h-full transition-all duration-200 hover:scale-[1.03] hover:shadow-lg">
      <CardHeader className="flex flex-row justify-between h-24">
        <div>
          <CardTitle className="text-2xl">{databaseWord.word}</CardTitle>
          <CardDescription>{databaseWord.partOfSpeech}</CardDescription>
        </div>
        <WordsModalDialog databaseWords={[databaseWord]} />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {databaseWord.meaning.definition.text}
        </p>
      </CardContent>
    </Card>
  );
}
