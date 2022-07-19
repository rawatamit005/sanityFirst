import React from "react";
import { Link, navigate } from "gatsby";

const doNavigate = target => {
  if (!target || !target.length) {
    return;
  }
  const internal = /^\/(?!\/)/.test(target);
  if (internal) {
    navigate(target);
  } else {
    window.location = target;
  }
};

const CTALink = props => {
  let link =  props.ctalink || "#";
 
  let ctatype= props.ctatype || "button";

  if (ctatype === "button") {
    return (
      <button
        id="navAction"
        onClick={() => window.open(link)}
        title={props.ctalabel}
        data-href={link}
        target="_blank" 
        className={props.buttonActionClass || ""}
      >
        {props.ctalabel}
      </button>
    );
  }

  

  if (ctatype === "link") {
  return (
    <Link className={props.buttonActionClass || ""} to={link}  target="_blank"   title={props.ctalabel}
    data-href={link}>
      {props.ctalabel}
    </Link>
  );
  }
};

export default CTALink;
