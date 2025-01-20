import { ArrowDownward, ArrowForward, SouthEastOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";

const SortStatus = ({ orderBy, order }) => {
    return (
        <Box
            sx={{
                position: "relative",
                bottom: "2px",
                width: "fit-content",
                border:
                    orderBy != "all"
                        ? order == "ascending"
                            ? "solid 1px #E5193B"
                            : "solid 1px #40C156"
                        : order == "ascending"
                            ? "solid 1px #40C156"
                            : "solid 1px #E5193B",
                borderRadius: "20px",
                padding: "0px 12px",
                background:
                    orderBy != "all"
                        ? order == "ascending"
                            ? "#FEF6F8"
                            : "#EDFAEB"
                        : order == "ascending"
                            ? "#EDFAEB"
                            : "#FEF6F8",
                color:
                    orderBy != "all"
                        ? order == "ascending"
                            ? "#E5193B"
                            : "#40C156"
                        : order == "ascending"
                            ? "#40C156"
                            : "#E5193B",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                }}
            >
                {orderBy == "x" ? (
                    <ArrowForward />
                ) : orderBy == "y" ? (
                    <ArrowDownward />
                ) : (
                    <SouthEastOutlined />
                )}
                <span style={{ position: "relative", bottom: "2px" }}>
                    {orderBy != "all"
                        ? order == "ascending"
                            ? orderBy == "x"
                                ? "Alta complexidade"
                                : "Baixo rendimento"
                            : orderBy == "x"
                                ? "Baixa complexidade"
                                : "Alta rendimento"
                        : order == "ascending"
                            ? "Alto rendimento"
                            : "Baixo rendimento"}
                </span>
            </div>
        </Box>
    );
}

export default SortStatus;