import { useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";
import axios from "axios";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || null);
  const [lastName, setLastName] = useState(user.lastName || null);
  const [photoURL, setPhotoURL] = useState(user.photoURL || null);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "male");
  const [about, setAbout] = useState(user.about || null);
  const [error, setError] = useState();
  const [toast, showToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoURL,
          age,
          gender,
          about,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.user));
      showToast(true);
      setTimeout(() => {
        showToast(false);
      }, 3000);
    } catch (error) {
      setError(error.response?.data || "Login failed");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="flex justify-center mx-10">
        <div className="card card-border bg-base-200 w-96">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <div>
              <div className="mb-4 ">
                <legend className="fieldset-legend my-1">FirstName :</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Type your firstName"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setError("");
                  }}
                />
              </div>
              <div className="mb-4 ">
                <legend className="fieldset-legend my-1">LastName :</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Type your lastName"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setError("");
                  }}
                />
              </div>
              <div className="mb-4 ">
                <legend className="fieldset-legend my-1">photoURL :</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter your photoURL"
                  value={photoURL}
                  onChange={(e) => {
                    setPhotoURL(e.target.value);
                    setError("");
                  }}
                />
              </div>
              <div className="mb-4 ">
                <legend className="fieldset-legend my-1">Age :</legend>
                <input
                  type="number"
                  className="input"
                  placeholder="Enter your Age"
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                    setError("");
                  }}
                />
              </div>
              <div className="mb-4 ">
                <legend className="fieldset-legend my-1">Gender :</legend>
                <select
                  value={gender}
                  onChange={(e) => {
                    setGender(e.target.value);
                    setError("");
                  }}
                  className="select"
                >
                  <option disabled={true}>Select your Gender</option>
                  <option>male</option>
                  <option>female</option>
                  <option>other</option>
                </select>
              </div>
              <div className="mb-4 ">
                <legend className="fieldset-legend my-1">About :</legend>
                <textarea
                  type="text"
                  className="textarea"
                  placeholder="Enter About you."
                  value={about}
                  onChange={(e) => {
                    setAbout(e.target.value);
                    setError("");
                  }}
                />
              </div>
            </div>
            {error && <p className="text-error">{error}</p>}
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={() => saveProfile()}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard user={{ firstName, lastName, photoURL, about, age, gender }} />
      {toast && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-success">
              <span>Profile saved successfully.</span>
            </div>
          </div>
        )}
    </div>
  );
};

export default EditProfile;
