/* eslint-disable react-hooks/exhaustive-deps */
import Table from "../../../components/ui/Table";
import { useEffect, useState } from "react";
import ApproveAnalyst from "./ApproveAnalyst";
import RejectAnalyst from "./RejectAnalyst";

export default function AnalystRequest() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const ALL_USERS_URL = "http://127.0.0.1:5000/get_all_users";

  const requestHeader = ["Name", "Email", "Actions"];

  const actions = [
    (props) => (
      <ApproveAnalyst
        className="approve"
        {...props}
        handleApprove={handleApprove}
      />
    ),
    (props) => (
      <RejectAnalyst
        className="reject"
        {...props}
        handleReject={handleReject}
      />
    ),
  ];

  const handleApprove = () => {
    fetchPendingUsers();
  };

  const handleReject = () => {
    fetchPendingUsers();
  };

  const extractPendingUsers = (users) => {
    return Object.values(users).filter((user) => user.access === "waiting");
  };

  const extractUsersData = (users) => {
    return users.map((user) => {
      return [user.name, user.email];
    });
  };
  const extractUsersIDs = (users) => {
    return users.map((user) => user.email);
  };
  const fetchPendingUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(ALL_USERS_URL, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setPendingUsers(extractPendingUsers(data));
    } catch (error) {
      console.error("There was a problem fetching the users:", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchPendingUsers();
  }, []);

  return (
    <div className="analyst-request">
      <h1>Analyst Requests</h1>
      <p>Approve or reject analyst requests from users</p>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <Table
          data={extractUsersData(pendingUsers)}
          ids={extractUsersIDs(pendingUsers)}
          header={requestHeader}
          actions={actions}
        />
      )}
    </div>
  );
}
