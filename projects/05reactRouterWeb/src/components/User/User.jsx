import { useParams } from "react-router-dom";

const User = () => {
  const { userId } = useParams();
  return <div className="text-center">User: {userId}</div>;
};

export default User;
