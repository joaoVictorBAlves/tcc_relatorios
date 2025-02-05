import { useEffect, useState } from "react";
import { useSelectionStore } from "../../../stores/contextStore";
import Papa from "papaparse";
import { Box, Typography } from "@mui/material";
import ContextBox from "./components/ContextBox";
import MatrixActions from "./components/MatrixActions";
import SortStatus from "./components/SortStatus";
import { Legend } from "../../../components/Legend/Legend";
import Heatmap from "../../../components/HeatmapComponent";

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
    agroupedQuestions,
    agroupedStudents,
  } = useSelectionStore();
  const [csvData, setCsvData] = useState(null);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  const [orderBy, setOrderBy] = useState("all");
  const [order, setOrder] = useState("pattern");
  const [agroupX, setAgroupX] = useState(false);
  const [agroupY, setAgroupY] = useState(false);
  const [prevAgroupX, setPrevAgroupX] = useState(false);
  const [prevAgroupY, setPrevAgroupY] = useState(false);
  const [palete, setPalete] = useState("palete1");

  const [prevOrderBy, setPrevOrderBy] = useState("all");
  const [prevOrder, setPrevOrder] = useState("pattern");

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const classId = selectedClass.id === "&" ? "all" : selectedClass.id;
    const examId = exam.id === "&" ? "all" : exam.id;

    const fetchCSV = async () => {
      const fileName = getFileName(examId, classId);
      const data = await loadAndParseCSV(fileName);
      setCsvData(data);
    };

    fetchCSV();
  }, [exam.id, selectedClass.id]);

  useEffect(() => {
    if (csvData) {
      const rowLabels = csvData.map((row) => row.Student);
      const columnLabels = Object.keys(csvData[0]).slice(1);
      const heatmapData = csvData.map((row) =>
        columnLabels.map((col) => Number(row[col]) || 0)
      );

      setRows(rowLabels);
      setColumns(columnLabels);
      setData(heatmapData);
    }
  }, [csvData]);

  const getLegendItems = (palete) => {
    switch (palete) {
      case "palete1":
        return [
          { color: "#ED623E", label: "Erro" },
          { color: "#94D16A", label: "Acerto" },
        ];
      case "palete2":
        return [
          { color: "#8D5510", label: "Erro" },
          { color: "#4DA79E", label: "Acerto" },
        ];
      case "palete3":
        return [
          { color: "#B7D5EA", label: "Erro" },
          { color: "#3887C0", label: "Acerto" },
        ];
      case "palete4":
        return [
          { color: "#CA2F26", label: "Erro" },
          { color: "#7CABD2", label: "Acerto" },
        ];
      default:
        return [
          { color: "#ED623E", label: "Erro" },
          { color: "#94D16A", label: "Acerto" },
        ];
    }
  };

  return (
    <Box marginInline={12} marginTop={4}>
      <Typography
        variant="h6"
        component="div"
        sx={{
          fontFamily: "Poppins",
          fontSize: 28,
          fontWeight: 500,
          lineHeight: "50px",
          textAlign: "left",
        }}
      >
        Devolutivas
      </Typography>
      <ContextBox
        assessment={assessment}
        exam={exam}
        school={school}
        selectedClass={selectedClass}
        onChangeContext={() => {}}
        onPrint={() => {}}
      />
      <MatrixActions
        prevOrder={prevOrder}
        prevOrderBy={prevOrderBy}
        setPrevOrder={setPrevOrder}
        setPrevOrderBy={setPrevOrderBy}
        palete={palete}
        setPalete={setPalete}
        onSort={() => {
          setOrder(prevOrder);
          setOrderBy(prevOrderBy);
          setAgroupX(prevAgroupX);
          setAgroupY(prevAgroupY);
        }}
        agroupX={prevAgroupX}
        setAgroupX={setPrevAgroupX}
        agroupY={prevAgroupY}
        setAgroupY={setPrevAgroupY}
      />
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={4}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontFamily: "Poppins",
            fontSize: "18px",
            fontWeight: 600,
            lineHeight: "26px",
            textAlign: "left",
          }}
        >
          {assessment.title}
        </Typography>
        {order !== null ? (
          <Box display={"flex"} alignItems={"center"} gap={"10px"}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontFamily: "Poppins",
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: "20px",
                textAlign: "left",
              }}
            >
              Ordenado em
            </Typography>
            <SortStatus order={order} orderBy={orderBy} />
          </Box>
        ) : (
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontFamily: "Poppins",
              fontSize: "14px",
              fontWeight: 600,
              lineHeight: "20px",
              textAlign: "left",
            }}
          >
            Ordem Original
          </Typography>
        )}
      </Box>
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mt={2}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontFamily: "Poppins",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "21px",
            textAlign: "left",
            textUnderlinePosition: "from-font",
            textDecorationSkipInk: "none",
            color: "#677080",
          }}
        >
          {columns.length * rows.length} Resultados | {rows.length}{" "}
          {agroupedStudents ? "Turmas" : "Alunos"} e {columns.length}{" "}
          {agroupedQuestions ? "Exames" : "Questões"}
        </Typography>

        <Legend items={getLegendItems(palete)}></Legend>
      </Box>
      <Box
        width={"100%"}
        marginTop={2}
        sx={{ border: "1px solid #E5E5E5", borderRadius: "8px" }}
      >
        <Heatmap
          key={dimensions.width + dimensions.height + "key"}
          type={"categorical"}
          width={dimensions.width * 0.85}
          height={dimensions.height}
          margin={100}
          labelsX={columns}
          labelsY={rows}
          matrix={data}
          orderBy={orderBy}
          order={order}
          palete={palete}
          selectedLabel={null}
          setSelectedLabel={() => {}}
          agroupX={agroupX}
          agroupY={agroupY}
        />
      </Box>
    </Box>
  );
};

export default MatrixStudentItem;
