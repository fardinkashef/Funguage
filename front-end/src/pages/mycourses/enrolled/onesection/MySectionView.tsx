import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./MySectionView.scss";
import axios from "axios";
import LoadingSpinner from "@/components/shared/components/LoadingSpinner";
import VideoPlayer from "@/components/courses/view/video-player/VideoPlayer.tsx";
import { wordsPairList } from "@/shared/types/wordDataTypes";

type mySectionData = {
  courseName: string;
  sectionWordsPairList: wordsPairList;
  reviewWordIds: string[];
};

function MySectionView() {
  const { courseId, sectionName } = useParams();
  ///////////////////
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<mySectionData | null>(null);

  //////
  const setWordsPairList = (newWordsPairList: wordsPairList) => {
    if (!data) return;
    setData({
      ...data,
      sectionWordsPairList: newWordsPairList,
    });
  };
  const setReviewWordIds = (newReviewWordIds: string[]) => {
    if (!data) return;
    setData({
      ...data,
      reviewWordIds: newReviewWordIds,
    });
  };
  ///////////////////////////////
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios(
          import.meta.env.VITE_BACKEND_URL +
            `/mycourses/${courseId}/${sectionName}`
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
    <div className="MySectionView">
      {isLoading || !data ? (
        <LoadingSpinner />
      ) : (
        <VideoPlayer
          wordsPairList={data.sectionWordsPairList}
          setWordsPairList={setWordsPairList}
          reviewWordIds={data.reviewWordIds}
          setReviewWordIds={setReviewWordIds}
          /////////
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
export default MySectionView;
