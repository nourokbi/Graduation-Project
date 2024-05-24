/* eslint-disable react/prop-types */
import EditFormModal from "./EditFormModal";
import DeleteModal from "./DeleteModal";

const TableRow = ({ data, className }) => {
  return (
    <div className={`table-row ${className}`}>
      {data.map((cell, index) => (
        <TableCell key={index} value={cell} />
      ))}
      {className !== "header" && <TableActionCell />}
    </div>
  );
};

function TableCell({ value }) {
  return <div className="table-cell">{value}</div>;
}

const TableActionCell = () => {
  return (
    <div className="table-cell">
      <EditFormModal />
      <DeleteModal />
    </div>
  );
};
//! Get data from the backend
const data = [
  ["Dataset Name", "Type", "Author", "Actions"],
  ["Dataset 1", "Tempreture", "Admin"],
  ["Dataset 2", "Percitipation", "Admin"],
  ["Dataset 3", "Tempreture", "Admin"],
  ["Dataset 4", "Percitipation", "Analyst1"],
  ["Dataset 5", "Tempreture", "Analyst1"],
  ["Dataset 6", "Percitipation", "Analyst2"],
  ["Dataset 7", "Tempreture", "Analyst2"],
  ["Dataset 8", "Heat Waves", "Admin"],
  ["Dataset 9", "Tempreture", "Analyst3"],
  ["Dataset 10", "Percitipation", "Admin2"],
];

export default function Table() {
  return (
    <>
      <div className="table-container dataset-table">
        {data.map((row, index) => (
          <TableRow
            key={index}
            data={row}
            className={index === 0 ? "header" : ""}
          />
        ))}
      </div>
    </>
  );
}
