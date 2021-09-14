import React, { useState, useEffect} from 'react';
import Loader from './../components/loader/Loader';
import TourList from './../components/tour_list/TourList';

const url = 'https://course-api.com/react-tours-project';

function App() {
	//**************** variables ****************//
const [loading, setLoading] = useState(true);
const [tours, setTours] = useState([]);

	//**************** functions ****************//
  const removeTour = id => {
		const newTours = tours.filter(tour => tour.id !== id);
		setTours(newTours);
  };

  const fetchTours = async () => {
		setLoading(true);
		try {
			const response = await fetch(url);
			const tours = await response.json();
			setLoading(false);
			setTours(tours);

		} catch (error) {
			setLoading(false);
			console.log(error);
		}
  };

  useEffect(() => {
    fetchTours()
  }, [])


  if(loading) {
    return (
      <main>
        <Loader />
      </main>
    )
  }
    if (tours.length === 0) {
			return (
				<main>
					<div className='title'>
						<h2>{tours.length} tours to display</h2>
						<button className='btn' onClick={() => fetchTours()}>
							refresh
						</button>
					</div>
				</main>
			);
		}

	return (
		<main>
			<TourList tours={tours} removeTour={removeTour}/>
		</main>
	);
}

export default App;
