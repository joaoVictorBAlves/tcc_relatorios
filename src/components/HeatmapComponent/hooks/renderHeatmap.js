import { createMatrixLayout } from "./createMatrixLayout";
import * as d3 from "d3";

export function renderHeatmap(labelsX, labelsY, matrix, width, height, margin, heatmapRef, color, orderBy, type, handleOnMouseOver, handleOnMouseClick, selectedLabel, agroupedX, agroupedY) {

    let groupsX = Array.from(new Set(labelsX.map((label) => label.split("_e")[1])));

    let groupsY = Array.from(new Set(labelsY.map((label) => label.split("Student_")[1]?.split("_")[1])));

    // Limpar o gráfico existente
    d3.select(heatmapRef.current).selectAll("*").remove();

    let matrixCopy = matrix.map((row) => [...row]);
    let labelsXCopy = [...labelsX];
    let labelsYCopy = [...labelsY];

    // Calcular somas das linhas e colunas
    const rowSums = matrixCopy.map(row => row.reduce((sum, val) => sum + val, 0));
    const colSums = matrixCopy[0]?.map((_, colIndex) => matrixCopy.reduce((sum, row) => sum + row[colIndex], 0)) || [];

    if (orderBy != "y")
        matrixCopy.forEach((row, rowIndex) => {
            row.push(rowSums[rowIndex]);
        });

    if (orderBy != "x")
        if (colSums.length) {
            matrixCopy.push([...colSums, colSums.reduce((sum, val) => sum + val, 0)]);
        }

    // **Corrigir labels**
    labelsXCopy.push("Total");
    labelsYCopy.push("Total");

    const data = createMatrixLayout(labelsXCopy, labelsYCopy, matrixCopy, width, height, margin);

    // Render
    const svg = d3.select(heatmapRef.current);
    const matrixGroup = svg
        .append("g")
        .attr("transform", `translate(${[margin / 2 + 20, margin / 2 + 20]})`);
    const innerChart = matrixGroup.append("g").attr("class", "innerChart");
    const cell = innerChart
        .selectAll("g.cell")
        .data(data)
        .join("g")
        .attr("class", "cell")
        .attr("transform", (d) => {
            let translateX = d.x;
            let translateY = d.y;

            // Adicionar espaçamento entre grupos X
            if (agroupedX && groupsX.length > 1) {
                const groupIndex = groupsX.findIndex(group => labelsX[d.j + 1]?.includes(group));

                if (groupIndex !== -1) {
                    translateX += groupIndex * 10; // Ajuste o valor 10 conforme necessário para o espaçamento
                }
            }

            // Adicionar espaçamento entre grupos Y
            if (agroupedY && groupsY.length > 1) {
                const groupIndex = groupsY.findIndex(group => labelsY[d.i]?.includes(group));
                if (groupIndex !== -1) {
                    translateY += groupIndex * 10; // Ajuste o valor 10 conforme necessário para o espaçamento
                }
            }

            return `translate(${[translateX, translateY]})`;
        });

    cell.append("rect")
        .attr("height", (d) => d.h * 0.95)
        .attr("width", (d) => {
            const isColSum = d.j === labelsXCopy.length - 1;
            if (isColSum) return 50;
            return d.w * 0.995
        })
        .attr("rx", "1px")
        .attr("ry", "1px")
        .attr("transform", (d) => {
            const isRowSum = d.i === labelsYCopy.length - 1;
            const isColSum = d.j === labelsXCopy.length - 1;

            let translateX = isColSum ? 10 : 0;
            let translateY = isRowSum ? agroupedY ? 20 : 10 : 0;

            return `translate(${translateX}, ${translateY})`;
        })
        .style("fill", (d) => {
            const isRowSum = d.i === labelsYCopy.length - 1;
            const isColSum = d.j === labelsXCopy.length - 1;
            const isLastCell = isRowSum && isColSum;

            if (isLastCell) return "none";
            if (isRowSum) {
                if (orderBy == "x") return "#FFF";

                const rowValues = data.filter(d => d.i === labelsYCopy.length - 1 && d.j !== labelsXCopy.length - 1).map(d => d.value);
                const min = d3.min(rowValues);
                const max = d3.max(rowValues);
                const colorScale = d3.scaleSequential(d3.interpolateRdYlGn).domain([min, max]);
                return colorScale(d.value);
            }
            if (isColSum) {
                if (orderBy == "y") return "#FFF";

                const colValues = data.filter(d => d.j === labelsXCopy.length - 1 && d.i !== labelsYCopy.length - 1).map(d => d.value);
                const min = d3.min(colValues);
                const max = d3.max(colValues);
                const colorScale = d3.scaleSequential(d3.interpolateRdYlGn).domain([min, max]);
                return colorScale(d.value);
            }

            return d.value === 0 ? "#ED623E" : "#94D16A";
        })
        .on("mouseover", function () {
            d3.select(this).style("fill", d3.color(d3.select(this).style("fill")).darker());
        })
        .on("mouseout", function () {
            d3.select(this).style("fill", d3.color(d3.select(this).style("fill")).brighter());
        });

    if (orderBy != "y") {
        matrixGroup
            .append("g")
            .attr("class", "labels")
            .selectAll("text.source")
            .data(data.filter((d) => d.x === 0 && d.i !== labelsYCopy.length - 1)) // Remove última célula
            .enter()
            .append("text")
            .attr("class", "source")
            .attr("text-anchor", "start")
            .attr("y", (d) => {
                const groupIndex = agroupedY ? groupsY.findIndex(group => labelsY[d.i]?.includes(group)) : 0;
                const yOffset = groupIndex > 0 ? 10 : 0; // Adicionar espaçamento apenas a partir do segundo grupo
                return d.y + d.h / 2 + yOffset;
            })
            .attr("x", -40)
            .text((d, i) => `A${labelsYCopy[i]?.split("_")[1]}`)
            .style("cursor", "pointer")
            .on('click', function (event) {
                handleOnMouseClick(event, "y");
            }).attr("fill", (d) => {
                if (d?.target == selectedLabel) {
                    return "#365BDC";
                }
                return "black";
            }).style("font-weight", (d) => {
                if (d?.target == selectedLabel) {
                    return "700";
                }
                return "normal";
            });
    }

    if (agroupedX && groupsX.length > 1) {
        matrixGroup
            .append("g")
            .attr("class", "labels")
            .selectAll("text.group")
            .data(groupsX)
            .enter()
            .append("text")
            .attr("class", "group")
            .attr("text-anchor", "middle")
            .attr("x", (d, i) => {
                if (agroupedX && groupsX.length > 1) {
                    const xOffset = i > 0 ? 10 : 0; // Adicionar espaçamento apenas a partir do segundo grupo
                    return (i + 0.4) * (width / groupsX.length) + xOffset;
                }
                return (i + 0.5) * (width);
            })
            .attr("y", -40)
            .text((d) => `Exame ${d}`)
            .style("cursor", "pointer")
            .on('click', function (event, d) {
                handleOnMouseClick(event, "group", d);
            })
            .attr("fill", (d) => {
                if (d === selectedLabel) {
                    return "#365BDC";
                }
                return "black";
            })
            .style("font-weight", (d) => {
                if (d === selectedLabel) {
                    return "700";
                }
                return "normal";
            });
    }

    if (agroupedY && groupsY.length > 1) {
        matrixGroup
            .append("g")
            .attr("class", "labels")
            .selectAll("text.groupY")
            .data(groupsY)
            .enter()
            .append("text")
            .attr("class", "groupY")
            .attr("text-anchor", "middle")
            .attr("x", -25)
            .attr("y", (d, i) => (i + 0.5) * (height / groupsY.length))
            .attr("transform", (d, i) => `rotate(-90, -60, ${(i + 0.5) * (height / groupsY.length)})`)
            .text((d) => `Turma ${d.toUpperCase()}`)
            .style("cursor", "pointer")
            .on('click', function (event, d) {
                handleOnMouseClick(event, "groupY", d.toUpperCase());
            })
            .attr("fill", (d) => {
                if (d === selectedLabel) {
                    return "#365BDC";
                }
                return "black";
            })
            .style("font-weight", (d) => {
                if (d === selectedLabel) {
                    return "700";
                }
                return "normal";
            });
    }

    if (orderBy != "x")
        matrixGroup
            .append("g")
            .attr("class", "labels")
            .selectAll("text.target")
            .data(data.filter((d) => d.y === 0 && d.j !== labelsXCopy.length - 1)) // Remove última célula
            .enter()
            .append("text")
            .attr("class", "target")
            .attr("text-anchor", "middle")
            .attr("x", (d) => d.x + d.w / 2)
            .attr("y", -20)
            .text((d, i) => `${labelsXCopy[i]?.split("_")[0]}`)
            .style("cursor", "pointer")
            .on('click', function (event) {
                handleOnMouseClick(event, "x");
            }).attr("fill", (d) => {
                if (d?.source == selectedLabel) {
                    return "#365BDC";
                }
                return "black";
            }).style("font-weight", (d) => {
                if (d?.source == selectedLabel) {
                    return "700";
                }
                return "normal";
            });


    matrixGroup
        .selectAll("text")
        .style("font-family", "Poppins, sans-serif")
        .style("font-weight", "400")
        .style("font-size", "12px")
        .style("alignment-baseline", "middle");
}
