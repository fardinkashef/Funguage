import React from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../main/components/Registration/formik/Input";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

function WordInput(props) {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const initialValues = {
    word: "",
    hour: 1,
    minute: 1,
    second: 1,
  };

  const validationSchema = Yup.object().shape({
    word: Yup.string().required("Required"),
    hour: Yup.number().required("Required"),
    minute: Yup.number().required("Required"),
    second: Yup.number().required("Required"),
  });

  const history = useHistory();

  const onSubmit = async (values) => {
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/courses",
        "POST",
        JSON.stringify({
          word: values.word,
          hour: values.hour,
          minute: values.minute,
          second: values.second,
          creator: props.userId,
        }),
        { "Content-Type": "application/json" }
      );
      history.push("/");
    } catch (err) {}
  };

  return (
    <React.Fragment>
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

export default WordInput;
