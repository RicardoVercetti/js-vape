import './App.css'
import { useEffect } from 'react';
// import { print } from './mods/fns';

function App() {


    useEffect(() => {
      async function run() {
        try {
          const body = {
            requestType: 'get', // or 'post' depending on what you want
            requestUrl: 'https://infopark.in/companies/job-search' // target site
          };
  
          const res = await fetch('http://localhost:3000/scrape', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          });
  
          const data = await res.json();
          console.log('Scrape response:', data);
  
          // If you want to parse the HTML and extract title
          const parser = new DOMParser();
          const doc = parser.parseFromString(data.data, 'text/html');
          console.log('Title from scraped page:', doc.querySelector('title')?.textContent);

          
        } catch (err) {
          console.error('Failed to fetch from backend:', err);
        }
      }
  
      run();
    }, []);
  

  return (
    <>
      <h1>Nothing to show here fool</h1>
    </>
  )
}

export default App
