import { useContext } from 'react';
import Seeker from './BodySeeker';
import Grider from './BodyGrider';
import Listing from './BodyListing';
import { DataContext } from '../Context/DataContext';
import Loader from '../Loader/Loader';

import './Body.css';

function Body() {
  const { dataReady } = useContext(DataContext);

  if (!dataReady) {
    return <Loader />;
  }

  return (
    <div className="body">
      <div className="body-container">
        <Seeker />
        <Grider />
        <Listing />
      </div>
    </div>
  );
}

export default Body;
