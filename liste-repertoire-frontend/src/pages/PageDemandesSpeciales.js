import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormulaireDemandeSpeciales from '../composants/FormulaireDemandeSpeciale';

function PageDemandesSpeciales()
{
    return(
    <>
        <h1>Ajouter une demandes speciales </h1>
        <FormulaireDemandeSpeciales/>
        <Link to="/">
            <Button variant={'danger'} >Annuler</Button>    
        </Link>
    </>
    )
}

export default PageDemandesSpeciales;