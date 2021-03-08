class Matrix {
  constructor(matrix = [[]]) {
    this.matrix = matrix;
  }

  getSubmatrix(rowIndex, colIndex) {
    const i = rowIndex;
    const j = colIndex;

    const submatrix = this.matrix
      .filter((_, rowIndex) => rowIndex !== i)
      .map(row => row.filter((_, colIndex) => colIndex !== j));

    return new Matrix(submatrix);
  }

  get size() {
    const size = {
      rows: this.matrix.length,
      cols: this.matrix[0].length,
    }

    return size;
  }

  get determinant() {
    if (this.size.rows !== this.size.cols) {
      console.warn(`Can't find the determinant of a non-square matrix`);

      return;
    }

    if (this.size.rows === 1) return this.matrix[0][0];

    const rowIndex = 0;

    const determinant = this.matrix[rowIndex].reduce((acc, el, colIndex) => {
      const submatrix = this.getSubmatrix(rowIndex, colIndex);

      return acc += (-1) ** colIndex * el * submatrix.determinant;
    }, 0);

    return determinant; 
  }
}

const matrix = new Matrix([
  [1, 2, 3, 4],
  [24, 3, 2 , 1],
  [3, 2, 3, 2],
  [5, 4, 5, 4],
]);

console.log(matrix.determinant); //80