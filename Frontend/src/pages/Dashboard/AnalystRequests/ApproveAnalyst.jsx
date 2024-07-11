/* eslint-disable react/prop-types */

import { CheckCheck } from "lucide-react";

export default function ApproveAnalyst({ id, handleApprove, className }) {
  const approveAnalyst = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/update_user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ access: id }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      console.log(`User with id ${id} has been approved`);
      handleApprove();
    } catch (error) {
      console.error(`There was a problem approving the user: ${error}`);
    }
  };

  return (
    <button className={className} onClick={approveAnalyst}>
      <CheckCheck size={18} />
    </button>
  );
}
