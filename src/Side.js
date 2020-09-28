import React from "react";
import numeral from "numeral";

function Side({ countries }) {
  return (
    <div className="side">
      {countries.map(({ country, cases }) => (
        <tr>
          <td>{country}</td>
          <td>
            <strong>{numeral(cases).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Side;
