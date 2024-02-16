const ytsr = require("ytsr");

async function search(query) {
  let SearchData = []
  const searchResults = await ytsr(`${query} music`, {
    pages: 0,
  });
  let count = 0
  for(let i =0;i<searchResults.items.length && count<=20;i++){
    if(i,searchResults.items[i].type == "video"){
        const duration= (searchResults.items[i].duration).split(":").map(Number)
        if(duration.length==2){
          if(duration[0]<=7){

            SearchData.push({
              id: count,
              title: searchResults.items[i].title,
              artist: searchResults.items[i].author.name,
              audio: searchResults.items[i].url,
              cover: searchResults.items[i].bestThumbnail.url
            })
          
            count++
          }
        }
    }
  }
  
  return SearchData

}

module.exports = search
