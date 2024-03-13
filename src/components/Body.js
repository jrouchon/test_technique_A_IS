import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function getRegionList(data) {
    const list = [...new Set(data.map((station) => station.libelle_region))];
    return list;
}

function getDepartementList(data) {
    const list = [...new Set(data.map((station) => station.libelle_departement))];
    return list;
}

const Body = () => {
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
    console.log("isLoading :", isLoading);
    console.log("isError :", isError);
    console.log("data :", stations.data);

    const regions = getRegionList(stations?.data);
    const departements = getDepartementList(stations?.data);

    return(
        <div className="">
           
        </div>
    );
}
export default Body;