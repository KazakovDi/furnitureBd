function queryFunc(query, sought, findPlace, func) {
    if(!sought || sought.length === 0 ) {
    return query
}
if(func === 'gte') {
    query = query.gte(findPlace, sought)
}  else if(func === 'lte') {
    query = query.lte(findPlace, sought)
}
else {
  query = query.regex(findPlace, new RegExp(sought, 'i'))
}
return query
}
module.exports = queryFunc