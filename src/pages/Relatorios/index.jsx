import { Box, Typography } from "@mui/material";
import RelatorioLogo from "../../assets/relatorio_logo";
import ContextForm from "../../components/ContextForm";
import "./Relatorios.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Relatorios = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("auth") === null) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div id="relatorios">
      <Box
        margin="0 auto"
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        paddingTop={8}
        width="fit-content"
      >
        <RelatorioLogo />
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontFamily: "Poppins",
            fontSize: "18px",
            fontWeight: 600,
            lineHeight: "26px",
            textAlign: "center",
            textUnderlinePosition: "from-font",
            textDecorationSkipInk: "none",
            marginTop: 4,
          }}
        >
          Para visualizar um relatório, escolha um contexto:
        </Typography>
      </Box>
      <ContextForm static />
    </div>
  );
};

export default Relatorios;
