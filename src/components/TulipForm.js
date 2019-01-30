import React from "react";
import { Button, Glyphicon, Tooltip } from "react-bootstrap";

class TulipForm extends React.Component {
  render() {
    return (

      <form id="tulip" className="form">
        <input
          type="text"
          name="title"
          className="form-input"
          placeholder="Name that place!"
        />
        <button id="btn" className="button--add">
          Add
          <Glyphicon glyph="ok" />
        </button>
      </form>

    );
  }
}

export default TulipForm;
