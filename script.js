document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const recommendationsSection = document.getElementById('recommendations');

  searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const query = searchInput.value.trim(); // Trim to remove leading and trailing spaces
      if (query) {
          searchDestinations(query);
          searchInput.value = ''; // Clear the input field
      } else {
          alert('Please enter a destination name.');
      }
  });

  const searchDestinations = (query) => {
      const apiUrl = `https://api.opentripmap.com/0.1/en/places/geoname?name=${encodeURIComponent(query)}&apikey=5ae2e3f221c38a28845f05b6`;

      fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
              if (data && data.features && data.features.length > 0) {
                  displayResults(data.features);
              } else {
                  displayNoResults();
              }
          })
          .catch(error => {
              console.error('Error fetching data:', error);
              displayError();
          });
  };

  const displayResults = (places) => {
      recommendationsSection.innerHTML = ''; // Clear previous results

      places.forEach(place => {
          const destinationElement = document.createElement('div');
          destinationElement.classList.add('destination');
          
          const destinationImage = document.createElement('img');
          destinationImage.src = `https://api.opentripmap.com/0.1/en/places/xid/${place.properties.xid}?apikey=YOUR_API_KEY`; // Adjust as needed for image source
          destinationElement.appendChild(destinationImage);
          
          const destinationName = document.createElement('h3');
          destinationName.textContent = place.properties.name;
          destinationElement.appendChild(destinationName);

          recommendationsSection.appendChild(destinationElement);
      });
  };

  const displayNoResults = () => {
      recommendationsSection.innerHTML = '<p>No results found.</p>';
  };

  const displayError = () => {
      recommendationsSection.innerHTML = '<p>Error fetching data. Please try again later.</p>';
  };
});
