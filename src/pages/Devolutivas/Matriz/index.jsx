import { useEffect, useRef, useState } from "react";
import { useSelectionStore } from "../../../stores/contextStore";
import Papa from "papaparse";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import ContextBox from "./components/ContextBox";
import MatrixActions from "./components/MatrixActions";
import SortStatus from "./components/SortStatus";
import { Legend } from "../../../components/Legend/Legend";
import Heatmap from "../../../components/HeatmapComponent";
import ReactMarkdown from "react-markdown";
import { CloseOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ContextForm from "../../../components/ContextForm";

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

  const [selectedLabel, setSelectedLabel] = useState(null);
  const [content, setContent] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const contextRef = useRef();
  const heatmapRef = useRef();

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("auth") === null) {
      navigate("/login");
    }
  }, [navigate]);

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

  useEffect(() => {
    const fetchContent = async (label) => {
      try {
        let filePath = "";
        if (label.startsWith("Q")) {
          filePath = "/db/assessment_content.csv";
        } else if (label.startsWith("S")) {
          filePath = "/db/students_content.csv";
        }

        const response = await fetch(filePath);
        const text = await response.text();
        const parsed = Papa.parse(text, { header: true });
        let contentData;

        if (label.startsWith("Q")) {
          if (label.includes("_e1")) {
            const questionId = parseInt(label.split("_")[0].substring(1));
            contentData = parsed.data.find((item) => item.ID == questionId);
          } else if (label.includes("_e2")) {
            const questionId = parseInt(label.split("_")[0].substring(1)) + 10;
            contentData = parsed.data.find((item) => item.ID == questionId);
          }
        } else if (label.startsWith("S")) {
          contentData = parsed.data.find((item) => item.ID == label);
          console.log(contentData);
        }

        setContent(contentData);
      } catch (error) {
        console.error("Erro ao carregar o arquivo CSV:", error);
      }
    };

    if (selectedLabel) {
      fetchContent(selectedLabel);
    }
  }, [selectedLabel]);

  useEffect(() => {
    console.log(content);
  }, [content]);

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
    <Box marginInline={12} marginTop={4} ref={heatmapRef}>
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
        ref={contextRef}
        assessment={assessment}
        exam={exam}
        school={school}
        selectedClass={selectedClass}
        onChangeContext={() => setModalOpen(true)}
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
        onReset={() => {
          setOrder("pattern");
          setOrderBy("all");
          setAgroupX(false);
          setAgroupY(false);
          setPalete("palete1");
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
          selectedLabel={selectedLabel}
          setSelectedLabel={setSelectedLabel}
          agroupX={agroupX}
          agroupY={agroupY}
        />
      </Box>

      <Modal
        open={modalOpen}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "#FFFFFF",
            border: "2px solid #DEE1E8",
            borderRadius: 1,
            p: 4,
          }}
        >
          <ContextForm onConfirm={() => setModalOpen(false)} />
        </Box>
      </Modal>

      <Modal
        open={!!selectedLabel}
        onClose={() => setSelectedLabel(null)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "#FFFFFF",
            border: "2px solid #DEE1E8",
            borderRadius: 1,
            boxShadow: "0px 4px 24px 0px #365BDC4D",
            p: 4,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={() => setSelectedLabel(null)}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "#000",
            }}
          >
            <CloseOutlined />
          </IconButton>

          {content && selectedLabel ? (
            <>
              {selectedLabel[0] == "Q" ? (
                <>
                  <Typography id="modal-title" variant="h6" component="h2">
                    Questão {content.ID}
                  </Typography>
                  <Typography sx={{ mt: 2 }}>
                    <strong>Avaliação:</strong>{" "}
                    {content["Área do Conhecimento"]} / Exame {content.Exame}
                  </Typography>
                  <Typography sx={{ mt: 2 }}>
                    <strong>Questão:</strong>
                  </Typography>
                  <Box
                    sx={{ mt: 1, p: 1, bgcolor: "#F5F5F5", borderRadius: 1 }}
                  >
                    <ReactMarkdown>{content.Questão}</ReactMarkdown>
                  </Box>
                  <Typography sx={{ mt: 2 }}>
                    <strong>Habilidade:</strong> {content.Habilidade}
                  </Typography>
                </>
              ) : (
                <>
                  <Typography id="modal-title" variant="h6" component="h2">
                    Aluno {content.ID.split("_")[1]}
                  </Typography>
                  <Typography sx={{ mt: 2 }}>
                    <strong>Nome:</strong> {content.Nome}
                  </Typography>
                  <Typography sx={{ mt: 2 }}>
                    <strong>Turma:</strong> {content.Turma?.toUpperCase()}
                  </Typography>
                  <Typography sx={{ mt: 2 }}>
                    <strong>Matrícula:</strong> {content["Matrícula"]}
                  </Typography>
                  <Typography sx={{ mt: 2 }}>
                    <strong>Email:</strong> {content.Email}
                  </Typography>
                </>
              )}
            </>
          ) : (
            <Typography id="modal-description" sx={{ mt: 2 }}>
              Carregando...
            </Typography>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default MatrixStudentItem;
