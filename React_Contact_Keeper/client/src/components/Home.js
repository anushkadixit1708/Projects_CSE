import React from 'react';
import Contacts from './Contacts';
import ContactForm from './ContactForm';
import ContactFilter from './ContactFilter';

const Home = () => {
    return (
        <div className="grid-2">
            <div>
                <ContactForm />
            </div>
            <div>
                <ContactFilter />
                <Contacts />
            </div>
        </div>
    )
}

export default Home;
