import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { addRequests, removeRequest } from "../utils/requestsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  const fetchRequests = async () => {
    try {
      const requests = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(requests?.data?.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleReviewRequest = async (status,_id) => {
    try{
       const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id,{},{
        withCredentials:true
       });
       dispatch(removeRequest(_id));
    } catch(err){
      console.log(err.message);
    }
  }

  if (!requests) return;

  if (requests.length === 0) return <h1 className="flex justify-center text-xl my-2">No Requests Found.</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connection Requests</h1>
      {requests.map((connection) => {
        const { _id, firstName, lastName, age, gender, photoURL, about } =
          connection.fromUserId;

        return (
          <div
            key={_id}
            className="flex m-4 p-4 items-center justify-between rounded-lg bg-base-300 w-2/3 mx-auto"
          >
            <div>
              <img
                src={photoURL}
                alt="photo"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
              <button className="btn btn-primary mx-2" onClick={() => handleReviewRequest("rejected",connection._id)}>Reject</button>
              <button className="btn btn-secondary mx-2" onClick={() => handleReviewRequest("accepted",connection._id)}>Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
