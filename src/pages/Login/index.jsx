import React, { useState } from "react";
import LogoCEnPE2X from "../../assets/logo_cenpe2x";
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
import { Facebook, Google, Visibility, VisibilityOff } from "@mui/icons-material";
import "./Login.css";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div id="login" style={{ color: "white" }}>
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
                    fullWidth
                    label="Email"
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
                    fullWidth
                    label="Senha"
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
                    fullWidth
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
                    <Link href="#" underline="hover" style={{ color: "white", position: "relative", bottom: 3 }}>
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
                fullWidth
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

                fullWidth
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
