import { useEffect, useState } from 'react'
import './App.css'
import BreweryInfo from '../Components/BreweryInfo';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label
} from "recharts";

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
      setList(showTwoDecimal(json));
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
          type={list[brewery].brewery_type}
          id={list[brewery].id} />
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
          type={list[brewery].brewery_type}
          id={list[brewery].id} />
      )
    )
  }

  const showTwoDecimal = (data) => {
    return data.map((item) => {
      return {
        ...item,
        longitude: Math.round(item.longitude * 100) / 100
      };
    });
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
        <div className='chart'>
          <h2>Longtitude Data for Breweries in United States</h2>
          <LineChart
            width={800}
            height={400}
            data={list}
            margin={{
              top: 10,
              right: 30,
              left: 20,
              bottom: 30,
            }}>
            <Line type="monotone" dataKey="longitude" stroke="#8884d8" />
            <YAxis dataKey="longitude" >
              <Label value="Longitude" offset={-50} position="insideLeft" />
            </YAxis>
            <XAxis tick={false}/>
          </LineChart>
        </div>
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


export default App;
