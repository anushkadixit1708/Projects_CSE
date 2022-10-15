import Button from "../../components/Button";
import { Form, Formik } from "formik";
import FormField, {
  ValidationSchemaProvider,
} from "../../components/FormField";
import * as Yup from "yup";
import ImageWindow from "../../components/ImageWindow";
import axiosForBackend from "../../utils/axiosForBackend";
import { useState } from "react";
const validation = Yup.object().shape({
  pin: Yup.string().required("pin is required").min(6).max(6),
});

const Access = () => {
  const [secret, setSecret] = useState("");
  return (
    <div className="min-h-screen">
      <div className="container flex flex-col items-center pt-8">
        <ImageWindow />
        <Formik
          initialValues={{
            pin: "",
          }}
          onSubmit={(values) => {
            axiosForBackend
              .post<{
                secret: string;
              }>("/user", {
                pin: values.pin,
              })
              .then((res) => {
                setSecret(res.data.secret);
              })
              .catch((err) => {
                setSecret(err.toString());
              });
          }}
          validationSchema={validation}
          key={1}
        >
          <Form className="flex w-1/2">
            <ValidationSchemaProvider schema={validation}>
              <FormField
                name="pin"
                placeholder="Enter PIN Here"
                marginBottom={0}
                marginTop={0}
              />
              <div className="ml-2 pt-10">
                <Button theme="danger" text="2F Authenticate" icon="password" />
              </div>
            </ValidationSchemaProvider>
          </Form>
        </Formik>
        {secret && (
          <>
            <h2 className="text-title-5 my-4">Secret:</h2>
            <div className="bg-grey-100 p-4 w-1/2 mt-4 rounded-large">
              {secret}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Access;
