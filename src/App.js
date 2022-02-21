import { useState, useEffect } from 'react';
import axios from "axios";

const URL = "https://the-one-api.dev/v2/quote"


function App() {
  const [quote, setQuote] = useState();
  const [character, setCharacter] = useState();

  useEffect(() => {
    const headers = {
      'Accept': 'application/json',
      "Authorization": "Bearer APIKEY"
    }

    
    axios.get(URL, {headers: headers})
    .then((response) => {
    const quotes = response.data;
    const quote = quotes.docs[Math.floor(Math.random() * quotes.docs.length)];
    setQuote(quote.dialog);
    console.log(quote.character);

    axios.get("https://the-one-api.dev/v2/character?_id=" + quote.character, { headers: headers })
    .then((res) => {
      const characters = res.data;
      const character = characters.docs[0];
      setCharacter(character.name);
    }).catch (error => {
      alert(error);
    });
    

    }).catch (error => {
      alert(error);
    });

}, []);



return (
  <>
    <div>
      <blockquote>{quote}</blockquote>
      <cite>- {character}</cite>
    </div>
  </>
);

}

export default App;
