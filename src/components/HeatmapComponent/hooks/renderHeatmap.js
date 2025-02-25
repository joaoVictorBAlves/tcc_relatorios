import { createMatrixLayout } from "./createMatrixLayout";
import * as d3 from "d3";

const getGroups = (labels) => {
    const groupMap = new Map();

    labels.forEach((label, index) => {
        const group = label.split("_").pop();
        if (!groupMap.has(group)) groupMap.set(group, []);
        groupMap.get(group).push(index);
    });

    return groupMap;
};

export function renderHeatmap(labelsX, labelsY, matrix, width, height, margin, heatmapRef, color, order, orderBy, type, handleOnMouseOver, handleOnMouseClick, selectedLabel, agroupedX, agroupedY) {

    let groupsX = Array.from(new Set(labelsX.map((label) => label.split("_e")[1])));

    let groupsY = Array.from(new Set(labelsY.map((label) => label.split("Student_")[1]?.split("_")[1])));

    let groupsXMapped = getGroups(labelsX);
    let groupsYMapped = getGroups(labelsY);

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

            let currentGroupIndex = -1;
            groupsXMapped.forEach((indices, group) => {
                if (indices.includes(d.j)) {
                    currentGroupIndex = groupsX.indexOf(group[1]);
                }
            });

            if (agroupedX && groupsX.length > 1) {
                if (currentGroupIndex !== -1) {
                    translateX += currentGroupIndex * 10;
                } else {
                    translateX += 10;
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

            const colorMap = {
                interpolateRdYlGn: d3.interpolateRdYlGn,
                interpolateBrBG: d3.interpolateBrBG,
                interpolateBlues: d3.interpolateBlues,
                interpolateRdYlBu: d3.interpolateRdYlBu,
            };


            const getColorName = (colorFunction) => {
                return Object.keys(colorMap).find(key => colorMap[key] === colorFunction);
            };

            const colorName = getColorName(color);

            if (isRowSum) {
                if (orderBy == "x") return "#FFF";

                const rowValues = data.filter(d => d.i === labelsYCopy.length - 1 && d.j !== labelsXCopy.length - 1).map(d => d.value);
                const min = d3.min(rowValues);
                const max = d3.max(rowValues);
                let colorsPalete = [];

                if (colorName === "interpolateRdYlGn") {
                    colorsPalete = ["#ED623E", "#a17b72", "#829574", "#94D16A"];
                } else if (colorName === "interpolateBrBG") {
                    colorsPalete = ["#8D5510", "#B07A4D", "#6E8F8A", "#4DA79E"];
                } else if (colorName === "interpolateBlues") {
                    colorsPalete = ["#B7D5EA", "#8AB4D6", "#5A93C3", "#3887C0"];
                } else if (colorName === "interpolateRdYlBu") {
                    colorsPalete = ["#CA2F26", "#D96A4E", "#A48BB1", "#7CABD2"];
                }

                const customInterpolator = (t) => {
                    if (t < 0.5) {
                        // Primeira metade: vai do vermelho para um tom menos saturado (cinza esverdeado)
                        return d3.interpolateHsl(colorsPalete[0], colorsPalete[1])(t * 2);
                    } else {
                        // Segunda metade: vai do cinza esverdeado para o verde
                        return d3.interpolateHsl(colorsPalete[2], colorsPalete[3])((t - 0.5) * 2);
                    }
                };

                const colorScale = d3.scaleSequential(customInterpolator).domain([min, max]);
                return colorScale(d.value);
            }

            if (isColSum) {
                if (orderBy == "y") return "#FFF";

                const colValues = data.filter(d => d.j === labelsXCopy.length - 1 && d.i !== labelsYCopy.length - 1).map(d => d.value);
                const min = d3.min(colValues);
                const max = d3.max(colValues);
                // Função de interpolação personalizada  
                let colorsPalete = [];

                if (colorName === "interpolateRdYlGn") {
                    colorsPalete = ["#ED623E", "#a17b72", "#829574", "#94D16A"];
                } else if (colorName === "interpolateBrBG") {
                    colorsPalete = ["#8D5510", "#B07A4D", "#6E8F8A", "#4DA79E"];
                } else if (colorName === "interpolateBlues") {
                    colorsPalete = ["#B7D5EA", "#8AB4D6", "#5A93C3", "#3887C0"];
                } else if (colorName === "interpolateRdYlBu") {
                    colorsPalete = ["#CA2F26", "#D96A4E", "#A48BB1", "#7CABD2"];
                }

                const customInterpolator = (t) => {
                    if (t < 0.5) {
                        // Primeira metade: vai do vermelho para um tom menos saturado (cinza esverdeado)
                        return d3.interpolateHsl(colorsPalete[0], colorsPalete[1])(t * 2);
                    } else {
                        // Segunda metade: vai do cinza esverdeado para o verde
                        return d3.interpolateHsl(colorsPalete[2], colorsPalete[3])((t - 0.5) * 2);
                    }
                };

                const colorScale = d3.scaleSequential(customInterpolator).domain([min, max]);
                return colorScale(d.value);
            }

            if (colorName === "interpolateRdYlGn") {
                return d.value === 0 ? "#ED623E" : "#94D16A";
            } else if (colorName === "interpolateBrBG") {
                return d.value === 0 ? "#8D5510" : "#4DA79E";
            } else if (colorName === "interpolateBlues") {
                return d.value === 0 ? "#B7D5EA" : "#3887C0";
            } else if (colorName === "interpolateRdYlBu") {
                return d.value === 0 ? "#CA2F26" : "#7CABD2";
            }

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
                return "#365BDC";
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
            .text((d) => `Exame de ${d == 1 ? 'Português' : 'Matemática'}`)
            .style("cursor", "")
            .on('click', function (event, d) {
                handleOnMouseClick(event, "group", d);
            })
            .attr("fill", (d) => {
                return "#1E3A8A";

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
                return "#1E3A8A";

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
                    return "#365BDC";
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
