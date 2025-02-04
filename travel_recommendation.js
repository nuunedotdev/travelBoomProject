fetch('travel_recommendation_api.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // console.log('Data fetched successfully:', data);

    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');


    searchButton.addEventListener('click', () => {
    
        const searchTerm = searchInput.value.toLowerCase();
        const results = [];


        data.countries.forEach(country => {
            country.cities.forEach(city => {
                if (city.name.toLowerCase().includes(searchTerm) || country.name.toLowerCase().includes(searchTerm)) {
                    results.push(city); // Or push the whole country if you prefer
                }            
            })
        });


        data.temples.forEach(temple => {
            if (temple.name.toLowerCase().includes(searchTerm)) {
                results.push(temple);
            }
        });
    
    
        data.beaches.forEach(beach => {
            if (beach.name.toLowerCase().includes(searchTerm)) {
                results.push(beach);
            }
        });
    
        displayResults(results);


    }); //BUTTON CLIENT EVENT LISTERNER

    function displayResults(results) {
        const searchResults = document.getElementById('searchResults');
        searchResults.innerHTML = ''; // Clear previous results

        if (results.length === 0) {
            searchResults.innerHTML = "<p>No results found.</p>";
        } else {
            searchResults.style.display = "block"; // Show the results div
            results.forEach(result => {
                const resultDiv = document.createElement('div');
                resultDiv.innerHTML = `<h3>${result.name}</h3><img src="${result.imageUrl}" alt="${result.name}"><p>${result.description}</p>`;
                searchResults.appendChild(resultDiv);
            });
        }
    }




    const clearButton = document.getElementById('clearButton');

    clearButton.addEventListener('click', () => {
      const searchInput = document.getElementById('searchInput');
      const searchResults = document.getElementById('searchResults');
  
      searchInput.value = ''; // Clear the search input
      searchResults.innerHTML = ''; // Clear the search results
      searchResults.style.display = "none"; // Hide the results popup (optional)
  });

  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
