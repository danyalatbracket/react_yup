import { useState } from "react";
import * as Yup from "yup";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number | null;
  password: string;
  confirmPassword: string;
  age: string;
  gender: string;
  interests: string[]; // assumed to be array of strings
  birthDate: string;
}

type FormErrors = {
  [K in keyof FormData]?: string;
};

const FormWithYup = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: null,
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    interests: [],
    birthDate: "",
  });

  const [errors, setErrors] = useState<FormErrors | null>(null);

  const ValidateFormWithYup = Yup.object<FormData>({
    firstName: Yup.string().required("First Name is Required"),
    lastName: Yup.string().required("Last Name is Required"),
    email: Yup.string()
      .required("Email is Required")
      .email("Email is Not Valid"),
    phoneNumber: Yup.number()
      .required("Phone Number is Required")
      .min(10000000000, "Min 11 digits required"), // Here 10000000000 is count of digits (i.e 11 not value)
    password: Yup.string()
      .required("Password is Required")
      .min(8, "Password Must at least 8 characters")
      .matches(
        /[!@#$%^&*()<>?":|<>]/,
        "Password Must Contain At least One Symbol"
      )
      .matches(/[0-9]/, "Password Must Contain At least One Number")
      .matches(/[A-Z]/, "Password Must Contain At least One Uppercase letter")
      .matches(/[a-z]/, "Password Must Contain At least One lowercase letter"),
    confirmPassword: Yup.string()
      .required("Confirm Password is Required")
      .oneOf([Yup.ref("password")], "Password Not Matched"),
    age: Yup.number()
      .typeError("Age must be a number")
      .required("Age is Required")
      .min(18, "Min age is 18")
      .max(100, "Max age is 100"),
    gender: Yup.string().required("Gender is Required"),
    interests: Yup.array()
      .required("Choose At least one Interest")
      .min(1, "f one Interest"),
    birthDate: Yup.string().required("DOB is required"),
  });

  const ValidateForm = async () => {
    let Valid = null;
    try {
      Valid = await ValidateFormWithYup.validate(formData, {
        abortEarly: false,
      });
      setErrors(null);
    } catch (error: any) {
      const newErrors: any = {};
      error.inner.forEach((err: any) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }

    return Valid;
  };

  const validateField = async (name: keyof FormData, value: any) => {
    try {
      const schema = Yup.reach(ValidateFormWithYup, name);
      if (typeof (schema as any).validate === "function") {
        await (schema as Yup.AnySchema).validate(value);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      }
    } catch (err: any) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: err.message }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const valid = await ValidateForm();
    if (valid) {
      console.log(formData);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    validateField(name as keyof FormData, value);
  };

  const handleCheckBoxChange = (e: any) => {
    debugger;
    const { name, checked } = e.target;
    let updatedInterests = [...formData.interests];

    if (checked) {
      updatedInterests.push(name);
    } else {
      updatedInterests = updatedInterests.filter(
        (interest) => interest !== name
      );
    }

    setFormData({
      ...formData,
      interests: updatedInterests,
    });
    validateField("interests", updatedInterests);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            placeholder="Enter First Name"
            onChange={handleChange}
          />
          {errors?.firstName && <p className="error">{errors?.firstName}</p>}
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            placeholder="Enter Last Name"
            onChange={handleChange}
          />
          {errors?.lastName && <p className="error">{errors?.lastName}</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter Email"
            onChange={handleChange}
          />
          {errors?.email && <p className="error">{errors?.email}</p>}
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="number"
            name="phoneNumber"
            value={formData.phoneNumber ?? ""}
            placeholder="Enter Phone Number"
            onChange={handleChange}
          />
          {errors?.phoneNumber && (
            <p className="error">{errors?.phoneNumber}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Enter Password"
            onChange={handleChange}
          />
          {errors?.password && <p className="error">{errors?.password}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Re Enter Password"
            onChange={handleChange}
          />
          {errors?.confirmPassword && (
            <p className="error">{errors?.confirmPassword}</p>
          )}
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input
            type="text"
            name="age"
            value={formData.age}
            placeholder="Enter Age"
            onChange={handleChange}
          />
          {errors?.age && <p className="error">{errors?.age}</p>}
        </div>
        <div>
          <label htmlFor="gender">Gender</label>
          <select
            name="gender"
            id="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors?.gender && <p className="error">{errors?.gender}</p>}
        </div>
        <div>
          <label htmlFor="interests">interests</label>
          <label>
            <input
              type="checkbox"
              name="coding"
              onChange={handleCheckBoxChange}
              checked={formData.interests.includes("coding")}
            />
            coding
          </label>
          <label>
            <input
              type="checkbox"
              name="sports"
              onChange={handleCheckBoxChange}
              checked={formData.interests.includes("sports")}
            />
            sports
          </label>
          <label>
            <input
              type="checkbox"
              name="reading"
              onChange={handleCheckBoxChange}
              checked={formData.interests.includes("reading")}
            />
            reading
          </label>
          {errors?.interests && <p className="error">{errors?.interests}</p>}
        </div>
        <div>
          <label htmlFor="birthDate">Birth Date</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            placeholder="Enter Birth Date"
            onChange={handleChange}
          />
          {errors?.birthDate && <p className="error">{errors?.birthDate}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default FormWithYup;
