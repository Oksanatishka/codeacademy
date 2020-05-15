// Foursquare API Info
const clientId = 'GK4J2ADE2GD1E0JBCQWN2LITOTNGVDLV5TLVKFHPGPMR0EHO';
const clientSecret = 'VYKOBXBP2XQ53GOBM23IV0T4A1GU4P1FJMVUER3XXQPDYTAL';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const openWeatherKey = '70255650969b5131d511a70c54d53e53';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$('#venue1'), $('#venue2'), $('#venue3'), $('#venue4')];
const $weatherDiv = $('#weather1');
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async () => {
    const city = $input.val();
    const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20200508`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            // console.log(response);
            // In the browser window with the Wanderlust page, enter a city in the search field and submit. Make sure that you have your own browser’s JavaScript console open so that you can see the response that is logged to the console.
            // Response {type: "cors", url: "https://api.foursquare.com/v2/venues/explore?near=…Q53GOBM23IV0T4A1GU4P1FJMVUER3XXQPDYTAL&v=20200508", redirected: false, status: 200, ok: true, …}
            const jsonResponse = await response.json();
            // console.log(jsonResponse);
            let venues = jsonResponse.response.groups[0].items.map((item) => item.venue);
            console.log(venues); // Array(10), 0: {id: "5b4e53dcad910e003970a133", name: "Сходи від Пейзажної Алеї до урочища Гончарі-Кожум‘яки", location: {…}, categories: Array(1), photos: {…}}
            return venues;
        }
    } catch (error) {
        console.log(error);
    }
};

const getForecast = async () => {
    const city = $input.val();
    const urlToFetch = `${weatherUrl}?q=${city}&APPID=${openWeatherKey}`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = response.json();
            console.log(jsonResponse);
            return jsonResponse;
        }
    } catch (error) {
        console.log(error);
    }
};

// Render functions
const renderVenues = (venues) => {
    $venueDivs.forEach(($venue, index) => {
        // Add your code here:
        const venue = venues[index];
        const venueIcon = venue.categories[0].icon;
        const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
        let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
        // let venueContent = '';
        $venue.append(venueContent);
    });
    $destination.append(`<h2>${venues[0].location.city}</h2>`);
};

const renderForecast = (day) => {
    // Add your code here:
    const weatherContent = createWeatherHTML(day);
    // let weatherContent = '';
    $weatherDiv.append(weatherContent);
};

const executeSearch = () => {
    $venueDivs.forEach((venue) => venue.empty());
    $weatherDiv.empty();
    $destination.empty();
    $container.css('visibility', 'visible');
    // add .then()
    getVenues().then((venues) => {
        renderVenues(venues);
    });
    getForecast().then((forecast) => {
        renderForecast(forecast);
    });
    return false;
};

$submit.click(executeSearch);
