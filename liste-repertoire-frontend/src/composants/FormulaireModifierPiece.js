import { React, useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";

function FormulaireModifierPiece({ id }) {
  const [titre, setTitre] = useState("");
  const [artiste, setArtiste] = useState("");
  const [categories, setCategories] = useState([""]);
  const [rediriger, setRediriger] = useState(false);

  useEffect(() => {
    const chercherDonnees = async () => {
      const resultat = await fetch(`/api/pieces/${id}`);
      const body = await resultat.json().catch((error) => {
        console.log(error);
      });
      setTitre(body.titre);
      setArtiste(body.artiste);
      setCategories(body.categories);
    };
    chercherDonnees();
  }, [id]);

  const envoyerFormulaire = async () => {
    await fetch(`/api/pieces/modifier/${id}`, {
      method: "post",
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
    setCategories([...categories, ""]);
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

        <Form.Label>Catégories</Form.Label>
        {categories.map((valeur, index) => {
          return (
            <Form.Group>
              <Form.Control
                type="text"
                value={valeur}
                onChange={(event) => handleInputChange(event, index)}
              />

              {categories.length != 1 && (
                <Button
                  variant="danger"
                  onClick={() => handleClickRemove(index)}
                >
                  Supprimer
                </Button>
              )}
            </Form.Group>
          );
        })}
        <Button onClick={handleClickAdd}>Ajouter Une Catégorie</Button>
        <br />
        <br />
        <Button variant="success" onClick={envoyerFormulaire}>
          Modifier
        </Button>
      </Form>
    </>
  );
}

export default FormulaireModifierPiece;
