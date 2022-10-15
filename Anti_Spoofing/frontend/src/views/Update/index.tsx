import FormField, {
  ValidationSchemaProvider,
} from "../../components/FormField";
import ImageWindow from "../../components/ImageWindow";
import * as Yup from "yup";
import axiosForBackend from "../../utils/axiosForBackend";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import Button from "../../components/Button";

const validation = Yup.object().shape({
  pin: Yup.string().required("pin is required").min(6).max(6),
});

const Update = () => {
  return (
    <div className="container">
      <ImageWindow />
      <Formik
        initialValues={{
          pin: "",
          newSecret: "",
        }}
        onSubmit={(values) => {
          console.log("reqbody", values);
          axiosForBackend
            .patch<string>("/user", values)
            .then(() => {
              toast.success("Secret updated");
            })
            .catch((err) => {
              toast.error(err.toString());
            });
        }}
        validationSchema={validation}
        key={1}
      >
        <Form className="flex flex-col w-1/2 mx-auto">
          <ValidationSchemaProvider schema={validation}>
            <FormField
              name="pin"
              placeholder="Enter PIN Here"
              marginBottom={0}
              marginTop={0}
            />
            <FormField
              name="newSecret"
              placeholder="Enter new secret value here"
              marginBottom={0}
              marginTop={0}
            />
            <div className="ml-2 pt-10">
              <Button theme="danger" text="Update Secret" icon="password" />
            </div>
          </ValidationSchemaProvider>
        </Form>
      </Formik>
    </div>
  );
};
export default Update;
