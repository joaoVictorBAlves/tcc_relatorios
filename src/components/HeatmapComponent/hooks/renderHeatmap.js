import { createMatrixLayout } from "./createMatrixLayout";
import * as d3 from "d3";

export function renderHeatmap(labelsX, labelsY, matrix, width, height, margin, heatmapRef, color, orderBy, type, handleOnMouseOver, handleOnMouseClick, selectedLabel) {
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
            row.push(rowSums[rowIndex]); // Adiciona soma da linha
        });

    if (orderBy != "x")
        if (colSums.length) {
            matrixCopy.push([...colSums, colSums.reduce((sum, val) => sum + val, 0)]); // Adiciona soma total
        }

    // **Corrigir labels**
    labelsXCopy.push("Total");
    labelsYCopy.push("Total");

    const data = createMatrixLayout(labelsXCopy, labelsYCopy, matrixCopy, width, height, margin);

    // Render
    const svg = d3.select(heatmapRef.current);
    const matrixGroup = svg
        .append("g")
        .attr("transform", `translate(${[margin / 2, margin / 2]})`);
    const innerChart = matrixGroup.append("g").attr("class", "innerChart");
    const cell = innerChart
        .selectAll("g.cell")
        .data(data)
        .join("g")
        .attr("class", "cell")
        .attr("transform", (d) => `translate(${[d.x, d.y]})`);

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
            const isRowSum = d.i === labelsYCopy.length - 1; // Última linha
            const isColSum = d.j === labelsXCopy.length - 1; // Última coluna

            let translateX = isColSum ? 10 : 0; // Empurra células da última coluna para a direita
            let translateY = isRowSum ? 10 : 0; // Empurra células da última linha para baixo

            return `translate(${translateX}, ${translateY})`;
        })
        .style("fill", (d) => {
            const isRowSum = d.i === labelsYCopy.length - 1;
            const isColSum = d.j === labelsXCopy.length - 1;
            const isLastCell = isRowSum && isColSum;

            if (isLastCell) return "none"; // Torna invisível a última célula
            if (isRowSum) {
                if (orderBy == "x") return "#FFF";

                return d3.scaleSequential(d3.interpolateRdYlGn).domain([0, labelsYCopy.length])(d.value);
            }
            if (isColSum) {
                if (orderBy == "y") return "#FFF";

                return d3.scaleSequential(d3.interpolateRdYlGn).domain([0, labelsXCopy.length])(d.value);
            }

            return color[d.value] ? color[d.value] : color[0]; // Cor normal
        })
        .on("mouseover", function () {
            d3.select(this).style("fill", d3.color(d3.select(this).style("fill")).darker());
        })
        .on("mouseout", function () {
            d3.select(this).style("fill", d3.color(d3.select(this).style("fill")).brighter());
        });


    if (orderBy != "y")
        matrixGroup
            .append("g")
            .attr("class", "labels")
            .selectAll("text.source")
            .data(data.filter((d) => d.x === 0 && d.i !== labelsYCopy.length - 1)) // Remove última célula
            .enter()
            .append("text")
            .attr("class", "source")
            .attr("text-anchor", "start")
            .attr("y", (d) => d.y + d.h / 2)
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
