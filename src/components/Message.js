import React from 'react';

const Message = ({ msg }) => {
  let styles = {
    color: 'crimson',
    border: '1px solid lightcoral',
    backgroundColor: 'mistyrose',
    boxShadow: '0 0 3px 1px #dc143c35',
    margin: '0 auto',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    width: '15vw',
    minWidth: 'fit-content',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div>
      <div style={styles}>
        <p>{msg}</p>
      </div>
    </div>
  );
};

export default Message;