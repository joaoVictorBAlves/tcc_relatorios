export function createMatrixLayout(xLabels, yLabels, matrix, width, height, margin) {
    const layout = [];
    const totalX = xLabels.length;
    const totalY = yLabels.length;

    const cellWidth = ((width) - margin) / totalX;
    const cellHeight = (height - margin) / totalY;

    // Loop pelas linhas
    for (let i = 0; i < totalY; i++) {
        const y = i * cellHeight;

        // Loop pelas colunas
        for (let j = 0; j < totalX; j++) {
            const x = j * cellWidth;

            // Crie um objeto para cada célula na matriz
            const cell = {
                x: x,
                y: y,
                w: cellWidth,
                h: cellHeight
            };

            // Adicione os rótulos das linhas e colunas, se existirem
            if (xLabels[j] !== undefined && yLabels[i] !== undefined) {
                cell.source = xLabels[j];
                cell.target = yLabels[i];
                cell.value = matrix[i][j]; // Considerando que a matriz está alinhada corretamente
            }

            layout.push(cell);
        }
    }

    return layout;
}
