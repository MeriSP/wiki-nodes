// # File contains a representation of a Person node-type
// # in the dataset which comes with neo4j. Instantiation
// # of this object (PersonNode) should be done with the
// # unwrapping fuction defined at the bottom.

class PersonNode {
    constructor(neo4jRecord) {
        this.id = neo4jRecord.identity.low
        this.name = neo4jRecord.properties.name
        this.born = neo4jRecord.properties.born
    }
    // json used for d3 node.
    toJSON() {
        return {
            'id': this.id
        }
    }
}

// # Unwrapping function is used to convert a neo4j
// # record into a PersonNode.
function unWrapPersonNode(n4jRecordElm) {
    // # Guard correct record type (node, as 
    // # opposed to edge/relationship).
    if (n4jRecordElm.constructor.name != 'Node')
        return false
    // # Guard correct node type.
    if (!n4jRecordElm.labels.includes('Person'))
        return false

    return new PersonNode(n4jRecordElm)
}

export { PersonNode, unWrapPersonNode}