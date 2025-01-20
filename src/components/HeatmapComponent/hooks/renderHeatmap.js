import { createMatrixLayout } from "./createMatrixLayout";
import * as d3 from "d3";

export function renderHeatmap(labelsX, labelsY, matrix, width, height, margin, heatmapRef, color, orderBy, type, handleOnMouseOver, handleOnMouseClick, selectedLabel, extradata) {
    const data = createMatrixLayout(
        labelsX,
        labelsY,
        matrix,
        width,
        height,
        margin
    );
    console.log("recebendo dados....")
    console.log({
        labelsX,
        labelsY,
        matrix
    })
    // Limpar o gráfico existente
    d3.select(heatmapRef.current).selectAll("*").remove();
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
        .attr("width", (d) => d.w * 0.95)
        .attr("rx", "6px")
        .attr("ry", "6px")
        .style("fill", (d) => {
            if (d.value == undefined || d.value == null || d.value === '') {
                return "white";
            }
            return Array.isArray(color) ? color[d.value] : color(d.value);
        })
        .on("mouseover", function () {
            d3.select(this).style("fill", d3.color(d3.select(this).style("fill")).darker());
        })
        .on("mouseout", function () {
            d3.select(this).style("fill", d3.color(d3.select(this).style("fill")).brighter());
        });
    if (orderBy != "2")
        matrixGroup
            .append("g")
            .attr("class", "labels")
            .selectAll("text.source")
            .data(data.filter((d) => d.x === 0))
            .enter()
            .append("text")
            .attr("class", "source")
            .attr("text-anchor", "end")
            .attr("y", (d) => d.y + d.h / 2)
            .attr("x", -10)
            .text((d, i) => labelsY[i].label)
            .style("cursor", "pointer")
            .on('click', function (event) {
                handleOnMouseClick(event, "y");
            }).attr("fill", (d) => {
                if (d?.target == selectedLabel) {
                    return "#365BDC"
                }
                return "black";
            }).style("font-weight", (d) => {
                if (d?.target == selectedLabel) {
                    return "700"
                }
                return "normal";
            });
    if (orderBy != "1") {
        matrixGroup
            .append("g")
            .attr("class", "labels")
            .selectAll("text.target")
            .data(data.filter((d) => d.y === 0))
            .enter()
            .append("text")
            .attr("class", "target")
            .attr("text-anchor", "middle")
            .attr("x", (d) => d.x + d.w / 2)
            .attr("y", -20)
            .text((d, i) => labelsX[i].label)
            .style("cursor", "pointer")
            .on('click', function (event) {
                handleOnMouseClick(event, "x");
            })
            .attr("fill", (d) => {
                if (d?.source == selectedLabel) {
                    return "#365BDC";
                }
                return "black";
            })
            .style("font-weight", (d) => {
                if (d?.source == selectedLabel) {
                    return "700";
                }
                return "normal";
            })
            .call((selection) => {
                selection.append("title")
                    .text((d) => {
                        if (d.source == "H1") {
                            return extradata.abilities[0];
                        } else if (d.source == "H2") {
                            return extradata.abilities[1];
                        } else if (d.source == "H3") {
                            return extradata.abilities[2];
                        } else if (d.source == "H4") {
                            return extradata.abilities[3];
                        }
                        return '';
                    });
            });
    }



    matrixGroup
        .selectAll("text")
        .style("font-family", "Poppins, sans-serif")
        .style("font-weight", "400")
        .style("font-size", "18px")
        .style("alignment-baseline", "middle");
}
