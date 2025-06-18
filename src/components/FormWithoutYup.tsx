import { useState } from "react";
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  age: string;
  gender: string;
  interssts: string[]; // assumed to be array of strings
  birthDate: string;
}

const FormWithoutYup = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    interssts: [],
    birthDate: "",
  });
  const ValidateForm = () => {
    return true;
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const isValid = ValidateForm();
    if (isValid) {
      console.log(formData);
    } else {
      console.log("Form Validation Failed");
    }
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleCheckBoxChange = (e: any) => {
    const { name, checked } = e.target;
    let updatedInterests = [...formData.interssts];
    if (checked) {
      updatedInterests.push(name);
    } else {
      updatedInterests = updatedInterests.filter(
        (interest) => interest !== name
      );
    }
    setFormData({
      ...formData,
      interssts: updatedInterests,
    });
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
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="number"
            name="phoneNumber"
            value={formData.phoneNumber}
            placeholder="Enter Phone Number"
            onChange={handleChange}
          />
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
        </div>
        <div>
          <label htmlFor="gender">Gender</label>
          <select name="gender" id="gender">
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="other">other</option>
          </select>
        </div>
        <div>
          <label htmlFor="interssts">Interssts</label>
          <label>
            <input
              type="checkbox"
              name="coding"
              checked={formData.interssts.includes("coding")}
              onChange={handleCheckBoxChange}
            />
            coding
          </label>
          <label>
            <input
              type="checkbox"
              name="sports"
              checked={formData.interssts.includes("sports")}
              onChange={handleCheckBoxChange}
            />
            sports
          </label>
          <label>
            <input
              type="checkbox"
              name="reading"
              checked={formData.interssts.includes("reading")}
              onChange={handleCheckBoxChange}
            />
            reading
          </label>
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
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default FormWithoutYup;
