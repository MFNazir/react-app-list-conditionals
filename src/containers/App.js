import React, { Component } from 'react';
import classes from  './App.css';
import Person from '../components/Persons/Person/Person';
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
    let btnClass = '';

    if ( this.state.showPersons ) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name} 
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}
        </div>
      );
      /**style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'pink',
        color: 'black'
      }**/
      btnClass = classes.Red;
    }

    const assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red); 
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold); 
    }



    return (
      <div className={classes.App}>
        <h1>Hi, I'm a React App</h1>
        <p className={assignedClasses.join(' ')}>This is really working!</p>
        <button className={btnClass} onClick={this.togglePersonsHandler}>
            Toggle Persons 
        </button>
        {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
