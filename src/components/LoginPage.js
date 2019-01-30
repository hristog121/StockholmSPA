import React from 'react';
import {connect} from 'react-redux';
import {startLogin} from '../actions/auth';

export const LoginPage = ({startLogin}) => (
    <div className="box-layout">
        <div className="box-layout__box">
            <h1 className="box-layout__title">Visit tomorrow</h1>
            <p>Can't visit all the places for one day?</p>
            <p>Drop a marker and add them to your list for tomorrow!</p>
            <button className="button" onClick={startLogin}>Login with Google</button>
        </div>
    </div>
);

//Dispatch an action for login
const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
