import { useState } from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import { useSelectionStore } from "../../stores/contextStore";
import { useLocation, useNavigate } from "react-router-dom";

const initial_data = {
  assessments: [{ id: "1", title: "Avaliação SPAECE 2024" }],
  exams: [
    { id: "all", name: "Todos os Exames" },
    { id: "1", name: "Português" },
    { id: "2", name: "Matemática" },
  ],
  schools: [{ id: "1", name: "EEEP Joaquim Nogueira" }],
  classes: [
    { id: "all", name: "Todos as Turmas" },
    { id: "a", name: "Turma A" },
    { id: "b", name: "Turma B" },
  ],
};

const ContextForm = ({
  data = initial_data,
  onConfirm,
  isModal = false,
  static: isStatic = false,
}) => {
  const { setAssessment, setExam, setSchool, setClass } = useSelectionStore();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    assessment,
    exam,
    school,
    class: selectedClassAlias,
  } = useSelectionStore();

  const [selectedAssessment, setSelectedAssessment] = useState(
    isStatic ? "" : assessment?.id || ""
  );
  const [selectedExam, setSelectedExam] = useState(
    isStatic ? "" : exam?.id || ""
  );
  const [selectedSchool, setSelectedSchool] = useState(
    isStatic ? "" : school?.id || ""
  );
  const [selectedClass, setSelectedClass] = useState(
    isStatic ? "" : selectedClassAlias?.id || ""
  );

  const handleAssessmentChange = (event) => {
    const selected = data.assessments.find(
      (item) => item.id === event.target.value
    );
    setSelectedAssessment(selected.id);
    setSelectedExam("");
    setSelectedSchool("");
    setSelectedClass("");
    setAssessment(selected.id, selected.title);
  };

  const handleExamChange = (event) => {
    const selected = data.exams.find((item) => item.id === event.target.value);
    setSelectedExam(selected.id);
    setSelectedSchool("");
    setSelectedClass("");
    setExam(selected.id, selected.name);
  };

  const handleSchoolChange = (event) => {
    const selected = data.schools.find(
      (item) => item.id === event.target.value
    );
    setSelectedSchool(selected.id);
    setSelectedClass("");
    setSchool(selected.id, selected.name);
  };

  const handleClassChange = (event) => {
    const selected = data.classes.find(
      (item) => item.id === event.target.value
    );
    setSelectedClass(selected.id);
    setClass(selected.id, selected.name);
  };

  const handleSubmit = () => {
    if (location.pathname.includes("devolutivas")) {
      navigate("/devolutivas/matriz");
    }
  };

  return (
    <form style={{ maxWidth: "520px", margin: "0 auto" }}>
      <FormControl sx={{ width: "100%" }} margin="normal" disabled={isStatic}>
        <InputLabel id="avaliacao-label">Avaliação</InputLabel>
        <Select
          labelId="avaliacao-label"
          id="avaliacao"
          name="avaliacao"
          value={isStatic ? null : selectedAssessment}
          onChange={handleAssessmentChange}
        >
          {data.assessments.map((assessment) => (
            <MenuItem key={assessment.id} value={assessment.id}>
              {assessment.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        sx={{ width: "100%" }}
        margin="normal"
        disabled={!selectedAssessment || isStatic}
      >
        <InputLabel id="exame-label">Exame</InputLabel>
        <Select
          labelId="exame-label"
          id="exame"
          name="exame"
          value={isStatic ? null : selectedExam}
          onChange={handleExamChange}
        >
          {data.exams.map((exam) => (
            <MenuItem key={exam.id} value={exam.id}>
              {exam.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        sx={{ width: "100%" }}
        margin="normal"
        disabled={!selectedExam || isStatic}
      >
        <InputLabel id="escola-label">Escola</InputLabel>
        <Select
          labelId="escola-label"
          id="escola"
          name="escola"
          value={isStatic ? null : selectedSchool}
          onChange={handleSchoolChange}
        >
          {data.schools.map((school) => (
            <MenuItem key={school.id} value={school.id}>
              {school.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        sx={{ width: "100%" }}
        margin="normal"
        disabled={!selectedSchool || isStatic}
      >
        <InputLabel id="turma-label">Turma</InputLabel>
        <Select
          labelId="turma-label"
          id="turma"
          name="turma"
          value={isStatic ? null : selectedClass}
          onChange={handleClassChange}
        >
          {data.classes.map((classe) => (
            <MenuItem key={classe.id} value={classe.id}>
              {classe.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {!isModal && (
        <Button
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "#365BDC",
            padding: "10px 20px",
            marginTop: "20px",
          }}
          onClick={() => {
            handleSubmit();
            onConfirm();
          }}
          disabled={!selectedClass || isStatic}
        >
          Confirmar Contexto
        </Button>
      )}
    </form>
  );
};

ContextForm.propTypes = {
  data: PropTypes.shape({
    assessments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      })
    ).isRequired,
    exams: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    schools: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    classes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onConfirm: PropTypes.func,
  isModal: PropTypes.bool,
  static: PropTypes.bool,
};

export default ContextForm;
