import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
const initialValues = {
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
  passwordConfirm: "",
  gender: "",
};

const SignUpForm = () => {
  const [formValues, setFormValues] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:3001/users/1")
      .then((res) => setFormValues(res.data))
      .catch((err) => console.log(err));
  }, []);

  const onSubmit = (values) => {
    console.log("sex:", values);
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
  });

  const formik = useFormik({
    initialValues:formValues ||initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
    enableReinitialize:true,
  });



  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" {...formik.getFieldProps("name")} />
        </div>
        {formik.errors.name && formik.touched.name && (
          <div className="error">{formik.errors.name}</div>
        )}
        <div>
          <label>Email:</label>
          <input type="text" name="email" {...formik.getFieldProps("email")} />
        </div>
        {formik.errors.email && formik.touched.email && (
          <div className="error">{formik.errors.email}</div>
        )}
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            {...formik.getFieldProps("phoneNumber")}
          />
        </div>
        {formik.errors.phoneNumber && formik.touched.phoneNumber && (
          <div className="error">{formik.errors.phoneNumber}</div>
        )}
        <div>
          <label>Password:</label>
          <input
            type="text"
            name="password"
            {...formik.getFieldProps("password")}
          />
        </div>
        {formik.errors.password && formik.touched.password && (
          <div className="error">{formik.errors.password}</div>
        )}
        <div>
          <label>Password Confirm:</label>
          <input
            type="text"
            name="passwordConfirm"
            {...formik.getFieldProps("passwordConfirm")}
          />
        </div>
        {formik.errors.passwordConfirm && formik.touched.passwordConfirm && (
          <div className="error">{formik.errors.passwordConfirm}</div>
        )}
        <div className="formControl">
          <input
            type="radio"
            id="0"
            name="gender"
            value="0"
            onChange={formik.handleChange}
            checked={formik.values.gender === "0"}
          />
          <label htmlFor="0">Male</label>
          <input
            type="radio"
            id="1"
            name="gender"
            value="1"
            onChange={formik.handleChange}
            checked={formik.values.gender === "1"}
          />
          <label htmlFor="1">Female</label>
        </div>
        <button type="submit" disabled={!formik.isValid}>
          submit
        </button>
      </form>
    </>
  );
};

export default SignUpForm;
