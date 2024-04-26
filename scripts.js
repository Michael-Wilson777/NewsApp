const apiKey = "082f70a1bdc24d96ac30cdb15593765c";
const baseUrl = 'https://newsapi.org/v2/everything';
const topHead = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
const home = document.querySelector(".home");
home.addEventListener('click', fetchTopHeadlines);

// Function to fetch top headlines
async function fetchTopHeadlines() {
  try {
    const response = await fetch(topHead);
    const data = await response.json();
    console.log(data);
    displayNews(data.articles); // Display the fetched top headlines
  } catch (error) {
    console.error('There was an error fetching top headlines!', error);
  }
}

// Function to fetch news articles based on a keyword
async function fetchNewsByKeyword(keyword) {
  try {
    const url = `${baseUrl}?q=${keyword}&apiKey=${apiKey}`; // Construct URL based on the keyword
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    displayNews(data.articles); // Display the fetched articles
  } catch (error) {
    console.error(`There was an error fetching news for ${keyword}!`, error);
  }
}

// Add event listeners to each navbar item
document.querySelectorAll('.nav-link').forEach(item => {
  item.addEventListener('click', async (event) => {
      const keyword = event.target.textContent.trim(); // Get the text content of the clicked item
      fetchNewsByKeyword(keyword); // Fetch articles based on the clicked keyword
  });
});

fetchTopHeadlines(); // Fetch top headlines initially

function displayNews(articles) {
  const newsDiv = document.querySelector('#news');
  const row = document.createElement('div');
  row.classList.add('row');

  articles.forEach(article => {
      const card = createCard(article);
      row.appendChild(card);
  });

  // Clear existing content before appending new content
  newsDiv.innerHTML = '';
  newsDiv.appendChild(row);
}

function createCard(article) {
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('col-md-4'); // Set column size for medium screens (adjust as needed)
  cardContainer.classList.add('my-3');

  const card = document.createElement('div');
  card.classList.add('card');
  card.classList.add('h-100');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');
  cardBody.classList.add('d-flex');
  cardBody.classList.add('flex-column');

  const title = document.createElement('h5');
  title.classList.add('card-title');
  title.textContent = article.title;

  const description = document.createElement('p');
  description.classList.add('card-text');
  description.textContent = article.description;

  const image = document.createElement('img');
  image.classList.add('card-img-top');
  image.src = article.urlToImage;
  image.style.height = "200px"; // Set a fixed height for the card image

  const readMoreLink = document.createElement('a');
  readMoreLink.classList.add('btn');
  readMoreLink.classList.add('btn-primary');
  readMoreLink.href = article.url;
  readMoreLink.textContent = 'Read More';

  cardBody.appendChild(title);
  cardBody.appendChild(description);
  cardBody.appendChild(image);
  cardBody.appendChild(readMoreLink);

  card.appendChild(cardBody);
  cardContainer.appendChild(card);

  return cardContainer;
}




