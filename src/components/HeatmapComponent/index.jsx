import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { renderHeatmap } from "./hooks/renderHeatmap";
import {
  sortAndGroupedColumns,
  sortAndGroupedLines,
  sortMatrixByColumnSum,
  sortMatrixByRowSum,
} from "./hooks/sortMatrix";

const Heatmap = ({
  width,
  height,
  margin,
  labelsX,
  labelsY,
  matrix,
  type,
  order = null,
  orderBy = null,
  palete = null,
  selectedLabel,
  setSelectedLabel,
}) => {
  const heatmapRef = useRef(null);
  const [dataset, setDataset] = useState(matrix);
  const [data_x, setDataX] = useState(labelsX);
  const [data_y, setDataY] = useState(labelsY);

  const [refLabelsX, setRefLabelsX] = useState(labelsX);
  const [refLabelsY, setRefLabelsY] = useState(labelsY);
  const [refMatrix, setRefMatrix] = useState(matrix);

  function handleOnMouseOver(event, type) {
    // Pass
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleOnMouseClick(event, type) {
    if (type == "x") setSelectedLabel(event.target.__data__.source);
    else if (type == "y") setSelectedLabel(event.target.__data__.target);
  }

  useEffect(() => {
    let dataset = JSON.parse(JSON.stringify(refMatrix));
    let data_x = JSON.parse(JSON.stringify(refLabelsX));
    let data_y = JSON.parse(JSON.stringify(refLabelsY));

    if (orderBy == "x" && order == "ascending") {
      console.log("x and ascending");
      sortAndGroupedColumns(dataset, data_y, false, "score");
    } else if (orderBy == "x" && order == "descending") {
      console.log("x and descending");
      sortAndGroupedColumns(dataset, data_y, true, "score");
    } else if (orderBy == "y" && order == "ascending") {
      console.log("y and ascending");
      sortAndGroupedLines(dataset, data_x, false, "score");
    } else if (orderBy == "y" && order == "descending") {
      console.log("y and descending");
      sortAndGroupedLines(dataset, data_x, true, "score");
    } else if (orderBy == "all" && order == "ascending") {
      console.log("all and ascending");
      sortMatrixByRowSum(dataset, data_y, true);
      sortMatrixByColumnSum(dataset, data_x, true);
    } else if (orderBy == "all" && order == "descending") {
      console.log("all and descending");
      sortMatrixByRowSum(dataset, data_y, false);
      sortMatrixByColumnSum(dataset, data_x, false);
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
    refLabelsX,
    refLabelsY,
    refMatrix,
  ]);

  useEffect(() => {
    setRefLabelsX(labelsX);
    setRefLabelsY(labelsY);
    setRefMatrix(matrix);

  }, [matrix, labelsX, labelsY]);

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

    const color =
      type == "categorical"
        ? palete == "palete1"
          ? ["#E5193B", "#3FCC33"]
          : palete == "palete2"
            ? ["#88572C", "#DDB27C", "#12939A"]
            : ["#00939C", "#89C6CA", "#E6FAFA"]
        : colorScale;

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
      selectedLabel
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

export default Heatmap;
