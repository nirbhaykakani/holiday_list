
import { useState,useEffect } from "react";
import axios from 'axios';

function Home(){
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [holidays, setHolidays] = useState([]);

    useEffect(() => {
      if (!selectedCountry) return;

      async function fetchHolidays() {

        try{
          const response = await axios.get(`https://openholidaysapi.org/PublicHolidays?countryIsoCode=${selectedCountry}&validFrom=2026-01-01&validTo=2026-12-31&languageIsoCode=EN`);
          setHolidays(response.data);
        }
        catch (error) {
          console.error(error);
        }
      }
      

      fetchHolidays();
    }, [selectedCountry]);

    useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await axios.get(
          "https://openholidaysapi.org/Countries?languageIsoCode=EN"
        );

        setCountries(response.data);
      } catch (error) {
        console.error(error);
      }
      finally{
        setLoading(false); 
      }
    }

    fetchCountries();
  }, []);
    return(
        <div>
          <h1>Public Holidays</h1>
           {loading ? (
                <p>Loading countries...</p>
            ) : (
                <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                    <option >Select a country</option>
                    {countries.map((country) => (
                        <option key={country.isoCode} value={country.isoCode}>
                            {country.name?.[0]?.text}
                        </option>
                    ))}
                </select>
            )}
            <ul>
                {holidays.map((holiday) => (
                  <li key={holiday.startDate}>
                    {holiday.startDate} : {holiday.name?.[0]?.text}
                  </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;