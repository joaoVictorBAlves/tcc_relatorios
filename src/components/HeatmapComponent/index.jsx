import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { renderHeatmap } from "./hooks/renderHeatmap";
import {
  sortAndGroupedColumns,
  sortAndGroupedLines,
  sortMatrixByColumnSum,
  sortMatrixByRowSum,
} from "./hooks/sortMatrix";

import data from "../../db/db.json";

const HeatmapComponent = ({
  width,
  height,
  margin,
  labelsX,
  labelsY,
  matrix,
  type,
  order = 1,
  orderBy = "all",
  palete = null,
  selectedLabel,
  setSelectedLabel,
  payloadArray,
}) => {
  const heatmapRef = useRef(null);

  const [dataset, setDataset] = useState(matrix);
  const [data_x, setDataX] = useState(labelsX);
  const [data_y, setDataY] = useState(labelsY);

  const [refLabelsX, setRefLabelsX] = useState(labelsX);
  const [refLabelsY, setRefLabelsY] = useState(labelsY);
  const [refMatrix, setRefMatrix] = useState(matrix);
  const [refPayloadArray, setRefPayloadArray] = useState(payloadArray);

  function handleOnMouseOver(event, type) {}

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleOnMouseClick(event, type) {
    if (type == "x") setSelectedLabel(event.target.__data__.source);
    else if (type == "y") setSelectedLabel(event.target.__data__.target);
  }

  useEffect(() => {
    setDataset(matrix);
    setDataX(labelsX);
    setDataY(labelsY);
    setRefLabelsX(labelsX);
    setRefLabelsY(labelsY);
    setRefMatrix(matrix);
    setRefPayloadArray(payloadArray);
  }, [matrix, labelsX, labelsY, payloadArray]);

  useEffect(() => {
    let dataset = JSON.parse(JSON.stringify(refMatrix));
    let data_x = JSON.parse(JSON.stringify(refLabelsX));
    let data_y = JSON.parse(JSON.stringify(refLabelsY));

    if (orderBy == "1" && order == "1") {
      sortAndGroupedLines(dataset, data_y, true, "error");
    } else if (orderBy == "1" && order == "2") {
      sortAndGroupedLines(dataset, data_y, false, "error");
    } else if (orderBy == "1" && order == "3") {
      let payloadArray = JSON.parse(JSON.stringify(refPayloadArray));
      sortAndGroupedLines(dataset, data_y, false, "prof", payloadArray);
    } else if (orderBy == "1" && order == "4") {
      let payloadArray = JSON.parse(JSON.stringify(refPayloadArray));
      sortAndGroupedLines(dataset, data_y, true, "prof", payloadArray);
    } else if (orderBy == "2" && order == "1") {
      sortAndGroupedColumns(dataset, data_x, true, "error");
    } else if (orderBy == "2" && order == "2") {
      sortAndGroupedColumns(dataset, data_x, false, "error");
    } else if (orderBy == "2" && order == "3") {
      let payloadArray = JSON.parse(JSON.stringify(refPayloadArray));
      sortAndGroupedColumns(dataset, data_x, true, "dificulty", payloadArray);
    } else if (orderBy == "2" && order == "4") {
      let payloadArray = JSON.parse(JSON.stringify(refPayloadArray));
      sortAndGroupedColumns(dataset, data_x, false, "dificulty", payloadArray);
    }

    setDataset(dataset);
    setDataX(data_x);
    setDataY(data_y);
  }, [
    labelsX,
    labelsY,
    matrix,
    order,
    orderBy,
    payloadArray,
    refLabelsX,
    refLabelsY,
    refMatrix,
    refPayloadArray,
  ]);

  useEffect(() => {
    const distinctValues = [...new Set(matrix.flat())];
    const colorScale = d3
      .scaleSequential()
      .domain([Math.min(...distinctValues), Math.max(...distinctValues)])
      .interpolator(
        palete == "palete2"
          ? d3.interpolateRdBu
          : palete == "palete3"
          ? d3.interpolateBlues
          : d3.interpolateRdYlGn
      );

    let color;

    if (type == "categorical") {
      if (palete == "palete1") {
        color = ["#E5193B", "#FED233", "#3FCC33"];
      } else if (palete == "palete2") {
        color = ["#88572C", "#DDB27C", "#12939A"];
      } else {
        color = ["#00939C", "#89C6CA", "#E6FAFA"];
      }
    } else if (type == "binary") {
      if (palete == "palete1") {
        color = ["#E5193B", "#3FCC33"];
      } else if (palete == "palete2") {
        color = ["#88572C", "#12939A"];
      } else {
        color = ["#00939C", "#89C6CA"];
      }
    } else {
      color = colorScale;
    }

    renderHeatmap(
      data_x,
      data_y,
      dataset,
      width,
      height,
      margin,
      heatmapRef,
      color,
      orderBy,
      type,
      handleOnMouseOver,
      handleOnMouseClick,
      selectedLabel,
      data
    );
  }, [
    dataset,
    data_x,
    orderBy,
    order,
    data_y,
    width,
    height,
    margin,
    heatmapRef,
    type,
    palete,
    selectedLabel,
    matrix,
    handleOnMouseClick,
  ]);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg ref={heatmapRef} width={width} height={height}></svg>
    </div>
  );
};

export default HeatmapComponent;
