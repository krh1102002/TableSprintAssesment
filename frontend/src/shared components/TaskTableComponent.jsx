import React from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { FaSort, FaSortUp, FaSortDown, FaEdit, FaTrash } from "react-icons/fa";

const data = [
  {
    id: 123,
    categoryName: "Dal & Pulses",
    image: "url_to_image",
    status: "Active",
    sequence: 1,
  },
  {
    id: 124,
    categoryName: "Ghee & Oils",
    image: "url_to_image",
    status: "Inactive",
    sequence: 2,
  },
  // ... more data
];
const TaskTable = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Category name",
        accessor: "categoryName",
      },
      {
        Header: "Image",
        accessor: "image",
        Cell: ({ value }) => (
          <img
            src={value}
            alt="category"
            style={{ width: "50px", height: "50px" }}
          />
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <span style={{ color: value === "Active" ? "green" : "red" }}>
            {value}
          </span>
        ),
      },
      {
        Header: "Sequence",
        accessor: "sequence",
      },
      {
        Header: "Action",
        Cell: () => (
          <div>
            <button
              style={{ marginRight: "5px", background: "none", border: "none" }}
            >
              <FaEdit />
            </button>
            <button style={{ background: "none", border: "none" }}>
              <FaTrash />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    useTable(
      {
        columns,
        data,
        initialState: { pageIndex: 0, pageSize: 10 },
      },
      useSortBy,
      usePagination
    );

  return (
    <table
      {...getTableProps()}
      style={{ width: "100%", borderCollapse: "collapse" }}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr
            {...headerGroup.getHeaderGroupProps()}
            style={{ backgroundColor: "#FFF8B7" }}
          >
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                style={{
                  borderBottom: "solid 3px #ddd",
                  padding: "10px",
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              >
                {column.render("Header")}
                <span>
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <FaSortDown />
                    ) : (
                      <FaSortUp />
                    )
                  ) : (
                    <FaSort />
                  )}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} style={{ backgroundColor: "#F2F2F2" }}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: "10px",
                      borderBottom: "solid 1px #ddd",
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TaskTable;
