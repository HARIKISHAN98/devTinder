import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if(!connections) return;

  if(connections.length === 0) return <div>No connection found!</div> 
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>
      {connections.map((connection) => {
        const {_id, firstName, lastName, age, gender, photoURL, about } = connection;

        return <div key={_id} className="flex m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto">
          <div>
            <img src={photoURL} alt="photo" className="w-20 h-20 rounded-full"/>
          </div>
          <div className="text-left mx-4">
            <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
            {age && gender && <p>{age + ", " + gender}</p>}
            <p>{about}</p>
          </div>
        </div>;
      })}
    </div>
  );
};

export default Connections;
