import React, { Component } from 'react'
import request from 'superagent';
import { withRouter } from 'react-router-dom';

// we need withRouter to get access to the URL to see if we are on the favorites page
export default withRouter(class List extends Component {
    /* whenever youre in a list and clicking on an item has a function that needs access to that item, you need a function that returns a function*/
    makeFavorite = async (char) => {
        console.log('List', this.props)
        // when the user clicks the makeFavorite button, add this character to the favorite list
        const fave = await request.post('http://localhost:3000/api/me/favorites', {
            name: char.name,
            weight: char.mass,
            eye_color: char.eye_color,
        })
        .set('Authorization', this.props.user.token)

        console.log('fave', fave.body)
    }
    
    renderButtonOrStar = (char) => {
        // check the favorites list if we're on the search page
        const isOnFavoritesList = this.props.favorites.find(person => char.name === person.name);
        if (!isOnFavoritesList) {
            // if they're not on the list, give user option to add them to favorites
            // we are iterarting through a list, and we need the item in a function, so we make an anonymous function that CALLS that function on click with the right arguments
        return <button onClick={ (e) => this.makeFavorite(char)}>Make favorite</button>
        }

        // otherwise, indicate that they ae already on the favorites list
        return <span>⭐</span>
    }

    render() {
        console.log('url', this.props)
        return (
            <div>
                {
                    // iterate over the characters, and for each character, show their name
                    this.props.characters.map(char => <div key={char.name} className="char-box">
                        <div>{char.name}</div>
                        <div>{char.weight}</div>
                        <div>{char.eye_color}</div>
                        {
                            this.props.location.pathname !== '/favorites' 
                            // only render a button or star on the search page
                                && this.renderButtonOrStar(char)
                        }
                    </div>)
                }
            </div>
        )
    }
})
