import React from 'react';
import PlacesListLeftSide from "./PlaceListLeftSide";
import SpaMapContainer from "./SpaMapContainer";

//What will be rendered
const DashboardPage = () => (
    <div className='rowC'>
        <SpaMapContainer/>
        <PlacesListLeftSide/>
    </div>
);

export default DashboardPage;
