import { Box, Typography, Button } from "@mui/material";
import { Place, School, People } from "@mui/icons-material";

const ContextBox = ({ assessment, school, exam, selectedClass, onChangeContext, onPrint }) => {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            marginTop={4}
            bgcolor={"#F7F8FA"}
            border={"1px solid #CACDD5"}
            borderRadius={1}
            width={"100%"}
            paddingBlock={2}
        >
            {/* Context */}
            <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"start"}
                padding={2}
                marginLeft={2}
            >
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        fontFamily: "Poppins",
                        fontSize: "22px",
                        fontWeight: 500,
                        lineHeight: "32px",
                        textAlign: "left",
                        textUnderlinePosition: "from-font",
                        textDecorationSkipInk: "none",
                        color: "#0F1113",
                    }}
                >
                    {assessment.title}
                    {exam.id !== "all" && ` / ${exam.name}`}
                </Typography>
                <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    gap={"10px"}
                >
                    <Box display={"flex"} gap={"5px"}>
                        <Place sx={{ color: "#677080", fontSize: 20 }} />
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                fontFamily: "Poppins",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "24px",
                                textAlign: "left",
                                textUnderlinePosition: "from-font",
                                textDecorationSkipInk: "none",
                                color: "#677080",
                            }}
                        >
                            Ceará, Fortaleza
                        </Typography>
                    </Box>
                    <Box display={"flex"} gap={"5px"}>
                        <School sx={{ color: "#677080", fontSize: 20 }} />
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                fontFamily: "Poppins",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "24px",
                                textAlign: "left",
                                textUnderlinePosition: "from-font",
                                textDecorationSkipInk: "none",
                                color: "#677080",
                            }}
                        >
                            {school.name}
                        </Typography>
                    </Box>
                    <Box display={"flex"} gap={"5px"}>
                        <People sx={{ color: "#677080", fontSize: 20 }} />
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                fontFamily: "Poppins",
                                fontSize: "14px",
                                fontWeight: 500,
                                lineHeight: "24px",
                                textAlign: "left",
                                textUnderlinePosition: "from-font",
                                textDecorationSkipInk: "none",
                                color: "#677080",
                            }}
                        >
                            {selectedClass.name}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            {/* Buttons */}
            <Box display={"flex"} alignItems={"end"} marginRight={3}
            >
                <Button
                    variant="contained"
                    onClick={onChangeContext}
                    sx={{
                        bgcolor: "#365BDC",
                        marginRight: 2,
                        fontFamily: "Poppins",
                        fontSize: "16px",
                        fontWeight: 600,
                        lineHeight: "20px",
                        textAlign: "left",
                        textUnderlinePosition: "from-font",
                        textDecorationSkipInk: "none",
                        padding: "12px 20px",
                    }}
                >
                    ALTERAR CONTEXTO
                </Button>
                <Button
                    variant="contained"
                    onClick={onPrint}
                    sx={{
                        bgcolor: "#FFFFFF",
                        border: "1px solid #CACDD5",
                        color: "#1D2432",
                        fontFamily: "Poppins",
                        fontSize: "16px",
                        fontWeight: 600,
                        lineHeight: "20px",
                        textAlign: "left",
                        textUnderlinePosition: "from-font",
                        textDecorationSkipInk: "none",
                        padding: "12px 20px",
                    }}
                >
                    IMPRIMIR DEVOLUTIVA
                </Button>
            </Box>
        </Box>
    );
}

export default ContextBox;