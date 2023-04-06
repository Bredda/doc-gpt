import { queries } from "./query.js"

const query = "Comment ca va aujourd'hui ?"
const ask = queries.simpleQuery(query).then(
    (resp)=> console.log(resp),
    (err)=> console.log(err)
)