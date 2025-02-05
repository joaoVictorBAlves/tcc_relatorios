import { ArrowDropDown } from "@mui/icons-material";
import Palete1 from "../Icons/Palete1";
import "./style.css";
import Palete2 from "../Icons/Palete2";
import Palete3 from "../Icons/Palete3";
import Palete4 from "../Icons/Palete4";
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
          <Palete1 />
        ) : palete === "palete2" ? (
          <Palete2 />
        ) : palete === "palete3" ? (
          <Palete3 />
        ) : palete === "palete4" ? (
          <Palete4 />
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
          <Palete1 />
        </div>
        <div className="menu-item" onClick={() => setPalete("palete2")}>
          <Palete2 />
        </div>
        <div className="menu-item" onClick={() => setPalete("palete3")}>
          <Palete3 />
        </div>
        <div className="menu-item" onClick={() => setPalete("palete4")}>
          <Palete4 />
        </div>
        <span>Configurações Avançadas...</span>
      </div>
    </>
  );
};

export default SelectPalete;
