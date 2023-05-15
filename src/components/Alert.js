import React from 'react'

const Alert = (props) => {
    const capitalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

  return (
    props.alert && <div>
        <div className={`alert alert-primary alert-dismissible fade show`} role="alert">
            <strong>{capitalize(props.alert)}</strong>: {props.alert}
        </div>
    </div>
  )
}

export default Alert