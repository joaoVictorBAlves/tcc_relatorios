import { Box, Typography } from "@mui/material";
import RelatorioLogo from "../../assets/relatorio_logo";
import ContextForm from "../../components/ContextForm";
import NavBar from "../../components/Navbar";
import "./Relatorios.css"
const Relatorios = () => {
    return (
        <div id="relatorios">
            <NavBar />
            <Box margin="0 auto" display={"flex"} flexDirection={"column"} alignItems={"center"} paddingTop={8} width="fit-content">
                <RelatorioLogo />
                <Typography variant="h6" component="div" sx={{
                    'font-family': 'Poppins',
                    'font-size': '18px',
                    'font-weight': 600,
                    'line-height': '26px',
                    'text-align': 'center',
                    'text-underline-position': 'from-font',
                    'text-decoration-skip-ink': 'none',

                }}>
                    Para visualizar um relatório, escolha um contexto:
                </Typography>
            </Box>
            <ContextForm />
        </div>
    );
}

export default Relatorios;