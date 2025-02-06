import { useState } from "react";
import LogoCEnPE2X from "../../assets/logo_cenpe2x";
import Papa from "papaparse";

import {
  Box,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";
import {
  Facebook,
  Google,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import "./Login.css";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const navitaion = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    fetch("/db/users.csv")
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            const users = results.data;
            const user = users.find(
              (user) => user.email === email && user.senha === password
            );

            if (user) {
              toast.success("Login efetuado com sucesso!");
              localStorage.setItem(
                "auth",
                JSON.stringify({ email: user.email, nome: user.nome })
              );
              navitaion("/");
            } else {
              toast.error("Email ou senha incorretos!");
            }
          },
        });
      })
      .catch((error) => {
        console.error("Erro ao buscar o arquivo CSV:", error);
      });
  };

  return (
    <div id="login" style={{ color: "white" }}>
      <ToastContainer />
      <Box margin="0 auto" paddingTop={8} width="fit-content">
        <LogoCEnPE2X />
      </Box>
      <Box
        component="form"
        margin="0 auto"
        marginTop={4}
        padding={3}
        width="30%"
        minWidth={300}
        borderRadius={2}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        {/* Campo de Email */}
        <TextField
          width={"100%"}
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{
            style: {
              color: "white",
              borderColor: "white",
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
            },
          }}
        />

        {/* Campo de Senha */}
        <TextField
          width={"100%"}
          label="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          type={showPassword ? "text" : "password"}
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{
            style: {
              color: "white",
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleTogglePasswordVisibility}
                  edge="end"
                  style={{ color: "white" }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
            },
          }}
        />

        {/* Botão de Login */}
        <Button
          variant="contained"
          onClick={handleLogin}
          width={"100%"}
          style={{
            backgroundColor: "#365BDC",
            color: "white",
          }}
        >
          Login
        </Button>

        {/* Lembre de Mim e Esqueceu a Senha */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <FormControlLabel
            control={<Checkbox style={{ color: "white" }} />}
            label="Lembre de mim"
            style={{ color: "white" }}
          />
          <Link
            href="#"
            underline="hover"
            style={{ color: "white", position: "relative", bottom: 3 }}
          >
            Esqueceu a senha?
          </Link>
        </Box>

        <Box display="flex" alignItems="center">
          <Box flexGrow={1} height="1px" bgcolor="white" />
          <Box paddingX={2} color="white">
            Ou
          </Box>
          <Box flexGrow={1} height="1px" bgcolor="white" />
        </Box>

        {/* Botão de Cadastro */}
        <Button
          variant="outlined"
          width={"100%"}
          style={{
            borderColor: "white",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Google />
          <div>Continuar com Google</div>
        </Button>

        <Button
          variant="outlined"
          width={"100%"}
          style={{
            borderColor: "white",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Facebook />
          <div>Continuar com Facebook</div>
        </Button>
      </Box>
    </div>
  );
};

export default Login;
