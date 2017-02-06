import React from 'react';

const ResetButton = props =>  {
  return (
    <section className="reset-button">
      <button onClick={ () => props.onClickReset()}>
        Reset Contacts
      </button>
    </section>
  )
}

export default ResetButton;
