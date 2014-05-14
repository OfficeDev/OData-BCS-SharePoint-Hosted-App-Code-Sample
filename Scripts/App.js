'use strict';

var context;
var lists;
var web;
var serverRelurl;



// This code runs when the DOM is ready and creates a context object which is needed to use the SharePoint object model
$(document).ready(function () {
    context = SP.ClientContext.get_current();
    web = context.get_web();
    getLists();
});

// This function prepares, loads, and then executes a SharePoint query to get the current users information
function getLists() {
    lists = web.get_lists();
    context.load(lists);
    context.load(web);
    context.executeQueryAsync(Function.createDelegate(this, function () { onQuerySucceeded(); }), Function.createDelegate(this, onQueryFailed));
}

function onQuerySucceeded() {
    var listEnumerator = lists.getEnumerator();
    var list;
    $('#message').text('Lists:');
    while (listEnumerator.moveNext()) {
        list = listEnumerator.get_current();
        serverRelurl = web.get_serverRelativeUrl();
        var listUrl = serverRelurl + '/Lists/' + list.get_title();
        $('#message').append('<li><a href="' + listUrl + '">' + list.get_title() + '</a></li>');
        //alert(list.get_title())
    }
}

function onQueryFailed(sender, args) {
    alert('Request failed. ' + args.get_message() +
        '\n' + args.get_stackTrace());
}