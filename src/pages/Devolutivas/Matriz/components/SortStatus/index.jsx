import {
  ArrowDownward,
  ArrowForward,
  SouthEastOutlined,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import PropTypes from "prop-types";

const SortStatus = ({ orderBy, order }) => {
  return (
    <Box
      sx={{
        position: "relative",
        bottom: "2px",
        width: "fit-content",
        border:
          order == "pattern"
            ? "solid 1px #bebebe"
            : orderBy != "all"
            ? order == "ascending"
              ? "solid 1px #40C156"
              : "solid 1px #E5193B"
            : order == "ascending"
            ? "solid 1px #40C156"
            : "solid 1px #E5193B",
        borderRadius: "20px",
        padding: "0px 12px",
        background:
          order == "pattern"
            ? "#F9F9F9"
            : orderBy != "all"
            ? order == "ascending"
              ? "#EDFAEB"
              : "#FEF6F8"
            : order == "ascending"
            ? "#EDFAEB"
            : "#FEF6F8",
        color:
          order == "pattern"
            ? "#677080"
            : orderBy != "all"
            ? order == "ascending"
              ? "#40C156"
              : "#E5193B"
            : order == "ascending"
            ? "#40C156"
            : "#E5193B",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {order == "pattern" ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span style={{ position: "relative", bottom: "0px" }}>
            Ordem Padrão
          </span>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {orderBy == "y" ? (
            <ArrowForward />
          ) : orderBy == "x" ? (
            <ArrowDownward />
          ) : (
            <SouthEastOutlined />
          )}
          <span style={{ position: "relative", bottom: "2px" }}>
            {orderBy != "all"
              ? order == "ascending"
                ? orderBy == "x"
                  ? "Rendimento Crescente"
                  : "Facilidade Crescente"
                : orderBy == "y"
                ? "Facilidade Decrescente"
                : "Rendimento Decrescente"
              : order == "ascending"
              ? "Alto rendimento"
              : "Baixo rendimento"}
          </span>
        </div>
      )}
    </Box>
  );
};
SortStatus.propTypes = {
  orderBy: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
};

export default SortStatus;
