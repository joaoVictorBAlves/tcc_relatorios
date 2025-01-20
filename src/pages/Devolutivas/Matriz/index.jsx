import { useEffect, useState } from "react";
import { useSelectionStore } from "../../../stores/contextStore";
import Papa from "papaparse";
import { Box, Button, Typography } from "@mui/material";
import { People, Place, School } from "@mui/icons-material";

// Função para determinar o nome do arquivo com base nos IDs
const getFileName = (examId, classId) => {
  if (classId === "all" && examId === "all") {
    return "assessment-1";
  } else if (classId !== "all" && examId === "all") {
    return `assessment-1-class-${classId}`;
  } else if (classId === "all" && examId !== "all") {
    return `assessment-1-exam-${examId}`;
  } else {
    return `assessment-1-class-${classId}-exam-${examId}`;
  }
};

const loadAndParseCSV = async (fileName) => {
  try {
    const filePath = `/db/${fileName}.csv`;
    const response = await fetch(filePath);
    const text = await response.text();

    const parsed = Papa.parse(text, { header: true });
    return parsed.data;
  } catch (error) {
    console.error("Erro ao carregar o arquivo CSV:", error);
    return null;
  }
};

const MatrixStudentItem = () => {
  const {
    assessment,
    exam,
    school,
    class: selectedClass,
  } = useSelectionStore();
  const [csvData, setCsvData] = useState(null);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Determina os valores dos IDs
    const classId = selectedClass.id === "&" ? "all" : selectedClass.id;
    const examId = exam.id === "&" ? "all" : exam.id;

    // Carrega e parseia o arquivo CSV apropriado
    const fetchCSV = async () => {
      const fileName = getFileName(examId, classId);
      const data = await loadAndParseCSV(fileName);
      console.log(data);
      setCsvData(data);
    };

    fetchCSV();
  }, [exam.id, selectedClass.id]);

  useEffect(() => {
    if (csvData) {
      const rowLabels = csvData.map((row) => row.Student);
      const columnLabels = Object.keys(csvData[0]).slice(1);
      const heatmapData = csvData.map((row) =>
        columnLabels.map((col) => parseFloat(row[col]))
      );

      setRows(rowLabels);
      setColumns(columnLabels);
      setData(heatmapData);
    }
  }, [csvData]);

  return (
    <Box marginInline={13} marginTop={4}>
      <Typography
        variant="h6"
        component="div"
        sx={{
          fontFamily: "Poppins",
          fontSize: 28,
          fontWeight: 500,
          lineHeight: "50px",
          textAlign: "left",
          textUnderlinePosition: "from-font",
          textDecorationSkipInk: "none",
        }}
      >
        Devolutivas
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginTop={4}
        bgcolor={"#F7F8FA"}
        border={"1px solid #CACDD5"}
        borderRadius={1}
        padding={1.5}
        width={"100%"}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"start"}
          padding={2}
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
        <Box display={"flex"} alignItems={"end"}>
          <Button
            variant="contained"
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
    </Box>
  );
};

export default MatrixStudentItem;
