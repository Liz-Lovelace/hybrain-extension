import axios from 'axios';

const GOOGLE_BOOKS_API_KEY = 'AIzaSyArixPHkJKkqxTWbdPYVnNPJQZfEWrTSBc';

async function searchBook(bookName) {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(bookName)}&key=${GOOGLE_BOOKS_API_KEY}`
    );

    const data = response.data;

    if (data.totalItems > 0) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

// Usage example:
searchBook('To Kill a Mockingbird').then((data) => {
  if (data) {
    console.log('Book found:', data);
  } else {
    console.log('Book not found');
  }
});


async function searchMedia(mediaArray) {
  const SEARCH_API_URL = 'https://example.com/search?q='; // Replace with a real API or implement web scraping

  const searchResults = await Promise.all(
    mediaArray.map(async (media) => {
      try {
        const response = await fetch(SEARCH_API_URL + encodeURIComponent(media));
        const data = await response.json();

        // Assuming the search API returns an array of results, and each result has a 'url' property
        // You'll need to adapt this part to the structure of the real API you're using
        if (data.results && data.results.length > 0) {
          return data.results[0].url;
        } else {
          return null;
        }
      } catch (error) {
        console.error('Error searching for media:', error);
        return null;
      }
    })
  );

  return searchResults;
}
