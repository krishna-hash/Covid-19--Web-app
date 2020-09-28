import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";
import "./Map.css";

export const Sorting = (data) => {
  const sortingdata = [...data];
  sortingdata.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortingdata;
};

export const mass = (value) => {
  return value ? `+${numeral(value).format("0,0a")}` : "+0";
};

const colorman = {
  cases: {
    hex: "#CC1034",
    square: 750,
  },
  recovered: {
    hex: "yellow",
    square: 1200,
  },
  deaths: {
    hex: "purple",
    square: 2000,
  },
};
export const pops = (data, casetype = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={colorman[casetype].hex}
      fillColor={colorman[casetype].hex}
      radius={Math.sqrt(country[casetype]) * colorman[casetype].square}
    >
      <Popup>
        <div className="popup">
          <div
            className="pop_style"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          />
          <div className="pop_name">{country.country}</div>
          <div className="pop_case">
            Cases:{numeral(country.cases).format("0,0")}
          </div>
          <div className="pop_rec">
            Recovered:{numeral(country.recovered).format("0,0")}
          </div>
          <div className="pop_death">
            Death:{numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
