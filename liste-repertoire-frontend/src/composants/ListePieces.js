import React from "react";
import Alert from "react-bootstrap/Alert";

function CategoriePresente(p_arrayCategories, p_categorie) {
  var estPresent = false;

  p_arrayCategories.forEach((categorie) => {
    if (categorie === p_categorie) {
      estPresent = true;
    }
  });

  return estPresent;
}

function ListerCategories(p_pieces) {
  var dictionnaireCategories = Object();

  p_pieces.forEach((piece) => {
    var categories = piece.categories;
    categories.forEach((categorie) => {
      if (dictionnaireCategories[categorie] === undefined) {
        dictionnaireCategories[categorie] = true;
      }
    });
  });

  return Object.keys(dictionnaireCategories).sort();
}

function ListePieces({ pieces }) {
  if (pieces?.length) {
    var listeCategories = ListerCategories(pieces);

    return (
      <>
        {listeCategories.map((categorie) => {
          var piecesAssociees = pieces.filter((piece) =>
            CategoriePresente(piece.categories, categorie)
          );
          return (
            <div key={categorie}>
              <h4>{categorie}</h4>
              <ul>
                {piecesAssociees.map((piece) => (
                  <li key={piece._id}>
                    {piece.titre} - {piece.artiste}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </>
    );
  } else {
    return (
      <Alert variant={"info"}>Il n'y a pas de pièces dans le répertoire.</Alert>
    );
  }
}

export default ListePieces;
