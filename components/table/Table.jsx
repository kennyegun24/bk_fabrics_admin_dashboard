import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableLoading from "@/loaders/TableLoading";
import { StyledTableCell } from "../mui/StyledComponents";
import { FaPlus } from "react-icons/fa6";

const TableComponent = ({
  isLoading,
  error,
  tableHead,
  tableBody,
  navigate,
  btn,
}) => {
  return (
    <div
      style={{
        height: 600,
        width: "100%",
        padding: "2rem",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <TableContainer
        component={Paper}
        sx={{ minWidth: 700, maxHeight: 500, border: "1px solid #91C3F4" }}
      >
        {!isLoading && !error ? (
          <Table stickyHeader aria-label="customized table">
            <TableHead>
              <TableRow>
                {tableHead.map((each, _) => (
                  <StyledTableCell key={_} sx={{ minWidth: each.width }}>
                    {each.label}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{tableBody}</TableBody>
          </Table>
        ) : (
          <TableLoading />
        )}
      </TableContainer>
      {btn && (
        <button
          style={{
            background: "#91C3F4",
            padding: "1rem 1.5rem",
            border: "none",
            width: "fit-content",
            fontWeight: 700,
            borderRadius: "8px",
            alignSelf: "center",
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={navigate}
        >
          <FaPlus style={{ background: "transparent" }} />
          {btn}
        </button>
      )}
    </div>
  );
};

export default TableComponent;
