import React, { Component, useState, useEffect } from "react";

import './App.css';

import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";

export default function App() {
    const [robots, setRobots] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchInput.toLowerCase());
    });
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                return response.json();
            }).then(users => {
                setRobots(users);
                console.log(count);
            })
    }, [count]);

    function onSearchChange(event) {
        setSearchInput(event.target.value);
    }

    return !robots.length ? <h1 style={{ textAlign: 'center' }}>Loading...</h1> : (
        <div className='App'>
            <h1>RoboFriends</h1>
            <button onClick={() => setCount(count+1)}>Click Me!</button>
            <SearchBox searchChange={onSearchChange} />
            <Scroll>
                <ErrorBoundary>
                    <CardList robots={filteredRobots} />
                </ErrorBoundary>
            </Scroll>
        </div>
    );
}

// class App extends Component {
//     constructor() {
//         super();
//         this.state = {
//             robots: [],
//             searchInput: ''
//         }
//     }

//     componentDidMount() {
//         fetch('https://jsonplaceholder.typicode.com/users')
//             .then(response => {
//                 return response.json();
//             }).then(users => {
//                 this.setState({robots: users});
//             })
//     }

//     onSearchChange = (event) => {
//         this.setState({ searchInput: event.target.value });
//     }

//     render() {
//         const { robots, searchInput } = this.state;
//         const filteredRobots = robots.filter(robot => {
//             return robot.name.toLowerCase().includes(searchInput.toLowerCase());
//         })
//         return !robots.length ? <h1 style={{ textAlign: 'center' }}>Loading...</h1> : (
//             <div className='App'>
//                 <h1>RoboFriends</h1>
//                 <SearchBox searchChange={this.onSearchChange} />
//                 <Scroll>
//                     <ErrorBoundary>
//                         <CardList robots={filteredRobots} />
//                     </ErrorBoundary>
//                 </Scroll>
//             </div>
//         );
//     }
// }

// export default App;