import { Box, Typography } from "@mui/material";
import DevolutivasLogo from "../../assets/devolutivas_logo";
import ContextForm from "../../components/ContextForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Devolutivas = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("auth") === null) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div id="devolutivas">
      <Box
        margin="0 auto"
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        paddingTop={8}
        width="fit-content"
      >
        <DevolutivasLogo />
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
          Para visualizar uma devolutiva, escolha um contexto:
        </Typography>
      </Box>
      <ContextForm />
    </div>
  );
};

export default Devolutivas;
