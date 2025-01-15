import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CardRelatorios from '../../../../assets/launcher/card_relatorios';
import CardCorrecoes from '../../../../assets/launcher/card_correcoes';
import CardAvaliacoes from '../../../../assets/launcher/card_avaliacoes';
import CardPsicometricos from '../../../../assets/launcher/card_psicometricos';
import CardEdicao from '../../../../assets/launcher/card_edicao';
import CardAdm from '../../../../assets/launcher/card_administracao';
import CardConteudos from '../../../../assets/launcher/card_conteudos';
import CardCurso from '../../../../assets/launcher/card_curso';
import CardItinerarios from '../../../../assets/launcher/card_itinerarios';
import CardMatriz from '../../../../assets/launcher/card_matriz';


const CustomCard = ({ name, fullName, subtitle, disabled }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(name);
    };

    return (
        <Button disabled={disabled} onClick={handleClick} sx={{ width: 'fit-content', textTransform: 'none', padding: 0 }}>
            <Box sx={{ width: "fit-content", display: 'flex', flexDirection: 'column', gap: "5px", alignItems: 'start', margin: '0 auto' }}>
                {name === 'relatorios' && <CardRelatorios />}
                {name === 'correcoes' && <CardCorrecoes />}
                {name === 'avaliacoes' && <CardAvaliacoes />}
                {name === 'psicometricos' && <CardPsicometricos />}
                {name === 'edicao' && <CardEdicao />}
                {name === 'administracao' && <CardAdm />}
                {name === 'conteudos' && <CardConteudos />}
                {name === 'curso' && <CardCurso />}
                {name === 'itinerarios' && <CardItinerarios />}
                {name === 'matriz' && <CardMatriz />}
                <Box>
                    <Typography variant="h6" component="div" sx={{
                        fontFamily: 'Poppins',
                        fontSize: 14,
                        fontWeight: 700,
                        lineHeight: '21px',
                        textAlign: 'left',
                        textUnderlinePosition: 'from-font',
                        textDecorationSkipInk: 'none',
                        color: '#FFF'
                    }}>
                        {fullName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{
                        fontFamily: 'Poppins',
                        fontSize: 12,
                        fontWeight: 400,
                        lineHeight: '21px',
                        textAlign: 'left',
                        textUnderlinePosition: 'from-font',
                        textDecorationSkipInk: 'none',
                        color: '#FFF'
                    }}>
                        {subtitle}
                    </Typography>
                </Box>
            </Box>
        </Button>
    );
}

export default CustomCard;
