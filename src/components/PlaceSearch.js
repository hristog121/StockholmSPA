import React from "react";
import { connect } from "react-redux";
import { setTextFilter } from "../actions/filters";

class PlaceSearch extends React.Component {
  onTextChange = e => {
    this.props.setTextFilter(e.target.value);
  };

  render() {
    return (
      <div>
        <input
          className="text-input"
          placeholder="Find a place from the list"
          type="text"
          defaultValue={this.props.filters.text}
          onChange={this.onTextChange}
          style={{ width: "95%" }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filters: state.filters
});

const mapDispatchToProps = dispatch => ({
  setTextFilter: text => dispatch(setTextFilter(text))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceSearch);
