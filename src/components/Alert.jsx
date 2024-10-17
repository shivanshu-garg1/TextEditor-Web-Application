import React from "react";
export default function Alert(props) {
  return (
    props.alert && (
      <div
        className={`alert alert-${props.alert.type} alert-dismissible fade show`}
        role="alert"
      >
        <string>{props.alert.type}</string> : {props.alert.msg}
      </div>
    )
  );
}
