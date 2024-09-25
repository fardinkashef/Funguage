import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Formik, Form, useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../main/components/Registration/formik/Input";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";

const UpdateCourse = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedCourse, setLoadedCourse] = useState();
  const courseId = useParams().courseId;
  const history = useHistory();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/courses/${courseId}`
        );
        setLoadedCourse(responseData.course);
      } catch (err) {}
    };
    fetchCourse();
  }, [sendRequest, courseId]);

  const initialValues = {
    word: loadedCourse?.word || "",
    hour: loadedCourse?.hour || "",
    minute: loadedCourse?.minute || "",
    second: loadedCourse?.second || "",
  };

  const validationSchema = Yup.object({
    word: Yup.string().required("Required"),
    hour: Yup.number().required("Required"),
    minute: Yup.number().required("Required"),
    second: Yup.number().required("Required"),
  });

  const courseUpdateSubmitHandler = async (values) => {
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL +`/courses/${courseId}`,
        "PATCH",
        JSON.stringify({
          word: values.word,
          hour: values.hour,
          minute: values.minute,
          second: values.second,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      history.push("/courses/user/" + props.userId);
    } catch (err) {}
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <Formik
        initialValues={initialValues}
        onSubmit={courseUpdateSubmitHandler}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {(formik) => {
          return (
            <Form className="course-form">
              <Input name="word" type="input" label="word" />
              <Input name="hour" type="input" label="hour" />
              <Input name="minute" type="input" label="minute" />
              <Input name="second" type="input" label="second" />
              <button type="submit" disabled={!formik.isValid}>
                UPDATE Course
              </button>
            </Form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};
export default UpdateCourse;
