let result = document.getElementById("result");
const grid = document.getElementById("grid");
let rows = 3;
let columns = 3;
let grille = createGrid(rows, columns); 
let joueur = 1;
let pion = "";
let gameOver = false;
let JvsJ = true;
let placed = false;
let tourJouer = 0;
let puissanceQuatreVrai = false





function createGrid(rows, columns) {
  const gridArray = [];
  for (let i = 0; i < rows; i++) {
    const row = new Array(columns).fill("");
    gridArray.push(row);
  }
  return gridArray;
}

function updateGrid() {
  grid.innerHTML = "";

  for (let i = 0; i < rows; i++) {
    let divRow = document.createElement("div");
    divRow.classList.add("row");

    for (let j = 0; j < columns; j++) {
      let divCol = document.createElement("div");
      divCol.classList.add("col");
      divCol.textContent = grille[i][j];
      divCol.addEventListener("click", () => {
        if (!gameOver && grille[i][j] === "") {
          if (JvsJ) {
            grille[i][j] = jouer();
            updateGrid();
          }
          if (!JvsJ) {
            grille[i][j] = jouer();
            ordinateur();
            updateGrid();
          }
          if(puissanceQuatreVrai){   resultat = checkVictoryPuissanceQuatre(grille)}
          else {
            resultat = checkVictory(grille);}
          if (resultat) {
            result.classList.remove("hidden");
            result.textContent =
              resultat === "Match nul" ? resultat : `${resultat} a gagné !`;
          }
        }
      });
      divRow.appendChild(divCol);
    }
    grid.appendChild(divRow);
  }
}

function jouer() {
  if (JvsJ) {
    if (joueur === 1) {
      joueur = 2;
      pion = "O";
      tourJouer++;
    } else if (joueur === 2) {
      joueur = 1;
      pion = "X";
      tourJouer++;
    }
    return pion;
  }
  if (JvsJ === false) {
    pion = "X";
    tourJouer++;
    return pion;
  }
}

function ordinateur() {
  placed = false;
  while (!placed && tourJouer < rows * columns) {
    let row = Math.floor(Math.random() * rows);
    let column = Math.floor(Math.random() * columns);
    if (grille[row][column] === "") {
      grille[row][column] = "O";
      tourJouer++;
      placed = true;
    }
  }
}

function checkVictory(grille) {
  const taille = grille.length;


  for (let i = 0; i < taille; i++) {
    if (
      grille[i][0] &&
      grille[i][0] === grille[i][1] &&
      grille[i][1] === grille[i][2]
    ) {
      gameOver = true;
      return grille[i][0];
    }
  }


  for (let j = 0; j < taille; j++) {
    if (
      grille[0][j] &&
      grille[0][j] === grille[1][j] &&
      grille[1][j] === grille[2][j]
    ) {
      gameOver = true;
      return grille[0][j];
    }
  }


  if (
    grille[0][0] &&
    grille[0][0] === grille[1][1] &&
    grille[1][1] === grille[2][2]
  ) {
    gameOver = true;
    return grille[0][0];
  }


  if (
    grille[0][2] &&
    grille[0][2] === grille[1][1] &&
    grille[1][1] === grille[2][0]
  ) {
    gameOver = true;
    return grille[0][2];
  }


  if (tourJouer === 9) {
    gameOver = true;
    return "Match nul";
  }


  return null;
}

function JvsJFalse() {
  JvsJ = false;
}


function JvsJTrue() {
  JvsJ = true;
}


function puissanceQuatre() {
  puissanceQuatreVrai = true
  rows = 6;
  columns = 7;
  grille = createGrid(rows, columns);
  updateGrid(); 
}

function checkVictoryPuissanceQuatre(grille) {
  const rows = grille.length;
  const columns = grille[0].length;

  function checkDirection(startRow, startCol, rowStep, colStep) {
    const pion = grille[startRow][startCol];
    let count = 0;

    for (let i = 0; i < 4; i++) {
      const row = startRow + i * rowStep;
      const col = startCol + i * colStep;

      if (row >= 0 && row < rows && col >= 0 && col < columns && grille[row][col] === pion) {
        count++;
      } else {
        break;
      }
    }

    return count === 4 ? pion : null;
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      if (grille[row][col] !== "") {
        if (
          checkDirection(row, col, 1, 0) || // Verticale
          checkDirection(row, col, 0, 1) || // Horizontale
          checkDirection(row, col, 1, 1) || // Diagonale descendante
          checkDirection(row, col, 1, -1)   // Diagonale montante
        ) {
          gameOver = true;
          return grille[row][col];
        }
      }
    }
  }

  return tourJouer === rows * columns ? "Match nul" : null;
}



updateGrid();
