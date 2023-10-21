import { useEffect, useState } from 'react'
import './App.css'
import BreweryInfo from '../Components/BreweryInfo';

function App() {
  const [list, setList] = useState(null);
  const [texas, setTexas] = useState([]);
  const [cali, setCali] = useState([]);
  const [micro, setMicro] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [filterResults2, setFilteredResults2] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  useEffect(() => {
    const fetchBreweryData = async () => {
      const response = await fetch(
        "https://api.openbrewerydb.org/v1/breweries"
      );
      const json = await response.json();
      setList(json);
      console.log(json);
      if (json) {
        const texasList = Object.keys(json).filter((brewery) => json[brewery].state === "Texas");
        setTexas(texasList);
        const caliList = Object.keys(json).filter((brewery) => json[brewery].state === "California");
        setCali(caliList);
        const microList = Object.keys(json).filter((brewery) => json[brewery].brewery_type === "micro");
        setMicro(microList.length / json.length * 100);
      }
    }
    fetchBreweryData().catch(console.error);
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = Object.keys(list).filter((item) =>
        list[item].name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(Object.keys(list));
    }
  };

  const showList = (array) => {
    return (
      array.map((brewery) =>
        <BreweryInfo
          name={list[brewery].name}
          address={list[brewery].address_1}
          country={list[brewery].country}
          state={list[brewery].state}
          type={list[brewery].brewery_type} />
      )
    )
  }

  const showAll = () => {
    return (
      list && Object.entries(list).map(([brewery]) =>
        <BreweryInfo
          name={list[brewery].name}
          address={list[brewery].address_1}
          country={list[brewery].country}
          state={list[brewery].state}
          type={list[brewery].brewery_type} />
    )
    )
  }

  return (
    <>
      <div className="whole-page">
        <h1>Brewery Data</h1>
        <button onClick={() => setFilteredResults2([])}>Show all breweries</button>
        <br></br>
      <div className='info'>
        <h3>Number of breweries in Texas: {texas.length}</h3>
        <button onClick={() => setFilteredResults2(texas)}>Show Texas breweries</button>
        </div>
        <div className='info'>
        <h3>Number of breweries in California: {cali.length}</h3>
        <button onClick={() => setFilteredResults2(cali)}>Show California breweries</button>
        </div>
        <div className='info'>
        <h3>Percentage of micro breweries: {micro}%</h3>
        </div>
        <br></br>
        <input
          type="text"
          placeholder='Search...'
          onChange={(inputString) => searchItems(inputString.target.value)} />

        {filteredResults.length <= 0 && filterResults2 <= 0
          ? showAll()
          : (filteredResults.length > 0
            ? showList(filteredResults)
            : showList(filterResults2))} 
        
      </div>
    </>
  )
}


export default App
