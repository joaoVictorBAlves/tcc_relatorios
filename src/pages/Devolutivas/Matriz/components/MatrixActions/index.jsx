import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import { useSelectionStore } from "../../../../../stores/contextStore";
import { useState } from "react";
import SelectPalete from "../../../../../components/SelectPalete";

const MatrixActions = ({ prevOrder="pattern", prevOrderBy="all", setPrevOrder, setPrevOrderBy, onSort, palete, setPalete }) => {
    const { agroupedStudents, agroupedQuestions } = useSelectionStore();
    const [selectedOrder, setSelectedOrder] = useState(prevOrder);
    const [selectedOrderBy, setSelectedOrderBy] = useState(prevOrderBy);

    const handleOrderChange = (event) => {
        setSelectedOrder(event.target.value);
        setPrevOrder(event.target.value);
    };

    const handleOrderByChange = (event) => {
        setSelectedOrderBy(event.target.value);
        setPrevOrderBy(event.target.value);
    };

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={5} width="100%">
            <Box display="flex" flex={2} flexDirection="column" alignItems="flex-start" marginRight={2}>
                <Typography variant="body1">Ordenar:</Typography>
                <Select value={selectedOrderBy} onChange={handleOrderByChange} sx={{ height: 41, width: '100%' }}>
                    <MenuItem value="all">{agroupedStudents ? 'Turmas' : 'Alunos'} e {agroupedQuestions ? 'Exames' : 'Questões'}</MenuItem>
                    <MenuItem value="x">{agroupedStudents ? 'Turmas' : 'Alunos'}</MenuItem>
                    <MenuItem value="y">{agroupedQuestions ? 'Exames' : 'Questões'}</MenuItem>
                </Select>
            </Box>
            <Box display="flex" flex={2} flexDirection="column" alignItems="flex-start" marginRight={2}>
                <Typography variant="body1">Ordem:</Typography>
                <Select value={selectedOrder} onChange={handleOrderChange} sx={{ height: 41, width: '100%' }}>
                    <MenuItem value="pattern">Ordem Padrão</MenuItem>
                    <MenuItem value="ascending">Crescente</MenuItem>
                    <MenuItem value="descending">Decrescente</MenuItem>
                </Select>
            </Box>
            <Box display="flex" flex={1} flexDirection="column" alignItems="flex-start" marginRight={2}>
                <Typography variant="body1">Paleta de cores:</Typography>
                <SelectPalete palete={palete} setPalete={setPalete} type="categorical" />
            </Box>
            <Button flex={1} variant="contained" color="primary" onClick={onSort} sx={{
                bgcolor: "#365BDC",
                fontFamily: "Poppins",
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "20px",
                textAlign: "left",
                textUnderlinePosition: "from-font",
                textDecorationSkipInk: "none",
                padding: "12px 20px",
                height: "41px",
                marginTop: 3
            }}>Ordenar</Button>
        </Box>
    );
}

export default MatrixActions;