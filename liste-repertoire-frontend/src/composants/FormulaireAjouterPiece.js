import { React, useState } from "react";

import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";

function FormulaireAjouterPiece({ id }) {
  const [titre, setTitre] = useState("");
  const [artiste, setArtiste] = useState("");
  const [categories, setCategories] = useState([""]);
  const [rediriger, setRediriger] = useState(false);

  const envoyerFormulaire = async () => {
    await fetch(`/api/pieces/ajouter`, {
      method: "put",
      body: JSON.stringify({ titre, artiste, categories }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setRediriger(true);
  };

  function AfficherRedirection() {
    if (rediriger === true) {
      return <Redirect to="/admin" />;
    }
  }

  const handleClickRemove = (index) => {
    const list = [...categories];
    list.splice(index, 1);
    setCategories(list);
  };

  const handleClickAdd = () => {
    setCategories((categories) => [...categories, ""]);
  };

  const handleInputChange = (e, index) => {
    const valeur = e.target.value;
    const list = [...categories];
    list[index] = valeur;
    setCategories(list);
  };

  return (
    <>
      {AfficherRedirection()}
      <Form className="mb-1">
        <Form.Group>
          <Form.Label>Titre</Form.Label>
          <Form.Control
            type="text"
            value={titre}
            onChange={(event) => setTitre(event.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Artiste / Groupe</Form.Label>
          <Form.Control
            type="text"
            value={artiste}
            onChange={(event) => setArtiste(event.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Catégories</Form.Label>

          {categories.map((valeur, index) => {
            return (
              <>
                <Form.Control
                  type="text"
                  value={valeur}
                  onChange={(event) => handleInputChange(event, index)}
                />

                {categories.length !== 1 && (
                  <Button
                    variant="danger"
                    className="btn-sm m-1"
                    onClick={() => handleClickRemove(index)}
                  >
                    Supprimer
                  </Button>
                )}
              </>
            );
          })}
        </Form.Group>
        <Button onClick={handleClickAdd}>Ajouter une catégorie</Button>
        <br />
        <br />
        <Button variant="success" onClick={envoyerFormulaire}>
          Ajouter
        </Button>
      </Form>
    </>
  );
}

export default FormulaireAjouterPiece;
