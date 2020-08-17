import React, { Component } from 'react';
import classes from  './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
//import styled from 'styled-components';



class App extends Component {
  state = {
    persons: [
      { id: '1', name: 'Harry', age: 28 },
      { id: '2', name: 'Hermione', age: 29 },
      { id: '3', name: 'Ronald', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  }

  nameChangedHandler = ( event, id ) => {
    //this finds you the exact index position
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      //this makes the new object by finding the exact object on line 18
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value; //assigns the new name

    const persons = [...this.state.persons]; //you make a new persons const with all values from OG persons

    persons[personIndex] = person; //then you store the person const from line 22 into the persons const from line 31

    this.setState( {persons: persons} );
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState( { showPersons: !doesShow } );
  }

  render () {
    /**const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'salmon', 
        color: 'black'
      }
    };**/

    let persons = null;

    if ( this.state.showPersons ) {
      persons = (
          <Persons 
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}  />
      );
      /**style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'pink',
        color: 'black'
      }**/
    }

    return (
      <div className={classes.App}>
        <Cockpit 
        showPersons={this.state.showPersons}
        persons={this.state.persons}
        clicked={this.togglePersonsHandler}
        />
        {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
