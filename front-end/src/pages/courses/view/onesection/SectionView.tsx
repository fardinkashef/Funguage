import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SectionView.scss";
import axios from "axios";
import LoadingSpinner from "@/components/shared/components/LoadingSpinner";
import VideoPlayer from "@/components/courses/view/video-player/VideoPlayer.tsx";
import { wordsPairList } from "@/shared/types/wordDataTypes";

type data = {
  courseName: string;
  sectionWordsPairList: wordsPairList;
};

function SectionView() {
  const { courseId, sectionName } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<data | null>(null);

  ///////////////////////////////
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios(
          import.meta.env.VITE_BACKEND_URL +
            `/courses/${courseId}/${sectionName}`
        );
        setData(res.data);
        setIsLoading(false);
      } catch (err) {
        console.log("sth wrong happened with loading section data", err);
      }
    };
    getData();
  }, []);

  ///////////////////////////////////////

  return (
    <div className="SectionView">
      {isLoading || !data ? (
        <LoadingSpinner />
      ) : (
        <VideoPlayer
          wordsPairList={data.sectionWordsPairList}
          subtitleSrc={
            import.meta.env.VITE_BACKEND_URL +
            `/static-files/courses-files/${data.courseName}/${sectionName}/${sectionName}.vtt`
          }
          videoSrc={
            import.meta.env.VITE_BACKEND_URL +
            `/static-files/courses-files/${data.courseName}/${sectionName}/${sectionName}.mp4`
          }
        />
      )}
    </div>
  );
}
export default SectionView;
