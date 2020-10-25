// # File contains a representation of a Generic rel-type
// # in the dataset which comes with neo4j. Instantiation
// # of this object (GenericRel) should be done with the
// # unwrapping fuction defined at the bottom.

class GenericRel {
    constructor(neo4jRecord) {
        // # Note, this is a generic rel, so no props
        // # are included.
        this.id = neo4jRecord.identity.low
        this.start = neo4jRecord.start.low
        this.end = neo4jRecord.end.low
    }
    // # json used for d3 link.
    toJSON() {
        return {
            'source': this.start, 
            'target': this.end
        }
    }
}

// # Unwrapping function is used to convert a neo4j
// # record into a GenericRel.
function unwrapGenericRel(n4jRecordElm) {
    // # Guard correct record type (rel, as 
    // # opposed to node. This is the only 
    // # requirement, as the class is generic.
    if (n4jRecordElm.constructor.name != 'Relationship')
        return false
    
    return new GenericRel(n4jRecordElm)
}

export {GenericRel, unwrapGenericRel}