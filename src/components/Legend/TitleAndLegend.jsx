import { Typography } from "@mui/material";
import { Legend } from "@/components/Report/Legend/Legend";

const TitleAndLegend = ({ title, items }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontSize: "14px",
              fontWeight: 600,
              lineHeight: "20px",
            }}
          >
          {title}</Typography>
        <div>
          <Legend items={items} />
        </div>
      </div>
    </div>
  );
};

export { TitleAndLegend };
