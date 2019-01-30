import React from "react";
import { Button, Glyphicon } from "react-bootstrap";

class PlaceListItem extends React.Component {
  clickEventHandler = () => {
    this.props.setActivePlace(this.props.place);
  };

  removePlace = () => {
    this.props.removePlace(this.props.place.id);
  };

  render() {
    return (
      <div className="list-item-side">
        <div onClick={this.clickEventHandler} className="list-item-data">
          <h3 className="list-item-data__text">{this.props.place.title}</h3>
        </div>
        <Button bsStyle="danger" onClick={this.removePlace}>
          Remove
          <Glyphicon glyph="remove" />
        </Button>
      </div>
    );
  }
}

export default PlaceListItem;
