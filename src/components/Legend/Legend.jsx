import { Typography, Box } from "@mui/material";

const Legend = ({ items }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'end',
        width: 'fit-content',
        gap: '16px'
      }}
    >
      <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: "20px",
          }}
      >
        Legenda:
      </Typography>
      {items.map((item, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              width: '13px',
              height: '13px',
              backgroundColor: item.color,
              marginRight: '8px',
            }}
          ></Box>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: "13px",
              fontWeight: 300,
              lineHeight: "21px",
            }}
          >
          {item.label}
          </Typography>
        </Box>
      ))}
    </div>
  );
};

export { Legend };
