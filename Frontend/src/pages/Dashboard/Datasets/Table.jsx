/* eslint-disable react/prop-types */

const TableRow = ({ data, className, actions }) => {
  return (
    <div className={`table-row ${className}`}>
      {data.map((cell, index) => (
        <TableCell key={index} value={cell} />
      ))}
      {className !== "header" && <TableActionCell>{actions}</TableActionCell>}
    </div>
  );
};

function TableCell({ value }) {
  return <div className="table-cell">{value}</div>;
}

const TableActionCell = ({ children }) => {
  return <div className="table-cell action-cell">{children}</div>;
};

export default function Table({ data, actions, header}) {
  return (
    <>
      <div className="table-container dataset-table">
        {header && <TableRow data={header} className="header" />}
        {data.map((row, index) => (
          <TableRow
            key={index}
            data={row}
            actions={actions}
          />
        ))}
      </div>
    </>
  );
}
