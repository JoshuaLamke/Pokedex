# Pokedex Application

* **Heroku Deployment URL:** http://pokedex-jl.herokuapp.com

### Documentation

**General App Description:** This web application allows you to view pokemon information including moves, abilities, pictures, and more. You can also create your own custom pokemon to show to the world in the custom pokmeon section.

#### Page Components

* **React Component 1:** Home Page
  * *Functionality:* Displays the 898 pokemon in card form or in tabular form
  * *Interactivity:* The user can click search for a specific pokemon and change the number of cards displayed per page. Also, they can click on a card and it will route them to the information page for that pokemon. For the table form the user can sort each row alphabetically or numerically and can search for a pokemon name. Also, the user can click a row in the table and it will route them to that pokemon's information.


* **React Component 2:** Pokemon Info Page
  * *Functionality:* Displays the information for a specific pokemon.
  * *Interactivity:* The user can click on a button to see the list of the pokemon's moves.


* **React Component 3:** Pokemon Moves Page
  * *Functionality:* Displays the list of that pokemon's moves.
  * *Interactivity:* The user can view the moves in tabular or card form and can also sort and search just like in the home page. Clicking on a card or row in the table will route you to the move details page.


* **React Component 4:** Move Details Page
  * *Functionality:* Displays the details of a specific move.
  * *Interactivity:* The user can click the back button to select a different move for that pokemon.

* **React Component 5:** Create Pokemon Page
  * *Functionality:* Displays a paginated form where you can create a pokemon to be displayed in the custom pokemon section. Pokemon are stored in firebase.
  * *Interactivity:* The user can type in the form and see in real time if what they are typing is acceptable and will get an error message on how to fix any incorrect inputs. After finishing they will be able to see the pokemon they created.

* **React Component 6:** Custom Pokemon Page
  * *Functionality:* Displays all of the custom pokemon created in card form.
  * *Interactivity:* The user can search for a pokemon and adjust the number of cards displayed. The user can also click on a card and it will route them to the info for that custom pokemon.

* **React Component 7:** Custom Pokemon Info Page
  * *Functionality:* Displays the details of a specific custom pokemon.
  * *Interactivity:* The user can click the back button to select a different custom pokemon to view.

* **React Component 8:** Page Not Found Page
  * *Functionality:* Lets the user know that the page they went to does not exist.
  * *Interactivity:* The user can click the home button to go to the home page.

#### Route-Components

* **React Component 9:** Route List Component
  * *Functionality:*  Creates a list of routes using react router dom to use for the app.
  * *Interactivity:* None.

#### Sub-Components

* **React Component 10:** NavBar
  * *Functionality:* Displays a navbar with clickable links.
  * *Interactivity:* The user can click the links and be routed to different pages in the app.

* **React Component 11:** Type Buttons
  * *Functionality:* Displays each pokemon type as a button for the form.
  * *Interactivity:* The user can click on a button and it will glow black to indicate it was clicked. The user can click a max of 2 buttons at a time and the component keeps track of this.

* **React Component 12:** Move Card Container
  * *Functionality:* Displays move cards.
  * *Interactivity:* None.

* **React Component 13:** Card Container
  * *Functionality:* Displays regular pokemon cards.
  * *Interactivity:* None.

* **React Component 14:** Custom Card Container
  * *Functionality:* Displays custom pokemon cards.
  * *Interactivity:* None.

* **React Component 15:** Card 
  * *Functionality:* Displays a pokemon card.
  * *Interactivity:* None.

* **React Component 16:** Custom Card 
  * *Functionality:* Displays a custom pokemon card.
  * *Interactivity:* None.

* **React Component 17:** Create Pokmeon Form Control
  * *Functionality:* Controlled form component for create pokemon page.
  * *Interactivity:* The user can type and see custom validation using react hook form and yup.

* **React Component 18:** Card Filter
  * *Functionality:* Controlled component to filter anything.
  * *Interactivity:* The user can filter the number of cards by typing in a number.

* **React Component 19:** Bar 
  * *Functionality:* Response stat bar to show pokemons stats because I could not find any npm packages that did what I needed.
  * *Interactivity:* None.

* **React Component 20:** Global Filter 
  * *Functionality:* Controlled component that filters the table.
  * *Interactivity:* None.

* **React Component 21:** Pokemon Table
  * *Functionality:* Displays the tabular form of the pokemon and its moves.
  * *Interactivity:* None.

* **React Component 22:** Footer
  * *Functionality:* Displays a footer with clickable links.
  * *Interactivity:* The user can click the links and be routed to the api I used, my portfolio, or my github.


#### Utils

* **React Util 1:** Columns 
  * *Functionality:* Defines column structure for pokemon table.
  * *Interactivity:* None.

* **React Util 2:** Move columns 
  * *Functionality:* Defines column structure for move table.
  * *Interactivity:* None.

* **React Util 3:** Type Colors
  * *Functionality:* Defines all the colors for each pokemon type.
  * *Interactivity:* None.

* **React Util 4:** Utility 
  * *Functionality:* Defines helper functions.
  * *Interactivity:* None.

* **React Util 5:** Create Form Data
  * *Functionality:* Defines YUP validation schema for create pokemon form.
  * *Interactivity:* None.

#### App
* **React Component 23:** App
  * *Functionality:* Renders routes component.
  * *Interactivity:* None.
