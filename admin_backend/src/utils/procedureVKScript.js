export const fetchPostsByTime = (ownerId, offset) => `var ITERS = 25;
// количество сообщений получаемых за один запрос
var COUNT = 100;

// стартлайн и дедлайн 


// список полученных постов
var posts = [];     
var req_params = {
        "owner_id" : -${ownerId}, // id страницы
        "offset" : 0,         // смещение
        "count"  : COUNT,
        "v" : "5.34"          // версия API
};
var i = 0;
while(i < ITERS) {
    req_params.offset = i*COUNT + ITERS*COUNT*${offset};
    var response = API.wall.get(req_params);
    
    var items = response.items; 
    var count = response.count;

    if (items.length == 0) {
        return posts;
    }
    

    var ids = items@.id;
    var tmp = {};
    tmp.chunk_size = ids.length;
    tmp.ids = ids;
    tmp.dates = items@.date;
    posts.push(tmp);
    
    i = i + 1;
}
return posts;`;
