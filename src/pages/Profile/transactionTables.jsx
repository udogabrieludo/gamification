import styles from "./styles.module.css";

const Table = ({ tableHeader = [], children }) => {
  return (
    <div className={`mt-1 table-responsive`}>
      <table className={`${styles.table} table mb-2`}>
        <thead style={{ color: "white", }}>
          <tr>
            {tableHeader.map((header) => {
              return (
                <th className="transaction_tables" style={{ textTransform: "uppercase" }} scope="col">
                  {header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
