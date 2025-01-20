import { useEffect, useState } from "react";
import { useSelectionStore } from "../../../stores/contextStore";
import Papa from "papaparse";

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

  return (
    <div>
      <h2>Matriz</h2>
      <div>{`${assessment.id} ${assessment.title}`}</div>
      <div>{`${exam.id} ${exam.name}`}</div>
      <div>{`${school.id} ${school.name}`}</div>
      <div>{`${selectedClass.id} ${selectedClass.name}`}</div>
      <h3>Dados do Arquivo CSV:</h3>
      {csvData ? (
        <table border="1">
          <thead>
            <tr>
              {Object.keys(csvData[0] || {}).map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {csvData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(row).map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum dado disponível.</p>
      )}
    </div>
  );
};

export default MatrixStudentItem;
