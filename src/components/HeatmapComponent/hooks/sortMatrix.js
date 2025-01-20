export function sortMatrixLines(matrix, ascending = true) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length - 1; j++) {
            for (let k = 0; k < matrix[i].length - j - 1; k++) {
                if (ascending) {
                    if (matrix[i][k] > matrix[i][k + 1]) {
                        let temp = matrix[i][k];
                        matrix[i][k] = matrix[i][k + 1];
                        matrix[i][k + 1] = temp;
                    }
                } else {
                    if (matrix[i][k] < matrix[i][k + 1]) {
                        let temp = matrix[i][k];
                        matrix[i][k] = matrix[i][k + 1];
                        matrix[i][k + 1] = temp;
                    }
                }
            }
        }
    }
}

export function sortMatrixColumns(matrix, ascending = true) {
    for (let j = 0; j < matrix[0].length; j++) {
        for (let i = 0; i < matrix.length - 1; i++) {
            for (let k = 0; k < matrix.length - i - 1; k++) {
                if (ascending) {
                    if (matrix[k][j] > matrix[k + 1][j]) {
                        let temp = matrix[k][j];
                        matrix[k][j] = matrix[k + 1][j];
                        matrix[k + 1][j] = temp;
                    }
                } else {
                    if (matrix[k][j] < matrix[k + 1][j]) {
                        let temp = matrix[k][j];
                        matrix[k][j] = matrix[k + 1][j];
                        matrix[k + 1][j] = temp;
                    }
                }
            }
        }
    }
}

export function sortMatrixVertical(matrix, vector, factor) {
    const count = new Array(matrix.length).fill(0);

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === factor) {
                count[i]++;
            }
        }
    }

    // Ordenar a matriz com base na contagem
    for (let i = 0; i < matrix.length - 1; i++) {
        for (let j = 0; j < matrix.length - i - 1; j++) {
            if (count[j] > count[j + 1]) {
                // Troca de linhas na matriz
                const tempRow = matrix[j];
                const tempItem = vector[j];
                matrix[j] = matrix[j + 1];
                matrix[j + 1] = tempRow;
                vector[j] = vector[j + 1];
                vector[j + 1] = tempItem;

                // Troca de contagem
                const tempCount = count[j];
                count[j] = count[j + 1];
                count[j + 1] = tempCount;
            }
        }
    }
}

export function sortMatrixHorizontal(matrix, vector, factor) {
    const count = new Array(matrix[0].length).fill(0);

    // Contagem da presença do fator em cada coluna
    for (let j = 0; j < matrix[0].length; j++) {
        for (let i = 0; i < matrix.length; i++) {
            if (matrix[i][j] === factor) {
                count[j]++;
            }
        }
    }

    // Ordenar a matriz com base na contagem count
    for (let i = 0; i < matrix[0].length - 1; i++) {
        for (let j = 0; j < matrix[0].length - i - 1; j++) {
            if (count[j] > count[j + 1]) {
                for (let k = 0; k < matrix.length; k++) {
                    const temp = matrix[k][j];
                    matrix[k][j] = matrix[k][j + 1];
                    matrix[k][j + 1] = temp;
                }

                // Troca de contagem
                const tempCount = count[j];
                count[j] = count[j + 1];
                count[j + 1] = tempCount;

                // Troca correspondente no vetor
                const tempVectorValue = vector[j];
                vector[j] = vector[j + 1];
                vector[j + 1] = tempVectorValue;
            }
        }
    }
}

export function sortMatrizByError(matrix, vector, ascending = true) {
    const countZeros = matrix.map(row => row.filter(item => item === 0).length);

    for (let i = 0; i < matrix.length - 1; i++) {
        for (let j = 0; j < matrix.length - i - 1; j++) {
            if (ascending) {
                if (countZeros[j] > countZeros[j + 1]) {
                    const tempRow = matrix[j];
                    const temItem = vector[j];
                    matrix[j] = matrix[j + 1];
                    vector[j] = vector[j + 1];
                    matrix[j + 1] = tempRow;
                    vector[j + 1] = temItem;

                    const tempCount = countZeros[j];
                    countZeros[j] = countZeros[j + 1];
                    countZeros[j + 1] = tempCount;
                }
            } else {
                if (countZeros[j] < countZeros[j + 1]) {
                    const tempRow = matrix[j];
                    const temItem = vector[j];
                    matrix[j] = matrix[j + 1];
                    vector[j] = vector[j + 1];
                    matrix[j + 1] = tempRow;
                    vector[j + 1] = temItem;

                    const tempCount = countZeros[j];
                    countZeros[j] = countZeros[j + 1];
                    countZeros[j + 1] = tempCount;
                }
            }
        }
    }
}

export function sortColumnsByError(matrix, vector, ascending = true) {
    // Transpõe a matriz para facilitar a manipulação das colunas
    const transposedMatrix = matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));

    // Conta a quantidade de zeros em cada coluna
    const countZeros = transposedMatrix.map(col => col.filter(item => item === 0).length);

    // Aplica o algoritmo de ordenação Bubble Sort às colunas transpostas, vetor e countZeros
    for (let i = 0; i < transposedMatrix.length - 1; i++) {
        for (let j = 0; j < transposedMatrix.length - i - 1; j++) {
            if (ascending) {
                if (countZeros[j] > countZeros[j + 1]) {
                    // Troca as colunas
                    const tempCol = transposedMatrix[j];
                    transposedMatrix[j] = transposedMatrix[j + 1];
                    transposedMatrix[j + 1] = tempCol;

                    // Troca os itens do vetor
                    const tempItem = vector[j];
                    vector[j] = vector[j + 1];
                    vector[j + 1] = tempItem;

                    // Troca os contadores de zeros
                    const tempCount = countZeros[j];
                    countZeros[j] = countZeros[j + 1];
                    countZeros[j + 1] = tempCount;
                }
            } else {
                if (countZeros[j] < countZeros[j + 1]) {
                    // Troca as colunas
                    const tempCol = transposedMatrix[j];
                    transposedMatrix[j] = transposedMatrix[j + 1];
                    transposedMatrix[j + 1] = tempCol;

                    // Troca os itens do vetor
                    const tempItem = vector[j];
                    vector[j] = vector[j + 1];
                    vector[j + 1] = tempItem;

                    // Troca os contadores de zeros
                    const tempCount = countZeros[j];
                    countZeros[j] = countZeros[j + 1];
                    countZeros[j + 1] = tempCount;
                }
            }
        }
    }

    // Transpõe a matriz de volta para sua forma original
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            matrix[i][j] = transposedMatrix[j][i];
        }
    }
}


export function sortLinesByPayload(matrix, vector, payload, ascending = true) {
    // Combina matrix, vector e payload em uma estrutura
    const combined = matrix.map((row, index) => ({
        row,
        item: vector[index],
        payload: payload[index]
    }));

    // Ordena a estrutura combinada com base no payload
    combined.sort((a, b) => ascending ? a.payload - b.payload : b.payload - a.payload);

    // Separa os dados ordenados de volta em matrix, vector e payload
    for (let i = 0; i < combined.length; i++) {
        matrix[i] = combined[i].row;
        vector[i] = combined[i].item;
        payload[i] = combined[i].payload;
    }
}



export function sortAndGroupedLines(dataset, vector, ascending, method = "categorico", payload) {
    if (method == "error") {
        if (ascending) {
            sortMatrixLines(dataset, true);
            sortMatrizByError(dataset, vector, true);
        } else {
            sortMatrixLines(dataset, true);
            sortMatrizByError(dataset, vector, false);

        }
    } else if (method == "prof") {
        if (ascending) {
            sortMatrixLines(dataset, true);
            sortLinesByPayload(dataset, vector, payload, true);
        } else {
            sortMatrixLines(dataset, true);
            sortLinesByPayload(dataset, vector, payload, false);

        }
    }
}

export function sortColumnsByPayload(matrix, vector, payload, ascending = true) {
    // Transforma a matrix para facilitar a manipulação das colunas
    const transposedMatrix = matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));

    // Combina transposedMatrix, vector e payload em uma estrutura
    const combined = transposedMatrix.map((col, index) => ({
        col,
        item: vector[index],
        payload: payload[index]
    }));

    // Ordena a estrutura combinada com base no payload
    combined.sort((a, b) => ascending ? a.payload - b.payload : b.payload - a.payload);

    // Separa os dados ordenados de volta em transposedMatrix, vector e payload
    for (let i = 0; i < combined.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            matrix[j][i] = combined[i].col[j];
        }
        vector[i] = combined[i].item;
        payload[i] = combined[i].payload;
    }
}


export function sortAndGroupedColumns(dataset, vector, ascending = true, method, payload) {
    if (method == "error") {
        if (ascending) {
            sortMatrixColumns(dataset, true);
            sortColumnsByError(dataset, vector, true);
        } else {
            sortMatrixColumns(dataset, true);
            sortColumnsByError(dataset, vector, false);
            (dataset, vector, false);
        }
    } else if (method == "dificulty") {
        if (ascending) {
            sortMatrixColumns(dataset, true);
            sortColumnsByPayload(dataset, vector, payload, true);
        } else {
            sortMatrixColumns(dataset, true);
            sortColumnsByPayload(dataset, vector, payload, false);
        }
    }
    // if (best) {
    //     sortMatrixColumns(dataset, false);
    //     if (method == "score") {
    //         sortMatrixByColumnSum(dataset, vector, true);
    //     } else if (method == "categorico") {
    //         sortMatrixHorizontal(dataset, vector, 1);
    //         sortMatrixHorizontal(dataset, vector, 2);
    //         sortMatrixHorizontal(dataset, vector, 3);
    //     }
    // } else {
    //     sortMatrixColumns(dataset, true);
    //     if (method == "score") {
    //         sortMatrixByColumnSum(dataset, vector, false);
    //     } else if (method == "categorico") {
    //         sortMatrixHorizontal(dataset, vector, 3);
    //         sortMatrixHorizontal(dataset, vector, 2);
    //         sortMatrixHorizontal(dataset, vector, 1);
    //     }
    // }
}

export function sumArray(arr) {
    return arr.reduce((acc, curr) => acc + curr, 0);
}

export function sortMatrixByRowSum(matrix, studentsArray, ascending = true) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = i + 1; j < matrix.length; j++) {
            const sumI = sumArray(matrix[i]);
            const sumJ = sumArray(matrix[j]);

            if ((ascending && sumI > sumJ) || (!ascending && sumI < sumJ)) {
                const tempRow = matrix[i];
                matrix[i] = matrix[j];
                matrix[j] = tempRow;

                const tempStudent = studentsArray[i];
                studentsArray[i] = studentsArray[j];
                studentsArray[j] = tempStudent;
            }
        }
    }
}

export function sortMatrixByColumnSum(matrix, columnVector, ascending = true) {
    const numLinhas = matrix.length;
    const numColunas = matrix[0].length;

    const somaColunas = new Array(numColunas).fill(0);

    for (let i = 0; i < numLinhas; i++) {
        for (let j = 0; j < numColunas; j++) {
            somaColunas[j] += matrix[i][j];
        }
    }

    // Criar um array de índices das colunas e ordená-los com base nas somas
    const colunasOrdenadas = Array.from(
        { length: numColunas },
        (_, index) => index
    ).sort((a, b) =>
        ascending
            ? somaColunas[a] - somaColunas[b]
            : somaColunas[b] - somaColunas[a]
    );

    // Reorganizar a matriz e o columnVector com base nas colunas ordenadas
    const matrizOrdenada = [];
    const vetorOrdenado = [];

    for (let i = 0; i < numColunas; i++) {
        const colunaOriginal = colunasOrdenadas[i];

        // Reorganizar a matriz
        const colunaMatriz = [];
        for (let j = 0; j < numLinhas; j++) {
            colunaMatriz.push(matrix[j][colunaOriginal]);
        }
        matrizOrdenada.push(colunaMatriz);

        // Reorganizar o columnVector
        vetorOrdenado.push(columnVector[colunaOriginal]);
    }

    // Atualizar a matriz original com a matriz ordenada
    for (let i = 0; i < numLinhas; i++) {
        for (let j = 0; j < numColunas; j++) {
            matrix[i][j] = matrizOrdenada[j][i];
        }
    }

    // Atualizar o columnVector original com o vetor ordenado
    for (let i = 0; i < numColunas; i++) {
        columnVector[i] = vetorOrdenado[i];
    }
}

export function calculateScores(matrix, orderBy) {
    let scores = [];

    if (orderBy === "rows") {
        // Calcula os scores das linhas
        scores = matrix.map((row) => row.reduce((acc, val) => acc + val, 0));
    } else if (orderBy === "columns") {
        // Calcula os scores das colunas
        const numRows = matrix.length;
        const numCols = matrix[0].length;

        for (let j = 0; j < numCols; j++) {
            let colScore = 0;
            for (let i = 0; i < numRows; i++) {
                colScore += matrix[i][j];
            }
            scores.push(colScore);
        }
    }

    return scores;
}