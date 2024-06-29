import { CheckCheck, X } from "lucide-react";
import Table from "./Datasets/Table";

const requestHeader = ["Name", "Email", "Status", "Actions"];

//! Data should be fetched from the backend and formatted to this array
const requestsData = [
  ["Analyst 1", "analyst1@an.com", "Pending"],
  ["Analyst 2", "analyst2@an.com", "Pending"],
  ["Analyst 3", "analyst3@an.com", "Pending"],
  ["Analyst 4", "analyst4@an.com", "Pending"],
  ["Analyst 5", "analyst5@an.com", "Pending"],
  ["Analyst 6", "analyst6@an.com", "Pending"],
  ["Analyst 7", "analyst7@an.com", "Pending"],
];

//! Actions should be buttons that approve or reject the request
//! create functions to handle these actions
const actions = (
  <>
    <button className="approve">
      <CheckCheck size={18} />
    </button>
    <button className="reject">
      <X size={18} />
    </button>
  </>
);

export default function AnalystRequest() {
  return (
    <div className="analyst-request">
      <h1>Analyst Requests</h1>
      <p>Approve or reject analyst requests from users</p>

      <div className="">
        <Table data={requestsData} header={requestHeader} actions={actions} />
      </div>
    </div>
  );
}
