import React from "react";
import { Card, Typography, CardContent } from "@material-ui/core";
import "./Card.css";
function Cardbox({
  title,
  active,
  cases,
  red,
  yellow,
  purple,
  total,
  ...props
}) {
  return (
    <Card
      className={`cards ${active && "select"} ${red && "red"} ${
        yellow && "yellow"
      } ${purple && "purple"}`}
      onClick={props.onClick}
    >
      <CardContent>
        <Typography>{title}</Typography>
        <h2 className="card_cases">{cases} --Today</h2>

        <Typography className="card_total" color="textSecondary">
          <h5>{total} Total</h5>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Cardbox;
