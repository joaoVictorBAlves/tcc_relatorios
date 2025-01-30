export function createMatrixLayout(xLabels, yLabels, matrix, width, height, margin) {
    console.log("xLabels", xLabels);
    console.log("yLabels", yLabels);
    console.log("matrix", matrix);

    const layout = [];
    const totalX = xLabels.length; // Deve ser igual ao número de colunas da matriz
    const totalY = yLabels.length; // Deve ser igual ao número de linhas da matriz

    const cellWidth = (width - margin) / totalX;
    const cellHeight = (height - margin) / totalY;

    for (let i = 0; i < totalY; i++) {
        for (let j = 0; j < totalX; j++) {
            const x = j * cellWidth;
            const y = i * cellHeight;

            // Certifique-se de que a matriz tem o valor correto antes de acessar
            const value = matrix[i]?.[j] !== undefined ? matrix[i][j] : -1;

            const cell = {
                x: x,
                y: y,
                w: cellWidth,
                h: cellHeight,
                i: i,
                j: j,
                source: xLabels[j] ?? "N/A",
                target: yLabels[i] ?? "N/A",
                value: value
            };

            layout.push(cell);
        }
    }

    return layout;
}
