import React from "react";
import { connect } from "react-redux";
import PlaceListItem from "./PlaceListItem";
import { startRemovePlace } from "../actions/places";
import { setActivePlace } from "../actions/activePlaces";
import selectPlaces from "../selectors/places";
import PlacesListFilters from "./PlaceSearch";

/* A component for the left-side list(when the user add places) */
class PlacesList extends React.Component {
  render() {
    return (
      <div className="list-group">
        {/*The filter input field*/}
        <PlacesListFilters />
        {this.props.places.length === 0 ? (
          <div className="list-item--message">
            <span>No Results / No places added</span>
          </div>
        ) : (
          this.props.places.map(place => (
            //  A component to hold the added places as a list
            <PlaceListItem
              key={place.id}
              place={place}
              setActivePlace={this.setActivePlace}
              removePlace={this.removePlace}
            />
          ))
        )}
      </div>
    );
  }

  // function to handle the removing of a place from the list
  removePlace = id => {
    this.props.removePlace({ id });
  };


  setActivePlace = place => {
    this.props.setActivePlace(place);
  };
}

const mapStateToProps = state => {
  return {
    places: selectPlaces(state.places, state.filters),
    activePlace: state.activePlace
  };
};

const mapDispatchToProps = dispatch => ({
  removePlace: ({ id }) => dispatch(startRemovePlace({ id })),
  setActivePlace: place => dispatch(setActivePlace(place))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlacesList);
