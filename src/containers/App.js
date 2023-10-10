import React, { Component } from "react";

import './App.css';

import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";

class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchInput: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                return response.json();
            }).then(users => {
                this.setState({robots: users});
            })
    }

    onSearchChange = (event) => {
        this.setState({ searchInput: event.target.value });
    }

    render() {
        const { robots, searchInput } = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchInput.toLowerCase());
        })
        return !robots.length ? <h1 style={{ textAlign: 'center' }}>Loading...</h1> : (
            <div className='App'>
                <h1>RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange} />
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundary>
                </Scroll>
            </div>
        );
    }
}

export default App;