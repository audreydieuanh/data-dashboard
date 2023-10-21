import React, { useEffect, useState } from "react";

const BreweryInfo = ({ name, address, state, country, type }) => {
    const [brewery, setBrewery] = useState(null);
    useEffect(() => {
        const getBrewery = async () => {
            const response = await fetch(
                "https://api.openbrewerydb.org/v1/breweries"
            );
            const json = await response.json();
            setBrewery(json);
            console.log(json);
        }
        getBrewery().catch(console.error);
    }, []);

    return (
        <>
                {brewery ? (
                    <div className="main-list">
                        <h2>{name}</h2>
                        <h3>Address: {address}, {state}, {country}</h3>
                        <h3>Brewery Type: {type}</h3>
                    </div>
                ) : null
                }
        
        </>
    )
};

export default BreweryInfo;