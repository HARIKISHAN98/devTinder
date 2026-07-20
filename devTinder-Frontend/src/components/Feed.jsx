import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);

  const getFeed =  async () => {
    if(feed) return;
    try{
     const res = await axios.get(BASE_URL + "/user/feed",{withCredentials: true});
      dispatch(setFeed(res.data));
    } catch(error){
      console.log(error.message);
    }
  }

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center my-10">
      {feed && <UserCard user={feed.data[0]} />}
    </div>
  )
}

export default Feed;
