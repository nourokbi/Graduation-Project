/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { X } from "lucide-react";

export default function RejectAnalyst({ id, handleReject, className }) {
  const rejectAnalyst = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/delete_user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ access: "rejected" }),
      });
      console.log("Reject", id);
      handleReject();
    } catch (error) {
      console.error(`There was a problem rejecting the user: ${error}`);
    }
  };

  return (
    <button className={className} onClick={rejectAnalyst}>
      <X size={18} />
    </button>
  );
}
