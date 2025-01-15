import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { Menu, MenuItem } from '@mui/material';
import { AppsRounded, ArrowDropDownOutlined } from '@mui/icons-material';

import Logo from "../../assets/logo";

const pages = ['Relatórios', 'Devolutivas'];
const settings = ['Voltar ao Launcher', 'Sair'];

function NavBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleNavigate = (page) => {
        if (page === 'Relatórios') {
            navigate('/relatorios');
        } else if (page === 'Devolutivas') {
            navigate('/devolutivas');
        }
        handleCloseNavMenu();
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#1A367C', px: '80px', py: '2px' }}>
            <Container maxWidth="2xl">
                <Toolbar disableGutters>
                    {/* Logo - Alinhado à Esquerda */}
                    <Box display={"flex"} alignItems={"center"} gap={2}>
                    <Logo />
                    <Typography
                        variant="h6"
                        sx={{
                            fontFamily: 'Poppins',
                            fontSize: '18px',
                            fontWeight: 500,
                            lineHeight: '27px',
                            textAlign: 'left',
                            textUnderlinePosition: 'from-font',
                            textDecorationSkipInk: 'none'
                        }}
                    >
                        Relatórios e Devolutivas
                    </Typography>
                    </Box>

                    {/* Navegação - Centralizada */}
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 5 }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => handleNavigate(page)}
                                sx={{ 
                                    my: 2, 
                                    color: location.pathname.includes(page.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) ? '#FFF' : '#EDF1FF', 
                                    display: 'block', 
                                    textTransform: 'none',
                                    fontWeight: location.pathname.includes(page.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) ? 'bold' : 'normal'
                                }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {/* Menu de Navegação */}
                        <AppsRounded />
                        <Box>
                            <Tooltip title="Menu de Navegação">
                                <Box display={"flex"} alignItems={"center"} gap={2} onClick={handleOpenUserMenu}>
                                    <IconButton sx={{ p: 0 }}>
                                        <Avatar alt="Usuário" src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                    <Box display={"flex"} alignItems={"center"}>
                                        <Typography variant="body2" sx={{ color: '#EDF1FF' }}>Usuário</Typography>
                                        <ArrowDropDownOutlined />
                                    </Box>
                                </Box>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default NavBar;