// NOTE: wordSmith functions from lines 4 - 39
// NOTE: byteSize functions from lines 41 - 76 (remember to add your API key!)

// information to reach API
const dataMuseUrl = 'https://api.datamuse.com/words?';
const queryParams = 'rel_jjb=';

// selecting page elements
const inputField = document.querySelector('#input');
const submit = document.querySelector('#submit');
const responseField = document.querySelector('#responseField');

// AJAX function
const getSuggestions = () => {
    const wordQuery = inputField.value;
    const endPoint = dataMuseUrl + queryParams + wordQuery;

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            renderWordResponse(xhr.response);
        }
    };
    xhr.open('GET', endPoint);
    xhr.send();
};

// clear previous results and display results to webpage
const displaySuggestions = (event) => {
    event.preventDefault();
    while (responseField.firstChild) {
        responseField.removeChild(responseField.firstChild);
    }
    getSuggestions();
};

submit.addEventListener('click', displaySuggestions);

// information to reach Rebrandly API
const apiKey = '<Your API Key>';
const rebrandlyUrl = 'https://api.rebrandly.com/v1/links';

// element selector
const shortenButton = document.querySelector('#shorten');

// AJAX functions
const shortenUrl = () => {
    const urlToShorten = inputField.value;
    const data = JSON.stringify({ destination: urlToShorten });

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            renderByteResponse(xhr.response);
        }
    };
    xhr.open('POST', rebrandlyUrl);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('apikey', apiKey);
    xhr.send(data);
};

// Clear page and call AJAX functions
const displayShortUrl = (event) => {
    event.preventDefault();
    while (responseField.firstChild) {
        responseField.removeChild(responseField.firstChild);
    }
    shortenUrl();
};

shortenButton.addEventListener('click', displayShortUrl);

/////////////////////////////////////////////////////////////////////////
// helperFunctions.js
/////////////////////////////////////////////////////////////////////////

// wordSmith helperFunctions are on lines 4 - 50
// byteSize helperFunctions are on lines 52 - 76

// Formats Response to look presentable on webpage
const renderWordResponse = (res) => {
    // Handles if res is falsey
    if (!res) {
        console.log(res.status);
    }
    // In case res comes back as a blank array
    if (!res.length) {
        responseField.innerHTML = '<p>Try again!</p><p>There were no suggestions found!</p>';
        return;
    }

    // Creates an array to contain the HTML strings
    let wordList = [];
    // Loops through the response and maxxing out at 10
    for (let i = 0; i < Math.min(res.length, 10); i++) {
        // Creates a list of words
        wordList.push(`<li>${res[i].word}</li>`);
    }
    // Joins the array of HTML strings into one string
    wordList = wordList.join('');

    // Manipulates responseField to render the modified response
    responseField.innerHTML = `<p>You might be interested in:</p><ol>${wordList}</ol>`;
    return;
};

// Renders response before it is modified
const renderRawWordResponse = (res) => {
    // Takes the first 10 words from res
    let trimmedResponse = res.slice(0, 10);
    // Manipulates responseField to render the unformatted response
    responseField.innerHTML = `<text>${JSON.stringify(trimmedResponse)}</text>`;
};

// Renders the JSON that was returned when the Promise from fetch resolves.
const renderJsonWordResponse = (res) => {
    // Creating an empty object to store the JSON in key-value pairs
    let rawJson = {};
    for (let key in response) {
        rawJson[key] = response[key];
    }
    // Converting JSON into a string and adding line breaks to make it easier to read
    rawJson = JSON.stringify(rawJson).replace(/,/g, ', \n');
    // Manipulates responseField to show the returned JSON.
    responseField.innerHTML = `<pre>${rawJson}</pre>`;
};

// Manipulates responseField to render a formatted and appropriate message
const renderByteResponse = (res) => {
    if (res.errors) {
        // Will change the HTML to show this error message if the response had an error
        responseField.innerHTML = "<p>Sorry, couldn't format your URL.</p><p>Try again.</p>";
    } else {
        // If there was no error, then the HTML will show this message
        responseField.innerHTML = `<p>Your shortened url is: </p><p> ${res.shortUrl} </p>`;
    }
};

// Manipulates responseField to render an unformatted response
const renderRawByteResponse = (res) => {
    if (res.errors) {
        // Changes the HTML to show this error message if the response had an error
        responseField.innerHTML = "<p>Sorry, couldn't format your URL.</p><p>Try again.</p>";
    } else {
        // Changes the HTML to show this raw response if there was no error
        // Formats the response into a more organized structure
        let structuredRes = JSON.stringify(res).replace(/,/g, ', \n');
        structuredRes = `<pre>${structuredRes}</pre>`;

        responseField.innerHTML = `${structuredRes}`;
    }
};
