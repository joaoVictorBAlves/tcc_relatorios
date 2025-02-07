import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
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
  agroupX,
  agroupY,
}) => {
  const heatmapRef = useRef(null);
  const [dataset, setDataset] = useState(matrix);
  const [data_x, setDataX] = useState(labelsX);
  const [data_y, setDataY] = useState(labelsY);

  const [refLabelsX, setRefLabelsX] = useState(labelsX);
  const [refLabelsY, setRefLabelsY] = useState(labelsY);
  const [refMatrix, setRefMatrix] = useState(matrix);

  function handleOnMouseOver() {
    // Pass
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleOnMouseClick(event, type) {
    if (type == "x") setSelectedLabel(event.target.__data__.source);
    else if (type == "y") setSelectedLabel(event.target.__data__.target);
  }

  const getGroups = (labels) => {
    const groupMap = new Map();

    labels.forEach((label, index) => {
      const group = label.split("_").pop();
      if (!groupMap.has(group)) groupMap.set(group, []);
      groupMap.get(group).push(index);
    });

    return groupMap;
  };

  useEffect(() => {
    let newDataset = JSON.parse(JSON.stringify(refMatrix));
    let newDataX = JSON.parse(JSON.stringify(refLabelsX));
    let newDataY = JSON.parse(JSON.stringify(refLabelsY));

    let groupsX = agroupX ? getGroups(newDataX) : null;
    let groupsY = agroupY ? getGroups(newDataY) : null;

    if (agroupX && groupsX && agroupY && groupsY) {
      groupsX.forEach((indices) => {
        let start = indices[0];
        let end = indices[indices.length - 1] + 1;

        let aux_data_x = [...newDataX.slice(start, end)];
        let aux_dataset = newDataset.map((row) => [...row.slice(start, end)]);

        if (orderBy === "y" && order === "ascending") {
          sortAndGroupedColumns(aux_dataset, aux_data_x, true, "score");
        } else if (orderBy === "y" && order === "descending") {
          sortAndGroupedColumns(aux_dataset, aux_data_x, false, "score");
        } else if (orderBy === "all" && order === "ascending") {
          sortMatrixByColumnSum(aux_dataset, aux_data_x, true);
        } else if (orderBy === "all" && order === "descending") {
          sortMatrixByColumnSum(aux_dataset, aux_data_x, false);
        }

        newDataX.splice(start, end - start, ...aux_data_x);
        newDataset.forEach((row, rowIndex) => {
          row.splice(start, end - start, ...aux_dataset[rowIndex]);
        });
      });

      groupsY.forEach((indices) => {
        let start = indices[0];
        let end = indices[indices.length - 1] + 1;

        let aux_data_y = [...newDataY.slice(start, end)];
        let aux_dataset = [...newDataset.slice(start, end)];

        if (orderBy === "x" && order === "ascending") {
          sortAndGroupedLines(aux_dataset, aux_data_y, true, "score");
        } else if (orderBy === "x" && order === "descending") {
          sortAndGroupedLines(aux_dataset, aux_data_y, false, "score");
        } else if (orderBy === "all" && order === "ascending") {
          sortMatrixByRowSum(aux_dataset, aux_data_y, true);
        } else if (orderBy === "all" && order === "descending") {
          sortMatrixByRowSum(aux_dataset, aux_data_y, false);
        }

        newDataY.splice(start, end - start, ...aux_data_y);
        newDataset.splice(start, end - start, ...aux_dataset);
      });
    } else if (agroupX && groupsX) {
      groupsX.forEach((indices) => {
        let start = indices[0];
        let end = indices[indices.length - 1] + 1;

        let aux_data_x = [...newDataX.slice(start, end)];
        let aux_data_y = [...newDataY];
        let aux_dataset = newDataset.map((row) => [...row.slice(start, end)]);

        if (orderBy === "y" && order === "ascending") {
          sortAndGroupedColumns(aux_dataset, aux_data_x, true, "score");
        } else if (orderBy === "y" && order === "descending") {
          sortAndGroupedColumns(aux_dataset, aux_data_x, false, "score");
        } else if (orderBy === "all" && order === "ascending") {
          sortMatrixByColumnSum(aux_dataset, aux_data_x, true);
          sortMatrixByRowSum(aux_dataset, aux_data_y, true);
        } else if (orderBy === "all" && order === "descending") {
          sortMatrixByColumnSum(aux_dataset, aux_data_x, false);
          sortMatrixByRowSum(aux_dataset, aux_data_y, false);
        }

        newDataX.splice(start, end - start, ...aux_data_x);
        newDataset.forEach((row, rowIndex) => {
          row.splice(start, end - start, ...aux_dataset[rowIndex]);
        });
      });
    } else if (agroupY && groupsY) {
      groupsY.forEach((indices) => {
        let start = indices[0];
        let end = indices[indices.length - 1] + 1;

        let aux_data_y = [...newDataY.slice(start, end)];
        let aux_data_x = [...newDataX];
        let aux_dataset = [...newDataset.slice(start, end)];

        if (orderBy === "x" && order === "ascending") {
          sortAndGroupedLines(aux_dataset, aux_data_y, true, "score");
        } else if (orderBy === "x" && order === "descending") {
          sortAndGroupedLines(aux_dataset, aux_data_y, false, "score");
        } else if (orderBy === "all" && order === "ascending") {
          sortMatrixByRowSum(aux_dataset, aux_data_y, true);
          sortMatrixByColumnSum(aux_dataset, aux_data_x, true);
        } else if (orderBy === "all" && order === "descending") {
          sortMatrixByRowSum(aux_dataset, aux_data_y, false);
          sortMatrixByColumnSum(aux_dataset, aux_data_x, false);
        }

        newDataY.splice(start, end - start, ...aux_data_y);
        newDataset.splice(start, end - start, ...aux_dataset);
      });
    }

    if (!agroupX && !agroupY) {
      if (orderBy === "x" && order === "ascending") {
        sortAndGroupedLines(newDataset, newDataY, true, "score");
      } else if (orderBy === "x" && order === "descending") {
        sortAndGroupedLines(newDataset, newDataY, false, "score");
      } else if (orderBy === "y" && order === "ascending") {
        sortAndGroupedColumns(newDataset, newDataX, true, "score");
      } else if (orderBy === "y" && order === "descending") {
        sortAndGroupedColumns(newDataset, newDataX, false, "score");
      } else if (orderBy === "all" && order === "ascending") {
        sortMatrixByRowSum(newDataset, newDataY, true);
        sortMatrixByColumnSum(newDataset, newDataX, true);
      } else if (orderBy === "all" && order === "descending") {
        sortMatrixByRowSum(newDataset, newDataY, false);
        sortMatrixByColumnSum(newDataset, newDataX, false);
      }
    }

    setDataset(newDataset);
    setDataX(newDataX);
    setDataY(newDataY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    labelsX,
    labelsY,
    matrix,
    order,
    orderBy,
    refLabelsX,
    refLabelsY,
    refMatrix,
    agroupX,
    agroupY,
  ]);

  useEffect(() => {
    setRefLabelsX(labelsX);
    setRefLabelsY(labelsY);
    setRefMatrix(matrix);
  }, [matrix, labelsX, labelsY]);

  useEffect(() => {
    const color =
      palete == "palete1"
        ? d3.interpolateRdYlGn
        : palete == "palete2"
        ? d3.interpolateBrBG
        : palete == "palete3"
        ? d3.interpolateBlues
        : d3.interpolateRdYlBu;

    renderHeatmap(
      data_x,
      data_y,
      dataset,
      width,
      height,
      margin,
      heatmapRef,
      color,
      order,
      orderBy,
      type,
      handleOnMouseOver,
      handleOnMouseClick,
      selectedLabel,
      agroupX,
      agroupY
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
    agroupX,
    agroupY,
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
Heatmap.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  margin: PropTypes.object.isRequired,
  labelsX: PropTypes.array.isRequired,
  labelsY: PropTypes.array.isRequired,
  matrix: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  palete: PropTypes.string,
  selectedLabel: PropTypes.string,
  setSelectedLabel: PropTypes.func.isRequired,
  agroupX: PropTypes.bool,
  agroupY: PropTypes.bool,
};

export default Heatmap;
