import react, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

function ListeDemandesSpeciales() {

    const [demandesSpeciales, setDemandesSpeciales] = useState(["", "", ""]);

    useEffect(() => {
        const Accessibilite = async () => {
            const resultat = await fetch(`/api/demandes-speciales`);
            const body = await resultat.json().catch((erreur) => { console.log(erreur) });
            setDemandesSpeciales(body);

        };
        Accessibilite();
    }, []);


    const handleClickSupprimer = async (index) =>
            {
                const resultat = await fetch(`/api/demandes-speciales/supprimer/:${index}`,{
                method: 'DELETE',                    
                });
                const body = await resultat.json();
                setDemandesSpeciales(body);
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
                    {demandesSpeciales.map((demande) =>
                        <tr>
                            <td>{demande.nomClient}</td>
                            <td>{demande.titre}</td>
                            <td>{demande.artiste}</td>
                            <td><Button className="btn btn-danger float-right mr-1" onClick={handleClickSupprimer}> Supprimer </Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>
    )
}

export default ListeDemandesSpeciales;