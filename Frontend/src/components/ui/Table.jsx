/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */

const TableRow = ({ id, data, className, actions }) => {
  return (
    <div className={`table-row ${className}`}>
      {data.map((cell, index) => (
        <TableCell key={index} value={cell} />
      ))}
      {className !== "header" && (
        <TableActionCell>
          {actions.map((ActionComponent, index) => (
            <ActionComponent key={index} id={id} />
          ))}
        </TableActionCell>
      )}
    </div>
  );
};

function TableCell({ value }) {
  return <div className="table-cell">{value}</div>;
}

const TableActionCell = ({ children }) => {
  return <div className="table-cell action-cell">{children}</div>;
};

export default function Table({ ids, data, actions, header }) {
  return (
    <>
      <div className="table-container dataset-table">
        {header && <TableRow data={header} className="header" />}
        {data.map((row, index) => (
          <TableRow key={index} data={row} id={ids[index]} actions={actions} />
        ))}
      </div>
    </>
  );
}
