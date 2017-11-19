var CONTACTS = [
    {
        id: 1,
        name: 'Darth Vader',
        phoneNumber: '+250966666666',
        image: '/images/darth.gif',
        email: 'anakin-skywalker@gmail.com',
        about: 'Once a heroic Jedi Knight, Darth Vader was seduced by the dark side of the Force, ' +
        'became a Sith Lord, and led the Empire’s eradication of the Jedi Order. ' +
        'He remained in service of the Emperor -- ' +
        'the evil Darth Sidious -- for decades, ' +
        'enforcing his Master’s will and seeking to crush the fledgling Rebel Alliance. ' +
        'But there was still good in him…'
    }, {
        id: 2,
        name: 'Princess Leia',
        phoneNumber: '+250966344466',
        image: '/images/leia.gif',
        email: 'princess.l@gmail.com',
        about: 'Princess Leia Organa was one of the Rebel Alliance’s greatest leaders, fearless on the battlefield ' +
        'and dedicated to ending the tyranny of the Empire. Daughter of Padmé Amidala and Anakin Skywalker, sister ' +
        'of Luke Skywalker, and with a soft spot for scoundrels, Leia ranks among the galaxy’s great heroes. ' +
        'But life under the New Republic has not been easy for Leia. Sidelined by a new generation of political ' +
        'leaders, and struck out on her own to oppose the First Order as founder of the Resistance. ' +
        'These setbacks in her political career have been accompanied by more personal losses.'
    }, {
        id: 3,
        name: 'Luke Skywalker',
        phoneNumber: '+250976654433',
        image: '/images/luke.gif',
        email: 'luke@gmail.com',
        about: 'Luke Skywalker was a Tatooine farmboy who rose from humble beginnings to ' +
        'become one of the greatest ' +
        'Jedi the galaxy has ever known. ' +
        'Along with his friends Princess Leia and Han Solo, Luke battled the evil Empire, ' +
        'discovered the truth of his parentage, and ended the tyranny of the Sith. ' +
        'A generation later, the location of the famed Jedi master was one of the galaxy’s greatest mysteries.'
    }, {
        id: 4,
        name: 'Chewbacca',
        phoneNumber: '+250456784935',
        image: '/images/chewbacca.gif',
        email: 'chewbacca@gmail.com',
        about: 'A legendary Wookiee warrior and Han Solo’s co-pilot aboard the Millennium Falcon, Chewbacca was part ' +
        'of a core group of Rebels who restored freedom to the galaxy. Known for his short temper and accuracy with a ' +
        'bowcaster, Chewie also has a big heart -- and is unwavering in his loyalty to his friends. ' +
        'He has stuck with Han through years of turmoil that have changed both the galaxy and their lives.'
    }
];




var Contact = React.createClass({
    getInitialState: function () {
        return {
            isOpened: false
        };
    },
    clickHandle: function () {
        this.setState({
            isOpened: !this.state.isOpened
        })
    },
    render: function () {
        if (this.state.isOpened === false) {
            return (
                <li className="contact" onClick={this.clickHandle}>
                    <img className="contact-image" src={this.props.image} width="60px" height="60px" />
                    <div className="contact-info">
                        <div className="contact-name"> {this.props.name} </div>
                        <div className="contact-number"> {this.props.phoneNumber} </div>
                    </div>
                </li>
            );
        } else {
            return (
                <li className="contact" onClick={this.clickHandle}>
                    <img className="contact-image" src={this.props.image} width="60px" height="60px" />
                    <div className="contact-info">
                        <div className="contact-name"> {this.props.name} </div>
                        <div className="contact-number"> {this.props.phoneNumber} </div>
                        <div className="contact-email">{this.props.email}</div>
                        <div className="about">{this.props.about}</div>
                    </div>
                </li>
            );
        }
    }
});




var ContactsList = React.createClass({
    getInitialState: function () {
        return {
            displayedContacts: CONTACTS,
        };
    },
    handleSearch: function (event) {
        var searchQuery = event.target.value.toLowerCase();
        var displayedContacts = CONTACTS.filter(function (el) {
            var searchValue = el.name.toLowerCase();
            return searchValue.indexOf(searchQuery) !== -1;
        });
        this.setState({
            displayedContacts: displayedContacts
        });
    },
    render: function () {
        return (
            <div className="contacts">
                <input type="text" placeholder="Search..." className="search-field" onChange={this.handleSearch} />
                <ul className="contacts-list">
                    {
                        this.state.displayedContacts.map(function (el) {
                            return <Contact
                                key={el.id}
                                name={el.name}
                                phoneNumber={el.phoneNumber}
                                image={el.image}
                                email={el.email}
                                about={el.about}
                            />;
                        })
                    }
                </ul>
            </div>

           
        );
    }
});




ReactDOM.render(
    <ContactsList />,
    document.getElementById("content")
);