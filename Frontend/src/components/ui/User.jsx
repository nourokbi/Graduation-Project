/* eslint-disable react/prop-types */
import { useAuth } from "../../contexts/authContext"; // Assuming useAuth hook from authContext
import {
  Avatar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";

const User = ({ onLogOut }) => {
  const { userData } = useAuth();

  return (
    <Popover placement="bottom-end" showArrow={true}>
      <PopoverTrigger>
        <button className="user-btn" style={{ color: "black" }}>
          <Avatar />
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <ul className="p-6 text-large">
          <Avatar
            className="m-auto mb-6 font-1000"
            name={userData.name[0].charAt(0).toUpperCase()}
            size="lg"
          />
          <li>
            <span className="font-bold">Name: </span>
            {userData.name[0].charAt(0).toUpperCase() + userData.name.slice(1)}
          </li>
          <li className="my-2">
            <span className="font-bold">Email: </span> {userData?.email}
          </li>
          <li className="mb-5">
            <span className="font-bold">Access: </span>
            {userData?.access === "waiting"
              ? "Waiting for approval"
              : userData?.access !== "admin"
              ? "Analyst"
              : "Admin"}
          </li>
          <li>
            <button className="logout-btn" onClick={onLogOut}>
              Log Out
            </button>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default User;
