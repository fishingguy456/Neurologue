const STATIC_URL = "http://localhost:9000/assets/";
var data = null;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const http = new XMLHttpRequest()

http.open("GET", STATIC_URL + 'data/data_part1.json')
http.send()

http.onload = () => console.log(JSON.parse(http.responseText))
