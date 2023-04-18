import { Component } from 'react';
import '../App.css';
import shortid from 'shortid';

import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmitHandler = data => {
    const existingContact = this.state.contacts.find(
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
    const normilizedFilter = this.state.filter.toLowerCase();

    const searchedContact = this.state.contacts.filter(contact =>
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
          <Filter
            value={this.state.filter}
            onChangeFilter={this.handleInputFind}
          />
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
