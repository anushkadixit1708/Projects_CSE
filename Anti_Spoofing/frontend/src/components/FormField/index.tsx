import ErrorIconFill from "remixicon-react/ErrorWarningFillIcon";
import { ErrorMessage, Field, FieldProps, getIn } from "formik";
import { createContext, FC, ReactNode, useContext } from "react";
import FileUpload from "./FileUpload";
import DatePicker from "./DatePicker";
// import { possibleParentRoles, rolesEnum } from "../../constants";
import Description from "./subparts/Description";

const getLabelText = (str: string) => {
  // adding space between strings
  const result = str.replace(/([A-Z])/g, " $1");

  // converting first character to uppercase and join it to the final string
  const final = result.charAt(0).toUpperCase() + result.slice(1);

  return final; // "My Name"
};
const Context = createContext<{ schema: any }>({ schema: undefined });

export const ValidationSchemaProvider = (props: {
  schema: any;
  children: ReactNode;
}) => {
  const { schema, children } = props;

  return <Context.Provider value={{ schema }}>{children}</Context.Provider>;
};

export const useValidationSchemaContext = () => {
  const { schema } = useContext(Context);

  const IsRequired = (name: string) => {
    const fieldValidationSchema = schema
      ? getIn(schema.describe().fields, name)
      : false;
    const tests = fieldValidationSchema ? fieldValidationSchema.tests : false;
    const isRequired = tests
      ? !!tests.find((test: { name: string }) => test.name === "required")
      : false;

    return isRequired;
  };

  return {
    IsRequired,
  };
};

export const isRequiredField = (
  { validationSchema }: { validationSchema: any },
  name: string
) =>
  !!getIn(validationSchema.describe().fields, name).tests.find(
    (testName: string) => testName === "required"
  );

export type FormFieldTypes = "password" | "date" | "user" | "pincode";
const FormField = ({
  name,
  fieldLabel = "",
  placeholder,
  description = "",
  disabled = false,
  as = "input",
  options = [],
  className = "",
  type,
  marginTop = 12,
  marginBottom = 12,
}: {
  name: string;
  fieldLabel?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  type?: FormFieldTypes;
  as?: "select" | "textarea" | "input" | "file";
  options?: string[];
  className?: string;
  marginTop?: number;
  marginBottom?: number;
  roleField?: string;
  excludeUsers?: string[];
}) => {
  fieldLabel = fieldLabel || getLabelText(name);
  const { IsRequired } = useValidationSchemaContext();
  const required = IsRequired(name);
  const CustomFormField: FC<FieldProps> = ({ field, form }) => {
    const commonClassName = "w-full border-1.5 py-3 px-4 rounded-small";

    const errorFieldClassName =
      !disabled && form.errors[field.name] && form.touched[field.name]
        ? "bg-red-100 border-danger"
        : "focus:border-primary";

    const disabledClassName = disabled
      ? "opacity-50 border-grey-300 text-grey-600"
      : "text-black";

    const combinedFieldClassName = `${commonClassName} ${errorFieldClassName} ${disabledClassName} ${className}`;
    return (
      <div
        className="flex flex-col flex-1"
        style={{
          marginTop,
          marginBottom,
        }}
      >
        <div className="flex my-2">
          <div className={disabled ? "text-grey-600" : ""}>{fieldLabel}</div>
          {required && (
            <div className="text-red-600 rounded-small text-body-4 ml-0.5">
              *
            </div>
          )}
        </div>

        {type === "date" ? (
          <DatePicker
            className={combinedFieldClassName}
            value={form.values[name]}
            disabled={disabled}
            setValue={(v: Date) => {
              form.setFieldValue(name, v);
            }}
          />
        ) : as === "input" || as === "textarea" ? (
          <Field
            name={name}
            as={as}
            placeholder={placeholder}
            disabled={disabled}
            type={type}
            className={combinedFieldClassName}
          />
        ) : as === "file" ? (
          <FileUpload
            name={name}
            value={form.values[name]}
            setValue={(value: string) => {
              form.setFieldValue!(name, value);
            }}
          />
        ) : (
          <Field
            name={name}
            as={as}
            placeholder={placeholder}
            disabled={disabled}
            className={`${commonClassName} ${errorFieldClassName} ${disabledClassName}`}
          >
            {options.length > 0 &&
              as === "select" &&
              options.map((option) => {
                return (
                  <option value={option} key={option}>
                    {option}
                  </option>
                );
              })}
          </Field>
        )}
        <ErrorMessage name={name}>
          {(msg) => {
            return (
              <div className="flex items-center bg-red-100 rounded-small px-4 py-1.5 my-2">
                <ErrorIconFill className="h-4 text-danger" />
                <div className="text-danger ml-1 text-body-4 font-medium">
                  {msg}
                </div>
              </div>
            );
          }}
        </ErrorMessage>
        <Description
          description={description}
          // type={type}
          value={form.values[name]}
        />
      </div>
    );
  };
  return <Field name={name} component={CustomFormField} />;
};

export default FormField;
