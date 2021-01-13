import {
    React,
    useState,
    useEffect
} from 'react';

import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';





function FormulaireDemandeSpeciales()
{

    const [nomUtilisateur, setUtilisateur] = useState('');
    const [Artiste, setArtiste] = useState('');
    const [Titre, setTitre] = useState('');
    const [redirection, setRedirection] = useState(false);



    const envoyerFormulaire = async () => {
        await fetch(`/api/demandes-speciales/ajouter`, {
            method: 'put',
            body: JSON.stringify({ nomUtilisateur, Artiste, Titre }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setRedirection(true);
    };

    function Redirection()
    {
        if(redirection == true)
        {
        return( <Redirect to="/Repertoire" />)
        }
    }
    

    return (
        <>
        {Redirection()}
        <Form className="mb-1">
            <Form.Group>
                <Form.Label>Nom utilisateur</Form.Label>
                <Form.Control type="text" value={nomUtilisateur} 
                    onChange={(event) => setUtilisateur(event.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Artiste / Groupe</Form.Label>
                <Form.Control type="text" value={Artiste} 
                    onChange={(event) => setArtiste(event.target.value)} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Titre de chanson</Form.Label>
                <Form.Control type="text" value={Titre} 
                    onChange={(event) => setTitre(event.target.value)} />
            </Form.Group>

            <Button variant="primary" onClick={envoyerFormulaire} >
                Ajouter
            </Button>
        </Form>
        </>
    )


}

export default FormulaireDemandeSpeciales;
