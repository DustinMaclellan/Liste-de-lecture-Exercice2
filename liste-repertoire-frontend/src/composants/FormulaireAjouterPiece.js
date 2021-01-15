import {
    React,
    useState
} from 'react';

import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';

function FormulaireAjouterPiece({ id }) {
    const [titre, setTitre] = useState('');
    const [artiste, setArtiste] = useState('');
    const [categories, setCategorie] = useState(['']);
    const [rediriger, setRediriger] = useState(false);

    const envoyerFormulaire = async () => {
        await fetch(`/api/pieces/ajouter`, {
            method: 'put',
            body: JSON.stringify({ titre, artiste, categories }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setRediriger(true);
    };

    function AfficherRedirection() {
        if (rediriger === true) {
            return <Redirect to="/admin" />
        }
    }

    const handleClickRemove = index =>{
        const list = [...categories];
        list.splice(index,1);
        setCategorie(list);
    }

    const handleClickAdd  = () =>{  

        const list = categories;
        console.log(list)
        setCategorie(list=>[...list,'']);
    }

    const handleInputChange = (e,index) =>{
        const nom = e.target.value;
        const list = categories
        list[index] = nom;
        console.log(list);
        setCategorie(list);
    }
    
    return (
    <>
        {AfficherRedirection()}
        <Form className="mb-1">
            <Form.Group>
                <Form.Label>Titre</Form.Label>
                <Form.Control type="text" value={titre} 
                    onChange={(event) => setTitre(event.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Artiste / Groupe</Form.Label>
                <Form.Control type="text" value={artiste} 
                    onChange={(event) => setArtiste(event.target.value)} />
            </Form.Group>

            {categories.map((index,valeur) =>{
             return(
            <Form.Group>
                <Form.Label>Catégories</Form.Label>
                <Form.Control type="text" value={categories[index]} 
                    onChange={(event) => handleInputChange(event,valeur)} />
                {categories.length != 1 && <Button className="btn btn-danger"  onClick={() => handleClickRemove(index)}>Supprimer</Button>}       
            </Form.Group> 
             )})}
             <Button onClick={handleClickAdd}>Ajouter </Button>

            <Button variant="primary" onClick={envoyerFormulaire} >
                Ajouter
            </Button>
        </Form>
    </>
    );
}

export default FormulaireAjouterPiece;