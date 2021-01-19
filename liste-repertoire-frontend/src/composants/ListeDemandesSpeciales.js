import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import {Button} from 'react-bootstrap';


function ListeDemandesSpeciales() {

    const [demandesSpeciales, setDemandesSpeciales] = useState(["", "", ""]);

    useEffect(() => {
        const Accessibilite = async () => {
            const resultat = await fetch(`/api/demandes-speciales`);
            const body = await resultat.json().catch((erreur) => { console.log(erreur) });
            setDemandesSpeciales(body);

        };
        Accessibilite();
    }, [demandesSpeciales]);

    async function HandleClick(valeur)
    {        
            const resultat = await fetch(`/api/demandes-speciales/supprimer/${valeur}`,{
            method: 'DELETE',
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }                    
            });
            const body = await resultat.json();
            setDemandesSpeciales(body);

        console.log(valeur);
    }

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nom Client</th>
                        <th>Titre</th>
                        <th>Artiste</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(demandesSpeciales).map((index) =>
                        <tr>
                            <td>{demandesSpeciales[index].NomClient}</td>
                            <td>{demandesSpeciales[index].Artiste}</td>
                            <td>{demandesSpeciales[index].Titre}</td>
                            <td>{demandesSpeciales[index]._id}</td>
                            <td><Button className="btn btn-danger float-right mr-1" onClick={()=> HandleClick(demandesSpeciales[index]._id)}> Supprimer </Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>
    )
}

export default ListeDemandesSpeciales;