import { React } from 'react';
import ListeDemandesSpeciales from '../composants/ListeDemandesSpeciales';
import {Button} from 'react-bootstrap';
import  { Link } from 'react-router-dom';


function PageAccessibilite() {

    return (
        <>
            <h1>Liste demandes spéciales</h1>
            <ListeDemandesSpeciales />
            <Link to="/admin">
                <Button variant={'Primary'} >Retour</Button>
            </Link>

        </>
    )
}

export default PageAccessibilite;