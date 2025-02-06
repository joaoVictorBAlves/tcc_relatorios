import NavBar from "./components/Navbar";
import CustomCard from "./components/Card";
import "./Launcher.css";
import { Grid2 } from "@mui/material";

const cardData = [
  {
    name: "matriz",
    fullName: "Edição de Matriz de Saberes",
    subtitle: "Configure as Matrizes de Saberes",
    disabled: true,
  },
  {
    name: "avaliacoes",
    fullName: "Edição de Avaliações",
    subtitle: "Edite as avaliações escolares",
    disabled: true,
  },
  {
    name: "correcoes",
    fullName: "Correção de Avaliações",
    subtitle: "Avalie os testes dos alunos",
    disabled: true,
  },
  {
    name: "psicometricos",
    fullName: "Modelos Psicométricos",
    subtitle: "-",
    disabled: true,
  },
  {
    name: "edicao",
    fullName: "Edição de Conteúdos",
    subtitle: "Criação de estudos do CEnPE",
    disabled: true,
  },
  {
    name: "administracao",
    fullName: "Administração de Turmas",
    subtitle: "Realize a alocação dos membros",
    disabled: true,
  },
  {
    name: "relatorios",
    fullName: "Relatórios e Devolutivas",
    subtitle: "Análise de desempenhos escolares",
  },
  {
    name: "conteudos",
    fullName: "Acesso a Conteúdos e Exercícios",
    subtitle: "-",
    disabled: true,
  },
  {
    name: "curso",
    fullName: "Edição de Cursos",
    subtitle: "-",
    disabled: true,
  },
  {
    name: "itinerarios",
    fullName: "Definição de Itinerários Formativos",
    subtitle: "-",
    disabled: true,
  },
];

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Launcher = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("auth") === null) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div id="launcher">
      <NavBar />
      <Grid2
        container
        spacing={4}
        justifyContent="space-between"
        sx={{ margin: "0 auto", marginTop: 8, maxWidth: "80%" }}
      >
        {cardData.map((card) => (
          <Grid2 key={card.name} item xs={12} sm={6} md={4}>
            <CustomCard
              name={card.name}
              fullName={card.fullName}
              subtitle={card.subtitle}
              disabled={card.disabled}
            />
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
};

export default Launcher;
