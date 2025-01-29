import { ArrowDropDown } from "@mui/icons-material";
import Palete1 from "../Icons/Palete1";
import "./style.css";
import Palete2 from "../Icons/Palete2";
import Palete3 from "../Icons/Palete3";
import PaleteLin1 from "../Icons/PaleteLin1";
import PaleteLin2 from "../Icons/PaleteLin2";
import PaleteLin3 from "../Icons/PaleteLin3";
import { useEffect, useState } from "react";

const SelectPalete = ({ palete, setPalete, type }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [palete]);

  return (
    <>
      <div
        className="palete"
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        {palete === "palete1" ? (
          type === "categorical" ? (
            <Palete1 />
          ) : (
            <PaleteLin1 />
          )
        ) : palete === "palete2" ? (
          type === "categorical" ? (
            <Palete2 />
          ) : (
            <PaleteLin2 />
          )
        ) : palete === "palete3" ? (
          type === "categorical" ? (
            <Palete3 />
          ) : (
            <PaleteLin3 />
          )
        ) : (
          ""
        )}
        <div className="arrow">
          <ArrowDropDown />
        </div>
      </div>
      <div
        className={"menu"}
        style={isMenuOpen ? { display: "flex" } : { display: "none" }}
      >
        <div className="menu-item" onClick={() => setPalete("palete1")}>
          {type === "categorical" ? <Palete1 /> : <PaleteLin1 />}
        </div>
        <div className="menu-item" onClick={() => setPalete("palete2")}>
          {type === "categorical" ? <Palete2 /> : <PaleteLin2 />}
        </div>
        <div className="menu-item" onClick={() => setPalete("palete3")}>
          {type === "categorical" ? <Palete3 /> : <PaleteLin3 />}
        </div>
        <span>Configurações Avançadas...</span>
      </div>
    </>
  );
};

export default SelectPalete;
