import React from 'react';
import { connect } from 'react-redux';

function Homepage(props) {
    return (
        <div>
            <h1>Homepage Component</h1>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        setlists: state.setlists
    }
}

export default connect(mapStateToProps)(Homepage);