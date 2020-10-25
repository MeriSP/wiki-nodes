// # File contains a representation of a Movie node-type
// # in the dataset which comes with neo4j. Instantiation
// # of this object (MovieNode) should be done with the
// # unwrapping fuction defined at the bottom.

class MovieNode {
    constructor(neo4jRecord) {
        this.id = neo4jRecord.identity.low
        this.title = neo4jRecord.properties.title
        this.labels = neo4jRecord.labels
        this.tagline = neo4jRecord.properties.tagline
    }
    // json used for d3 node.
    toJSON() {
        return {
            'id':this.id
        }
    }
}

// # Unwrapping function is used to convert a neo4j
// # record into a MovieNode.
function unWrapMovieNode(n4jRecordElm) {
    // # Guard correct record type (node, as 
    // # opposed to edge/relationship).
    if (n4jRecordElm.constructor.name != 'Node')
        return false
    // # Guard correct node type.
    if (!n4jRecordElm.labels.includes('Movie'))
        return false

    return new MovieNode(n4jRecordElm)
}


export { MovieNode, unWrapMovieNode}
