import React, { useState, useEffect } from "react";
import "./App.css";
import {
  FormControl,
  Select,
  MenuItem,
  CardContent,
  Card,
} from "@material-ui/core";
import Cardbox from "./Cardbox";
import Map from "./Map";
import "./Side.css";
import Graph from "./Graph";
import Side from "./Side";
import { Sorting, mass } from "./Sorting";

function App() {
  const [state, setState] = useState([]);
  const [value, setValue] = useState("worldwide");
  const [info, setinfo] = useState({});
  const [side, setside] = useState([]);
  const [mcenter, setcenter] = useState({
    lat: 34.80746,
    lng: -40.4796,
  });
  const [mzoom, setzoom] = useState(3);
  const [alldata, setdata] = useState([]);
  const [click, setclick] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((res) => res.json())
      .then((data) => {
        setinfo(data);
      });
  }, []);
  useEffect(() => {
    const request = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const values = data.map((dataa) => ({
            name: dataa.country,
            id: dataa.countryInfo.iso2,
          }));
          setdata(data);
          const sorted = Sorting(data);
          setside(sorted);
          setState(values);
        });
    };

    request();
  }, []);
  console.log("mapppping", mcenter, mzoom);

  const change = async (e) => {
    const currentvalue = e.target.value;
    const url =
      currentvalue === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${currentvalue}`;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("changerrrr", data);
        setValue(currentvalue);
        setinfo(data);
        setcenter(
          currentvalue === "worldwide"
            ? ""
            : [data.countryInfo.lat, data.countryInfo.long]
        );
        setzoom(4);
      });
  };
  console.log(info);
  return (
    <div className="App">
      <div className="app_left">
        <div className="app_header">
          <h1>COVID-19 WEB APP</h1>
          <FormControl className="app_dropdown">
            <Select
              style={{ backgroundColor: "grey", fontWeight: "revert" }}
              variant="outlined"
              value={value}
              onChange={change}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {state.map((state) => (
                <MenuItem value={state.id}>{state.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app_cards">
          <Cardbox
            active={click === "cases"}
            red
            onClick={(e) => setclick("cases")}
            title="Covid Positive Cases"
            cases={mass(info.todayCases)}
            total={mass(info.cases)}
          ></Cardbox>
          <Cardbox
            yellow
            active={click === "recovered"}
            onClick={(e) => setclick("recovered")}
            title="Recovery"
            cases={mass(info.todayRecovered)}
            total={mass(info.recovered)}
          ></Cardbox>
          <Cardbox
            purple
            active={click === "deaths"}
            onClick={(e) => setclick("deaths")}
            title="Death"
            cases={mass(info.todayDeaths)}
            total={mass(info.deaths)}
          ></Cardbox>
        </div>

        <Map
          casetype={click}
          data={alldata}
          center={mcenter}
          zoom={mzoom}
        ></Map>
      </div>
      <Card className="app_right" style={{ borderRadius: "20px" }}>
        <CardContent>
          <h2 style={{ textAlign: "center" }}>Total cases Country wise</h2>
          <Side countries={side}></Side>
        </CardContent>
      </Card>
      <div className="app_bottom">
        <Card>
          <CardContent>
            <h2 style={{ textAlign: "center" }}> World Current {click}</h2>
            <Graph casetype={click}></Graph>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
