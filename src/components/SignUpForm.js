import { useState } from "react";

const SignUpForm = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    //setUserData( {[e.target.name]: e.target.value });
  };

  const submitHandler=(e)=>{
    e.preventDefault();
    console.log("submitted");
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={changeHandler}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={userData.email}
            onChange={changeHandler}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="text"
            name="password"
            value={userData.password}
            onChange={changeHandler}
          />
        </div>
        <button >submit</button>
      </form>
    </>
  );
};

export default SignUpForm;
