import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import CheckBoxInput from "./common/CheckBoxInput";
import Input from "./common/Input";
import RadioInput from "./common/RadioInput";
import SelectComponent from "./common/SelectComponent";
const initialValues = {
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
  passwordConfirm: "",
  gender: "",
  nationality: "",
  interests: [],
  terms: false,
};

const SignUpForm = () => {
  const [formValues, setFormValues] = useState(null);

  const checkBoxOptions = [
    { label: "React.js", value: "React.js" },
    { label: "Angular", value: "Angular" },
  ];

  const radioOptions = [
    { label: "Male", value: "0" },
    { label: "Female", value: "1" },
    { label: "SheMale", value: "2" },
  ];

  const selectOptions = [
    { label: "Select Nationality ...", value: "" },
    { label: "Iran", value: "IR" },
    { label: "USA", value: "US" },
    { label: "Germany", value: "GER" },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:3001/users/1")
      .then((res) => setFormValues(res.data))
      .catch((err) => console.log(err));
  }, []);

  const onSubmit = (values) => { 
    //console.log(values); 
    axios
      .post("http://localhost:3001/users",values)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("name is required"),
    email: Yup.string().email("format invalid").required("email is required"),
    phoneNumber: Yup.string().required("phoneNumber is required"),
    password: Yup.string().required("password required"),
    passwordConfirm: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
    gender: Yup.string().required("gender is required"),
    nationality: Yup.string().required("Please select nationality.."),
    interests: Yup.array().min(1).required("Please select one expersist.."),
    terms: Yup.boolean()
      .required("The terms and conditions must be accepted.")
      .oneOf([true], "The terms and conditions must be accepted."),
  });

  const formik = useFormik({
    initialValues: formValues || initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Input name="name" type="text" label="Name" formik={formik} />
        <Input name="email" type="text" label="Email" formik={formik} />
        <Input
          name="phoneNumber"
          type="text"
          label="Phone Number"
          formik={formik}
        />
        <Input name="password" type="text" label="Password" formik={formik} />
        <Input
          name="passwordConfirm"
          type="text"
          label="ConfirmPassword"
          formik={formik}
        />

        <RadioInput formik={formik} radioOptions={radioOptions} name="gender" />

        <SelectComponent
          selectOptions={selectOptions}
          formik={formik}
          name="nationality"
        />

        <CheckBoxInput
          formik={formik}
          chechBoxOptions={checkBoxOptions}
          name="interests"
        />
        <input
          type="checkBox"
          id="terms"
          name="terms"
          value={true}
          onChange={formik.handleChange}
          checked={formik.values.terms}
        />
        <label htmlFor="terms">Terms and conditions</label>

        <button type="submit" disabled={!formik.isValid}>
          submit
        </button>
      </form>
    </>
  );
};

export default SignUpForm;
