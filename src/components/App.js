import { Component } from 'react';
import './App.css';
import shortid from 'shortid';

import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import { DATA_KEY } from './Constants';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem(DATA_KEY)) || [];
    this.setState({ contacts });
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem(DATA_KEY, JSON.stringify(contacts));
    }
  }

  formSubmitHandler = data => {
    const { contacts } = this.state;
    const existingContact = contacts.find(
      contact => contact.name === data.name
    );
    if (existingContact) {
      alert(`${data.name} is already in contacts`);
      return;
    }
    const newContact = { id: shortid.generate(), ...data };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleInputFind = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter, contacts } = this.state;

    const normilizedFilter = filter.toLowerCase();

    const searchedContact = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normilizedFilter)
    );

    return (
      <div className="container">
        <div>
          <h1 className="container__title">Phonebook</h1>
          <ContactForm onSubmit={this.formSubmitHandler} />
        </div>
        <div className="container__contacts">
          <h1 className="container__title">Contacts</h1>
          <Filter value={filter} onChangeFilter={this.handleInputFind} />
          <ContactList
            contacts={searchedContact}
            onClick={this.handleDeleteContact}
          />
        </div>
      </div>
    );
  }
}

export default App;
