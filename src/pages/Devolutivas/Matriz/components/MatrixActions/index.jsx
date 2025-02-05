import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useSelectionStore } from "../../../../../stores/contextStore";
import { useState } from "react";
import SelectPalete from "../../../../../components/SelectPalete";

const MatrixActions = ({
  prevOrder = "pattern",
  prevOrderBy = "all",
  setPrevOrder,
  setPrevOrderBy,
  onSort,
  palete,
  setPalete,
  agroupX,
  setAgroupX,
  agroupY,
  setAgroupY,
}) => {
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

  const handleAgroupXChange = (event) => {
    const value = event.target.value;
    setAgroupX(value == "x");
  };

  const handleAgroupYChange = (event) => {
    const value = event.target.value;
    setAgroupY(value == "y");
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      marginTop={5}
      width="100%"
    >
      <Box
        display="flex"
        flex={1}
        flexDirection="column"
        alignItems="flex-start"
        marginRight={2}
      >
        <Typography variant="body1">Ordenar:</Typography>
        <Select
          value={selectedOrderBy}
          onChange={handleOrderByChange}
          sx={{ height: 41, width: "100%" }}
        >
          <MenuItem value="all">
            {agroupedStudents ? "Turmas" : "Alunos"} e{" "}
            {agroupedQuestions ? "Exames" : "Questões"}
          </MenuItem>
          <MenuItem value="x">
            {agroupedStudents ? "Turmas" : "Alunos"}
          </MenuItem>
          <MenuItem value="y">
            {agroupedQuestions ? "Exames" : "Questões"}
          </MenuItem>
        </Select>
      </Box>
      <Box
        display="flex"
        flex={1}
        flexDirection="column"
        alignItems="flex-start"
        marginRight={2}
      >
        <Typography variant="body1">Ordem:</Typography>
        <Select
          value={selectedOrder}
          onChange={handleOrderChange}
          sx={{ height: 41, width: "100%" }}
        >
          <MenuItem value="pattern">Ordem Padrão</MenuItem>
          <MenuItem value="ascending">Crescente</MenuItem>
          <MenuItem value="descending">Decrescente</MenuItem>
        </Select>
      </Box>
      <Box
        display="flex"
        flex={1}
        flexDirection="column"
        alignItems="flex-start"
        marginRight={2}
      >
        <Typography variant="body1">Agrupar Alunos:</Typography>
        <Select
          value={agroupY ? "y" : "null"}
          onChange={handleAgroupYChange}
          sx={{ height: 41, width: "100%" }}
        >
          <MenuItem value="null">Sem Agrupamento</MenuItem>
          <MenuItem value="y">Agrupar por Turmas</MenuItem>
        </Select>
      </Box>
      <Box
        display="flex"
        flex={1}
        flexDirection="column"
        alignItems="flex-start"
        marginRight={2}
      >
        <Typography variant="body1">Agrupar Questões:</Typography>
        <Select
          value={agroupX ? "x" : "null"}
          onChange={handleAgroupXChange}
          sx={{ height: 41, width: "100%" }}
        >
          <MenuItem value="null">Sem Agrupamento</MenuItem>
          <MenuItem value="x">Agrupar por Exames</MenuItem>
        </Select>
      </Box>
      <Box
        display="flex"
        flex={1}
        flexDirection="column"
        alignItems="flex-start"
        marginRight={2}
      >
        <Typography variant="body1">Paleta de cores:</Typography>
        <SelectPalete
          palete={palete}
          setPalete={setPalete}
          type="categorical"
        />
      </Box>

      <Button
        flex={1}
        variant="contained"
        color="primary"
        onClick={onSort}
        sx={{
          bgcolor: "#365BDC",
          fontFamily: "Poppins",
          fontSize: "16px",
          fontWeight: 600,
          lineHeight: "20px",
          textAlign: "left",
          textUnderlinePosition: "from-font",
          textDecorationSkipInk: "null",
          padding: "12px 20px",
          height: "41px",
          marginTop: 3,
        }}
      >
        Aplicar
      </Button>
    </Box>
  );
};
MatrixActions.propTypes = {
  prevOrder: PropTypes.string,
  prevOrderBy: PropTypes.string,
  setPrevOrder: PropTypes.func.isRequired,
  setPrevOrderBy: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  palete: PropTypes.string.isRequired,
  setPalete: PropTypes.func.isRequired,
  agroupX: PropTypes.bool.isRequired,
  setAgroupX: PropTypes.func.isRequired,
  agroupY: PropTypes.bool.isRequired,
  setAgroupY: PropTypes.func.isRequired,
};

export default MatrixActions;
