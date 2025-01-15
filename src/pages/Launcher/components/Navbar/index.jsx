import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { Menu, MenuItem } from '@mui/material';
import { ArrowDropDownOutlined } from '@mui/icons-material';

import Logo from "../../../../assets/logo_cenpe";

const settings = ['Sair'];

function NavBar() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: 'transparent', px: '80px', py: '2px', borderBottom: '1px solid #1A367C' }}>
            <Container maxWidth="2xl">
                <Toolbar disableGutters>
                    {/* Logo e Dados do Usuário - Alinhados à Esquerda */}
                    <Box display={"flex"} width={"100%"} justifyContent={"space-between"} alignItems={"center"} gap={2}>
                        <Logo />
                        <Box display={"flex"} alignItems={"center"} gap={1} onClick={handleOpenUserMenu}>
                            <IconButton sx={{ p: 0 }}>
                                <Avatar alt="Usuário" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                            <Box display={"flex"} alignItems={"center"}>
                                <ArrowDropDownOutlined />
                            </Box>
                        </Box>
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
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;
