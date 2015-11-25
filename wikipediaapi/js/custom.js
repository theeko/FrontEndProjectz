$(function(){
    var title = input.val();
    var wapi = 'http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    var callbackpart = '&callback=JSON_CALLBACK';
    var page = 'http://en.wikipedia.org/?curid=';
});