import { createMatrixLayout } from "./createMatrixLayout";
import * as d3 from "d3";

export function renderHeatmap(labelsX, labelsY, matrix, width, height, margin, heatmapRef, color, orderBy, type, handleOnMouseOver, handleOnMouseClick, selectedLabel) {
    // Limpar o gráfico existente
    d3.select(heatmapRef.current).selectAll("*").remove();

    // Resetar a matriz e labels para evitar duplicação
    matrix = matrix.map(row => row.slice(0, -1));
    labelsX = labelsX.slice(0, -1);
    labelsY = labelsY.slice(0, -1);

    // Calcular somas das linhas e colunas
    const rowSums = matrix.map(row => row.reduce((sum, val) => sum + val, 0));
    const colSums = matrix[0]?.map((_, colIndex) => matrix.reduce((sum, row) => sum + row[colIndex], 0));

    // Adicionar rowSums como a última coluna
    matrix.forEach((row, rowIndex) => {
        row.push(rowSums[rowIndex]); // Adiciona soma da linha
    });

    // Adicionar colSums como a última linha
    if (colSums) {
        matrix.push([...colSums, colSums.reduce((sum, val) => sum + val, 0)]); // Adiciona soma total
    }

    // Escala de cores para as questões (usando uma paleta do d3)
    const questionColorScale = d3.scaleSequential(d3.interpolateRdYlGn)
        .domain([0, 10]);

    // Escala de cores para os alunos (usando uma paleta do d3)
    const studentColorScale = d3.scaleSequential(d3.interpolateRdYlGn)
        .domain([0, 10]);

    // Atualizar labels para refletir a nova matriz
    labelsX.push("Total");
    labelsY.push("Total");

    const data = createMatrixLayout(
        labelsX,
        labelsY,
        matrix,
        width,
        height,
        margin
    );


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

    cell
        .append("rect")
        .attr("height", (d) => d.h * 0.95)
        .attr("width", (d) => d.w * 0.995)
        .attr("rx", "1px")
        .attr("ry", "1px")
        .style("fill", (d) => {
            const isRowSum = d.i == labelsY.length - 1; // Última linha
            const isColSum = d.j == labelsX.length - 1; // Última coluna
            const isLastCell = isRowSum && isColSum; // Última célula da matriz (canto inferior direito)

            if (isLastCell) return "none"; // Torna invisível a última célula
            if (isRowSum) {
                return questionColorScale(d.value)
            };
            if (isColSum) return studentColorScale(d.value);

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
            .data(data.filter((d) => d.x === 0 && d.i !== labelsY.length - 1)) // Remove última célula
            .enter()
            .append("text")
            .attr("class", "source")
            .attr("text-anchor", "start")
            .attr("y", (d) => d.y + d.h / 2)
            .attr("x", -40)
            .text((d, i) => `A${labelsY[i]?.split("_")[1]}`)
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
            .data(data.filter((d) => d.y === 0 && d.j !== labelsX.length - 1)) // Remove última célula
            .enter()
            .append("text")
            .attr("class", "target")
            .attr("text-anchor", "middle")
            .attr("x", (d) => d.x + d.w / 2)
            .attr("y", -20)
            .text((d, i) => `${labelsX[i]?.split("_")[0]}`)
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
