import NavBar from "./components/Navbar";
import CustomCard from "./components/Card";
import "./Launcher.css";
import { Box, Grid2 } from "@mui/material";

const Launcher = () => {
    return (
        <div id="launcher">
            <NavBar />

            <Grid2
                margin="0 auto"
                marginTop={8}
                container
                spacing={4}
                justifyContent="space-between"
                maxWidth="80%"
            >
                <Grid2 item xs={12} sm={6} md={4}>
                    <CustomCard
                        name={"matriz"}
                        fullName="Edição de Matriz de Saberes"
                        subtitle="Configure as Matrizes de Saberes"
                    />
                </Grid2>
                <Grid2 item xs={12} sm={6} md={4}>
                    <CustomCard
                        name={"avaliacoes"}
                        fullName="Edição de Avaliações"
                        subtitle="Edite as avaliações escolares"
                    />
                </Grid2>
                <Grid2 item xs={12} sm={6} md={4}>
                    <CustomCard
                        name={"correcoes"}
                        fullName="Correção de Avaliações"
                        subtitle="Avalie os testes dos alunos"
                    />
                </Grid2>
                <Grid2 item xs={12} sm={6} md={4}>
                    <CustomCard
                        name={"psicometricos"}
                        fullName="Modelos Psicométricos"
                        subtitle="-"
                    />
                </Grid2>
                <Grid2 item xs={12} sm={6} md={4}>
                    <CustomCard
                        name={"edicao"}
                        fullName="Edição de Conteúdos"
                        subtitle="Criação de estudos do CEnPE"
                    />
                </Grid2>
                <Grid2 item xs={12} sm={6} md={4}>
                    <CustomCard
                        name={"administracao"}
                        fullName="Administração de Turmas"
                        subtitle="Realize a alocação dos membros"
                    />
                </Grid2>
                <Grid2 item xs={12} sm={6} md={4}>
                    <CustomCard
                        name={"relatorios"}
                        fullName="Relatórios e Devolutivas"
                        subtitle="Análise de desempenhos escolares"
                    />
                </Grid2>
                <Grid2 item xs={12} sm={6} md={4}>
                    <CustomCard
                        name={"conteudos"}
                        fullName="Acesso a Conteúdos e Exercícios"
                        subtitle="-"
                    />
                </Grid2>
                <Grid2 item xs={12} sm={6} md={4}>
                    <CustomCard
                        name={"curso"}
                        fullName="Edição de Cursos"
                        subtitle="-"
                    />
                </Grid2>
                <Grid2 item xs={12} sm={6} md={4}>
                    <CustomCard
                        name={"itinerarios"}
                        fullName="Definição de Itinerários Formativos"
                        subtitle="-"
                    />
                </Grid2>
            </Grid2>
        </div>
    );
}

export default Launcher;
