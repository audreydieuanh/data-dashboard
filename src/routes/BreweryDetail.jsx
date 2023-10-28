import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailView = () => {
    let params = useParams();
    const [fullDetails, setFullDetails] = useState(null);
    useEffect(() => {
        const getBreweryDetail = async () => {
            const response = await fetch(
                `https://api.openbrewerydb.org/v1/breweries/${params.id}`
            );
            const json = await response.json();
            console.log(json);

            const { name, brewery_type, address_1, city, 
                state_province, postal_code, country, website_url, phone } = json;
            setFullDetails({
                name, brewery_type, address_1, city,
                state_province, postal_code, country, website_url, phone });
        }
        getBreweryDetail().catch(console.error);
    }, [params.id]);

    return (
        <div>
            <h1>{fullDetails && fullDetails.name}</h1>
            <h2>Brewery Type: {fullDetails && fullDetails.brewery_type}</h2>
            <h2>{fullDetails && fullDetails.address_1}</h2>
            <h2>{fullDetails && fullDetails.city}, {fullDetails && fullDetails.state_province}, {fullDetails && fullDetails.country} {fullDetails && fullDetails.postal_code}</h2>
            <h2>Website: <a href={fullDetails && fullDetails.website_url}>{fullDetails && fullDetails.website_url}</a></h2>
            <h2>Contact: {fullDetails && fullDetails.phone}</h2>
        </div>
    )
}

export default DetailView;