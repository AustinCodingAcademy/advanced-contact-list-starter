import React from 'react';

const Log = props => {
  return (
    <li className="contact row">
      <div className="my-btn">
        <button
          onClick={() => props.clickHandle(props.log)}
          className="fa fa-times-circle"
          aria-hidden="false"
        />
      </div>
      <div className="log">
        {props.log}
      </div>
    </li>
  );
};

export default Log;
