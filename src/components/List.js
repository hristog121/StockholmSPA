import React from "react";
import PlacesList from "./PlaceListLeftSide";
import PlacesListFilters from "./PlaceSearch";

const List = () => {
  return (
    /*eslint null:0*/
    <div className="main">
      <PlacesListFilters />
      <PlacesList />
    </div>
  );
};

export default List;
