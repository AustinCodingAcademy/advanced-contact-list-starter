import React, {PropTypes} from 'react';

const DefaultLayout = (props) => {
  return (
    <div className="DefaultLayout">
      Header
      <main>
        <div>
          {props.children}
        </div>
      </main>
      <div>
        Footer
      </div>
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node
};

export default DefaultLayout;
