import React from 'react';

export default function Alertd(props) {
  const capitalize = (word) => {
    if (word === 'danger') {
      word = "error"
    }
    else if (word === 'warning') {
      word = "alert"
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }

  return (
      props.alert && <div>
        <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
          <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
        </div>
      </div>

  )
}

