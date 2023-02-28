import './App.css'
import Joke from './Joke'
import JokeForm from './JokeForm'

import { useState } from "react"

function App() {

  //The jokes array below is stored in state, but I can't update the jokes state variable directly. 
  //I need to update the setter function... setJokes.
  const [jokes, setJokes] = useState([
    {
      id: 1,
      text: "I'm afraid for the calendar. Its days are numbered.",
      likes: 0
    },
    {
      id: 2, 
      text: "I used to be addicted to soap, but I'm clean now.",
      likes: 0
    }
  ])

  const handleAddJoke = (text) => {
    const joke = {
      text,
      id: self.crypto.randomUUID(),
      likes: 0
    }
    // jokes.push(joke)

//the setJokes functions is expecting a new array of jokes.
//I can do this by setting the existing array with a new object added in to 
//the array like (jokes + joke). I can do this in JS by using the spread operator. 
//[...jokes] spreads the existing jokes array, taking all of the joke objects out, 
//and dumping them into the a new array + the new joke object. Now every time I add
//a new joke to the frontend the setJokes([...jokes, joke]) code will be called adding a 
//new joke object to the end of the array. This causes a re-render of the component. I can 
//switch the order of the setJokes function array to setJokes([joke, ...jokes]) to set the
//new joke at the top of the array instead of the end. 

    setJokes([joke, ...jokes])
    console.log("New Joke:", text)
  }


  const handleDeleteJoke = (id) => {
//I can't mutate the jokes array itself. In order to delete a joke
//i need to call setJokes and pass in a brand new array that contains all of 
//the existing jokes minus the joke that is being deleted. The most common way
//to do this in react is via the .filter method. Filter creates a new array 
// when it is used by default so i don't need to use the spread operator to create
//a new array like [...jokes].filter. I can simply write jokes.filter

console.log("delete Joke: ", id)
setJokes(jokes.filter(joke=> joke.id !== id))

///jokes.filter(joke) maps through jokes object array and...
//                  (joke=>joke.id !== id)
//returns every joke in the new array that has an id (joke.id) that doesn't equal the id
//of the joke I'm trying to delete (via its id). In this case jokes.filter
//creates a brand new array that contains some of the items from the existing array minus 
//the ones i'm trying to delete. 

//Therefore I can use the spread operator method when I want to add a new object to my array
//and the .filter method when I want to delete an object from my array. These are all state changes
//so its important to remember that upon refresh all of my changes will be deleted because they're not 
//being stored in a databse or localstorage. 
  }

  const handleLike = (id) => {
//the handleLike & handleDislike functions will always need to have an id passed
//into it from the jokes state object array so the likes apply to the specific id
//paired with each joke. 

//Below .map is being used and this method creates a new array by default. I am passing the joke function
//into this callback function and then returning it at the end. Without my if statements
//the .map would copy the array exactly and return it. The if statement changes things
//by saying **if I come across the joke with the ID that I'm trying to update via onClick={handleLike}
//in the Joke component, which passes in the handleLike function below. 
                  //  const handleLike = () => {
                  //    onLike(id)
                  //  }
//then return a new object with a copy of the existing joke object defined in the jokes state array object, 
//with joke.likes + 1  
    console.log("handleLike: ", id)
    setJokes(jokes.map(joke => {
      if(joke.id === id) {
        return {...joke, likes:joke.likes + 1}
      } else {
        return joke
      }
    }))
  }

    const handleDislike = (id) => {
      setJokes(jokes.map(joke => {
        if (joke.id === id) {
          return {...joke, likes: joke.likes - 1}
        } else {
          return joke
        }
      }))
    }
  

  const handleSort = () => {
//Sort doesn't return a new array the way .map and .filter methods do. Instead
//I need to create a brand new array [], and spread a copy of the jokes into the 
//new array. Then I call sort on the copy of this array. I must always make a copy and manipulate
//the copy, rather than the original array itself. 

//The sort((a, b) => b.likes - a.likes) is comparing the likes of a(first element of comparison), 
//versus b (second element of comparison) 
    setJokes([...jokes].sort((a, b) => b.likes - a.likes))
  }

  return (
    <div className="">
      <h1>Dad Jokes</h1>

      <button onClick={handleSort}>Sort</button>

      <JokeForm onAddJoke={handleAddJoke} />

      {jokes.map(joke => (
        <Joke 
        onDelete={handleDeleteJoke} 
        key={joke.id} 
        onLike={handleLike}
        onDislike={handleDislike}
        {...joke} />
      ))}


    </div>
  )
}

export default App
