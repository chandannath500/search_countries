import axios from "axios";
import { useEffect, useState } from "react";
import Cards from "./Cards";

const Fetch = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching countries:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  // Filter countries based on the search term
  const filteredCountries = countries.filter((country) =>
    country.name?.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex">
      <input
        type="text"
        placeholder="Search for countries"
        value={searchTerm}
        onChange={handleSearch}
      />
      {loading ? (
        "Loading..."
      ) : (
        <Cards countries={filteredCountries} /> // Pass filtered countries to Cards component
      )}
    </div>
  );
};

export default Fetch;
