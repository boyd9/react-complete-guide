import React, { Component } from 'react';
//import logo from './logo.svg';
import classes from './App.css';
import Person from './Person/Person';


class App extends Component {

  state = {
    persons: [
      { id: '1', name: 'Boyd', age: 43 },
      { id: '2', name: 'Jenny', age: 56 },
      { id: '3', name: 'Poppy', age: 65 }
    ],
    showPersons: false
  }

  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        { name: newName, age: 43 },
        { name: 'Jenny', age: 56 },
        { name: 'Poppy', age: 65 }
      ]
    });
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  }

  deletePersonHandler = (index) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons]
    persons.splice(index, 1);
    this.setState({ persons: persons });
  }

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              name={person.name}
              age={person.age}
              click={() => this.deletePersonHandler(index)}
              changed={(event) => this.nameChangedHandler(event, person.id)}
              key={person.id} />
          })}
        </div>
      );

      style.backgroundColor = 'red';
    }

    let classes = [];

    if (this.state.persons.length <= 2) {
      classes.push('red');
    }

    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    /*
    if(classes.length > 1){
      classes.join(' ');
    }
    */

    return (
        <div className="App">
          <h1 className={classes.join(' ')}>Hi Im a react app!</h1>
          <button
            style={style}
            onClick={this.togglePersonsHandler}>Toggle Persons</button>

          {persons}
          {/*
        <Person name='Boyd' age='27' />
        <Person name='Jenny' age='33'>My hobbies: racing</Person>
        <Person name='Poppy' age='35' />
         */}
        </div>
    );
  }
}

export default App;
