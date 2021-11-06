import React, { Component } from "react";

class PokemonList extends Component {

    constructor(props) {
        super(props);
        this.state = { pokemonList: [],
        next: "https://pokemonapplication-v1.herokuapp.com/pokemon/list",
        prev: null
    }
    }


    componentDidMount() {
       this.fetchPokemons(this.state.next);
    }

    fetchPokemons = (url)=>{
        fetch(url)
        .then(response => {
            return response.json();
        })
        .then(response=>{
            const {results, next, prev} = response;
            console.log(response);
            this.setState({
                pokemonList: results,
                next: next,
                prev: prev
            })
            return response;
        })
        
    }


    onNext= () => {
        const next = this.state.next;
        console.log('next', next);
        if(next){
            this.fetchPokemons(next)
        }

    }
    onPrev= () => {
        const prev = this.state.prev;
        console.log('prev', prev);
        if(prev){
            this.fetchPokemons(prev);
        }
        
    }


    render() {
        return (
            <div>
                <h1>Pokemons List: </h1>
                {this.state.prev &&<button onClick={this.onPrev}>Prev</button>}
                {this.state.next && <button onClick={this.onNext}>Next</button>}
                <ul>
                    {
                        this.state.pokemonList.map(pokemon => {
                            return <div>
                                <li key={pokemon.name}> {pokemon.name}</li>
                                <img src={pokemon.imageurl} />
                            </div>
                        })
                    }
                </ul>
                
            </div>

        )
    }


}

export default PokemonList;