import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Select from 'react-select';
import { useState, useEffect } from 'react';

function getDepartementList(data) {
    const list = [...new Set(data.map((station) => station.libelle_departement))];
    return formatedOptions(list);
}

function formatedOptions(options) {
    const list = options.map(option => ({
        value: option,
        label: option
    }));
    return list;
}

const Body = () => {
    const [selectedDepartementValue, setSelectedDepartementValue] = useState('');
    // const [selectedStationValue, setSelectedStationValue] = useState('');

    useEffect(() => {
        console.log('selectedDepartementValue :', selectedDepartementValue);
        //todo
        //utiliser selectedDepartementValue pour faire une liste de station du département selectionnable dans form
        //ajouter un champ de selection date au form
        //call api (sous cette forme : https://hubeau.eaufrance.fr/api/v1/temperature/chronique?code_station=01001336&date_debut_mesure=2015-01-01&date_fin_mesure=2015-01-02&fields=code_station,libelle_station,libelle_commune,nom_cours_eau,date_mesure_temp,resultat,symbole_unite&size=100 )
        // pour recup les chroniques et faire un <table> pour les afficher
      }, [selectedDepartementValue])

    const  { data: stations, isLoading, isError, error } = useQuery({
        queryFn: () => {
            return axios.get("https://hubeau.eaufrance.fr/api/v1/temperature/station").then((res) => res.data);
        },
        queryKey: ["stations"]
    })

    if (isLoading) {
        return <h2>Loading ...</h2>
    }
    if (isError) {
        return <span>Error: {error.message}</span>
    }
    console.log("data :", stations.data);

    const departements = getDepartementList(stations?.data);

    function handleDepartementChange(event) {
        // console.log("event.value :", event.value);
        setSelectedDepartementValue(event);
    }

    function handleSubmit() {
        console.log("submit:");
    }
    
    return(
        <div className="">
            <form onSubmit={handleSubmit}>
                <label>
                    departement:
                    <Select options={departements} value={selectedDepartementValue} onChange={handleDepartementChange} placeholder="Departements..."/>
                </label>
                <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Submit</button>
            </form>
        </div>
    );
}
export default Body;