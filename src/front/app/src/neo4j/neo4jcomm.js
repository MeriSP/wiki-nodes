import neo4j from "neo4j-driver"

// # Testing types. Used to unwrap some data in the default neo4j
// # dataset. Used to conveniently develop this file.
import { MovieNode, unWrapMovieNode} from './types/movienode.js'
import { PersonNode, unWrapPersonNode} from './types/personnode.js'
import { GenericRel, unwrapGenericRel } from './types/rel_generic.js'

// # Global driver obj.
const DRIVER = neo4j.driver(
    'bolt://192.168.11.129:7687/',
    neo4j.auth.basic(
        'neo4j',
        'morpheus4j'
    )
)

// # Rudimentay communication with Neo4j.
async function neo4jPull(cql, bind = null) {
    const session = DRIVER.session()
    const res = await session.run(cql, bind)
    await session.close()
    return res
}

// # Filters an array such that all elements
// # have a unique id property. 
// # Note: First-come-first-include policy.
function filterUniqueID(objects){
    let include = {}
    objects.forEach(item => {
        // # Drop items if their id is
        // # already in the hashmap
        if (include[item.id] == undefined)
            include[item.id] = item
    })
    // # Only return values in the hashmap.
    return Object.values(include)
}

// # Attempts to unwrap a neo4j response with an array of 
// # unwrapping functions, which have the responsebility 
// # of unwrapping a record element correctly. All unwrapped 
// # items are returned as an array which is processed by 
// # filterUniqueID().
function unwrapNeo4jResponse(n4jResp, unwrapFuncs) {
    let result = []

    // # All neo4j records from response.
    n4jResp.records.forEach(record => {
        // # Access all items in a record.
        for (let i = 0; i < record.length; i++) {
            let recordElm = record.get(i)
            // # Try to unrwap record data
            // # with any unwrapping func.
            unwrapFuncs.forEach(f => {
                let unwrapped = f(recordElm)
                // # Only add it to results if
                // # unwrapping succeeded.
                if (unwrapped && !result.includes(unwrapped)) {
                    result.push(unwrapped)
                }
            })

        }
    })
    return filterUniqueID(result)
}

// # A prefab used for testing. Pulls all nodes
// # which are connected to the 'V for Vendetta'
// # movie node in the default neo4j dataset.
// # Result (said movie, all connected nodes and
// # relationships) are unpacked and returned as
// # an array in a promise.
export async function prefabMovieNodesEdges() {
    const cql = `
        MATCH (m:Movie)-[r]-(n)
        WHERE m.title = 'V for Vendetta'
        RETURN m, r, n
    `
    const resp = await neo4jPull(cql)
    // # Funcs for unwrapping neo4j resp.
    const unwrappers = [
        unWrapMovieNode,
        unWrapPersonNode,
        unwrapGenericRel
    ]
    // # Unwrap before return.
    const unwrapped = unwrapNeo4jResponse(
        resp,
        unwrappers
    )
    return unwrapped
}



