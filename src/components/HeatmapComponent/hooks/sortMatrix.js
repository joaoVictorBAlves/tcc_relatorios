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

    const m = JSON.parse(JSON.stringify(matrix));
    const v = JSON.parse(JSON.stringify(vector));
    
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

export function sortAndGroupedLines(dataset, vector, best, method = "categorico") {
    if (best) {
        sortMatrixLines(dataset, false);
        if (method == "score") {
            sortMatrixByRowSum(dataset, vector, true);
        } else if (method == "categorico") {
            sortMatrixVertical(dataset, vector, 1);
            sortMatrixVertical(dataset, vector, 2);
            sortMatrixVertical(dataset, vector, 3);
        }
    } else {
        sortMatrixLines(dataset, true);
        if (method == "score") {
            sortMatrixByRowSum(dataset, vector, false);
        } else if (method == "categorico") {
            sortMatrixVertical(dataset, vector, 3);
            sortMatrixVertical(dataset, vector, 2);
            sortMatrixVertical(dataset, vector, 1);
        }
    }
}

export function sortAndGroupedColumns(dataset, vector, best, method) {
    if (best) {
        sortMatrixColumns(dataset, false);
        if (method == "score") {
            sortMatrixByColumnSum(dataset, vector, true);
        } else if (method == "categorico") {
            sortMatrixHorizontal(dataset, vector, 1);
            sortMatrixHorizontal(dataset, vector, 2);
            sortMatrixHorizontal(dataset, vector, 3);
        }
    } else {
        sortMatrixColumns(dataset, false);
        if (method == "score") {
            sortMatrixByColumnSum(dataset, vector, false);
        } else if (method == "categorico") {
            sortMatrixHorizontal(dataset, vector, 3);
            sortMatrixHorizontal(dataset, vector, 2);
            sortMatrixHorizontal(dataset, vector, 1);
        }
    }
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