// # Contains unit tests for neo4jcomm.js

import {prefabMovieNodesEdges} from './neo4jcomm.js'


// # Dev test: import some data from 
// # the neo4j built-in movies dataset.
// # Attemt to unpack it neatly.
function test_prefabMovieNodesEdges() {
    let data = prefabMovieNodesEdges()
    data.then(r => {
        console.log(r)
    })
    // console.log(data)

}

// # Include all tests to run here.
function runTests() {
    test_prefabMovieNodesEdges()

}
runTests()