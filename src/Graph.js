import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import "./Graph.css";

function Graph({ casetype = "cases" }) {
  const [line, setLine] = useState({});

  const Chartdata = (data, casetype = "cases") => {
    let chart = [];
    let lastData;
    for (let date in data.cases) {
      if (lastData) {
        let newdate = {
          x: date,
          y: data[casetype][date] - lastData,
        };
        chart.push(newdate);
      }
      lastData = data[casetype][date];
    }
    return chart;
  };
  useEffect(() => {
    const request = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=130")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const chartdata = Chartdata(data, casetype);
          setLine(chartdata);
        });
    };
    request();
  }, [casetype]);
  const option = {
    legend: {
      display: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };

  return (
    <div className="graph">
      {line?.length > 0 && (
        <Line
          className="line"
          options={option}
          data={{
            datasets: [
              {
                data: line,
                backgroundColor: "rgba(195,16,17,0.5)",
                borderColor: "#CC1034",
              },
            ],
          }}
        />
      )}
    </div>
  );
}

export default Graph;
