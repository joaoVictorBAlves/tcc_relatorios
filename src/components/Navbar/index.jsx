import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { Apps, AppsRounded, ArrowDownwardOutlined, ArrowDropDown, ArrowDropDownOutlined } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';

const pages = ['Relatórios', 'Devolutivas'];
const settings = ['Voltar ao Launcher', 'Sair'];

function NavBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

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

    return (
        <AppBar position="static" sx={{ backgroundColor: '#1A367C', px: '80px', py: '2px' }}>
            <Container maxWidth="2xl">
                <Toolbar disableGutters>
                    {/* Logo - Alinhado à Esquerda */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: '#EDF1FF',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>

                    {/* Navegação - Centralizada */}
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 7 }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: '#EDF1FF', display: 'block', textTransform: 'none' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {/* Menu de Navegação */}
                        <AppsRounded />
                        <Box>
                            <Tooltip title="Open settings">
                                <Box display={"flex"} alignItems={"center"} gap={3}>
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                    <Box display={"flex"} alignItems={"center"}>
                                        <Typography variant="body2" sx={{ color: '#EDF1FF' }}>Remy</Typography>
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