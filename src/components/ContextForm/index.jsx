import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material';
import { useSelectionStore } from '../../stores/contextStore'; // ajuste o caminho conforme necessário

const initial_data = {
    assessments: [
        { id: 'avaliacao1', title: 'Avaliação 1' },
        { id: 'avaliacao2', title: 'Avaliação 2' },
    ],
    exams: [
        { id: 'exame1', name: 'Exame 1' },
        { id: 'exame2', name: 'Exame 2' },
    ],
    schools: [
        { id: 'escola1', name: 'Escola 1' },
        { id: 'escola2', name: 'Escola 2' },
    ],
    classes: [
        { id: 'turma1', name: 'Turma 1' },
        { id: 'turma2', name: 'Turma 2' },
    ],
};

const ContextForm = ({data=initial_data}) => {
    const { setAssessment, setExam, setSchool, setClass } = useSelectionStore();

    const handleAssessmentChange = (event) => {
        const selected = data.assessments.find(item => item.id === event.target.value);
        setAssessment(selected.id, selected.title);
    };

    const handleExamChange = (event) => {
        const selected = data.exams.find(item => item.id === event.target.value);
        setExam(selected.id, selected.name);
    };

    const handleSchoolChange = (event) => {
        const selected = data.schools.find(item => item.id === event.target.value);
        setSchool(selected.id, selected.name);
    };

    const handleClassChange = (event) => {
        const selected = data.classes.find(item => item.id === event.target.value);
        setClass(selected.id, selected.name);
    };

    return (
        <form style={{ maxWidth: '520px', margin: '0 auto' }}>
            <FormControl fullWidth margin="normal">
                <InputLabel id="avaliacao-label">Avaliação</InputLabel>
                <Select labelId="avaliacao-label" id="avaliacao" name="avaliacao" onChange={handleAssessmentChange}>
                    {data.assessments.map((assessment) => (
                        <MenuItem key={assessment.id} value={assessment.id}>{assessment.title}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel id="exame-label">Exame</InputLabel>
                <Select labelId="exame-label" id="exame" name="exame" onChange={handleExamChange}>
                    {data.exams.map((exam) => (
                        <MenuItem key={exam.id} value={exam.id}>{exam.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel id="escola-label">Escola</InputLabel>
                <Select labelId="escola-label" id="escola" name="escola" onChange={handleSchoolChange}>
                    {data.schools.map((school) => (
                        <MenuItem key={school.id} value={school.id}>{school.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel id="turma-label">Turma</InputLabel>
                <Select labelId="turma-label" id="turma" name="turma" onChange={handleClassChange}>
                    {data.classes.map((classe) => (
                        <MenuItem key={classe.id} value={classe.id}>{classe.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button variant="contained" color="primary" sx={{ backgroundColor: "#365BDC", padding: "10px 20px", marginTop: "20px" }}>
                Confirmar Contexto
            </Button>
        </form>
    );
}

export default ContextForm;