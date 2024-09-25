import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../main/components/Registration/formik/Input";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { ErrorMessage } from "formik";
import TextError from "../../main/components/Registration/formik/TextError";
import Progress from "./Progress";
import axios from "axios";

import WordItem from "./WordItem";

import "./wordImageInput.css";

function WordImageInput(props) {
  const [database, setDatabase] = useState([]);
  const [words, setWords] = useState([]);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  /////////////////////////
  const list = [
    {
      title: "Old Man's War",
      author: {
        firstName: "John",
        lastName: "Scalzi",
      },
    },
    {
      title: "The Lock Artist",
      author: {
        firstName: "Steve",
        lastName: "Hamilton",
      },
    },
    {
      title: "HTML5",
      author: {
        firstName: "Remy",
        lastName: "Sharp",
      },
    },
    {
      title: "Right Ho Jeeves",
      author: {
        firstName: "P.D",
        lastName: "Woodhouse",
      },
    },
    {
      title: "The Code of the Wooster",
      author: {
        firstName: "P.D",
        lastName: "Woodhouse",
      },
    },
    {
      title: "Thank You Jeeves",
      author: {
        firstName: "P.D",
        lastName: "Woodhouse",
      },
    },
    {
      title: "The DaVinci Code",
      author: {
        firstName: "Dan",
        lastName: "Brown",
      },
    },
    {
      title: "Angels & Demons",
      author: {
        firstName: "Dan",
        lastName: "Brown",
      },
    },
    {
      title: "The Silmarillion",
      author: {
        firstName: "J.R.R",
        lastName: "Tolkien",
      },
    },
    {
      title: "Syrup",
      author: {
        firstName: "Max",
        lastName: "Barry",
      },
    },
    {
      title: "The Lost Symbol",
      author: {
        firstName: "Dan",
        lastName: "Brown",
      },
    },
    {
      title: "The Book of Lies",
      author: {
        firstName: "Brad",
        lastName: "Meltzer",
      },
    },
    {
      title: "Lamb",
      author: {
        firstName: "Christopher",
        lastName: "Moore",
      },
    },
    {
      title: "Fool",
      author: {
        firstName: "Christopher",
        lastName: "Moore",
      },
    },
    {
      title: "Incompetence",
      author: {
        firstName: "Rob",
        lastName: "Grant",
      },
    },
    {
      title: "Fat",
      author: {
        firstName: "Rob",
        lastName: "Grant",
      },
    },
    {
      title: "Colony",
      author: {
        firstName: "Rob",
        lastName: "Grant",
      },
    },
    {
      title: "Backwards, Red Dwarf",
      author: {
        firstName: "Rob",
        lastName: "Grant",
      },
    },
    {
      title: "The Grand Design",
      author: {
        firstName: "Stephen",
        lastName: "Hawking",
      },
    },
    {
      title: "The Book of Samson",
      author: {
        firstName: "David",
        lastName: "Maine",
      },
    },
    {
      title: "The Preservationist",
      author: {
        firstName: "David",
        lastName: "Maine",
      },
    },
    {
      title: "Fallen",
      author: {
        firstName: "David",
        lastName: "Maine",
      },
    },
    {
      title: "Monster 1959",
      author: {
        firstName: "David",
        lastName: "Maine",
      },
    },
  ];
  const options = {
    // isCaseSensitive: false,
    // includeScore: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    // keys: ["title", "author.firstName"],
    keys: ["title"],
  };
  // const fuse = new Fuse(list, options);
  ///////////////////
  React.useEffect(() => {
    (function () {
      const dataRetreive = async () => {
        try {
          const retrievedDatabase = await sendRequest(
            process.env.REACT_APP_BACKEND_URL + "/database"
          );
          //// to add id key. we have _id key but I need id key.
          retrievedDatabase.forEach((data) => {
            data.id = data._id;
          });
          ////
          setDatabase(retrievedDatabase);
        } catch (err) {
          console.log("sth wrong happened");
        }
      };
      dataRetreive();
    })();
  }, []);
  React.useEffect(() => {
    (function () {
      const video = document.getElementById("vp-video");
      const track = document.getElementById("vp-track");
      const wordFilter = [
        "",
        ".",
        "?",
        "!",
        "a",
        "I",
        "an",
        "on",
        "that",
        "to",
        "is",
        "-",
      ];
      track.addEventListener(`load`, () => {
        // video.textTracks[0].cues.forEach((element) => console.log(element));
        // console.log(video.textTracks[0].cues);
        let wordId = 0;
        let allWords = [];
        for (let i = 0; i < video.textTracks[0].cues.length; i++) {
          // Runs 5 times, with values of step 0 through 4.
          // console.log(video.textTracks[0].cues[i]);
          let cue = video.textTracks[0].cues[i];
          let text = cue.text;
          text = text
            .replaceAll(".", " .")
            .replaceAll("?", " ?")
            .replaceAll("\n", " ");

          let cueWords = text.split(" ");
          cueWords = cueWords.map((word) => word.trim());
          cueWords = cueWords.filter((word) => !wordFilter.includes(word));

          cueWords = cueWords.map((word) => {
            wordId++;
            return {
              word: word,
              cueId: cue.id,
              id: wordId,
            };
          });

          allWords = [...allWords, ...cueWords];
        }
        setWords(allWords);
        // for (const cue in video.textTracks[0].cues) {
        //   console.log(cue);
        // }
      });
    })();
  }, []);

  // const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const FILE_SIZE = 300000000;
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "video/mp4",
  ];

  const initialValues = {
    word: "",
    hour: 1,
    minute: 1,
    second: 1,
    image: "",
  };

  const validationSchema = Yup.object().shape({
    word: Yup.string().required("Required"),
    hour: Yup.number().required("Required"),
    minute: Yup.number().required("Required"),
    second: Yup.number().required("Required"),
    image: Yup.mixed()
      .test("FILE_SIZE", "File Size is too large", (value) =>
        !value ? true : value.size <= FILE_SIZE
      )
      .test("SUPPORTED_FORMATS", "Unsupported File Format", (value) =>
        !value ? true : SUPPORTED_FORMATS.includes(value.type)
      ),
  });

  const history = useHistory();

  const onSubmit = async (values) => {
    // console.log(values);
    try {
      const formData = new FormData();
      formData.append("word", values.word);
      formData.append("hour", values.hour);
      formData.append("minute", values.minute);
      formData.append("second", values.second);
      formData.append("creator", props.userId);
      formData.append("image", values.image);

      console.log(formData);
      //   const responseData = await sendRequest(
      //     "http://localhost:5000/api/courses",
      //     "POST",
      //     formData
      //   );
      // } catch (err) {}

      const responseData = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/courses",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
          },
        }
      );
    } catch (err) {
      // if (err.response.status === 500) {
      //   setMessage('There was a problem with the server');
      // } else {
      //   setMessage(err.response.data.msg);
      // }
      // setUploadPercentage(0)
    }

    //   history.push("/");
  };

  return (
    <React.Fragment>
      <video id="vp-video" controls preload="metadata" className="d-none">
        {/* <source src={videosource} /> */}
        <track
          label="English"
          kind="subtitles"
          srcLang="en"
          // src="media/friends.s01e01_720p_bluray_x264-sujaidr.vtt"
          default
          id="vp-track"
        />
      </video>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => {
          return (
            <Form>
              <Input name="word" type="input" label="word" />
              <Input name="hour" type="input" label="hour" />
              <Input name="minute" type="input" label="minute" />
              <Input name="second" type="input" label="second" />
              <input
                name="image"
                type="file"
                label="image"
                onChange={(event) => {
                  formik.setFieldValue("image", event.currentTarget.files[0]);
                }}
              />
              {formik.errors.image ? (
                <div className="error">{formik.errors.image}</div>
              ) : null}
              <Progress percentage={uploadPercentage} />

              <button type="submit" disabled={!formik.isValid}>
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
}

export default WordImageInput;
