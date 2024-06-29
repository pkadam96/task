import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import '../css/homepage.css'
const Homepage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [countryDetails, setCountryDetails] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const searchInputRef = useRef(null);
    const debounceTimeout = useRef(null);

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm) {
            setErrorMessage('Please enter a currency code.');
            return;
        }

        try {
            if (debounceTimeout.current) {
                clearTimeout(debounceTimeout.current);
            }

            debounceTimeout.current = setTimeout(async () => {
                const response = await axios.get(`https://restcountries.com/v3.1/currency/${searchTerm}`);
                if (response.data.error) {
                    setErrorMessage(response.data.message);
                    setCountryDetails([]);
                } 
                else if (response.data.length > 0) {
                    setCountryDetails(response.data);
                    setErrorMessage('');
                } 
                else {
                    setErrorMessage('No country details found for this currency code.');
                    setCountryDetails([]);
                }
            }, 500);
        } 
        catch (error) {
            console.error('Error fetching country details:', error);
            setErrorMessage('Failed to fetch country details. Please try again later.');
            setCountryDetails([]);
        }
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div>
            <h2>Countries of the World App</h2>
            <form onSubmit={handleSearch} className='searchbar'>
                <input type="text" placeholder="Enter currency code (e.g., USD)" 
                value={searchTerm} onChange={handleChange} ref={searchInputRef} />
                <button type="submit">Search</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
            {!countryDetails.length && !errorMessage && (
               <div className='welcome-message'>
                 <h1>Welcome Back !!!</h1>
                 <p>Enter a currency code above to search for country details.</p>
               </div>
            )}
            {countryDetails.length > 0 && (
                <div className='countries'>
                    {/* <h3>Countries</h3> */}
                    {countryDetails.map((country, index) => (
                        <div key={index} className='card'>
                            <p>Name: {country.name.common}</p>
                            <p>Capital: {country.capital}</p>
                            <p>Currency: {country.currency}</p>
                            <p>Languages: {Object.values(country.languages).join(', ')}</p>
                            <img
                                src={`https://flagsapi.com/${country.cca2}/shiny/64.png`}
                                alt={`${country.name.common} flag`}
                            />
                            <hr />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export { Homepage };
