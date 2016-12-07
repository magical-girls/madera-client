'use strict';

var categories = [
    {'id' : 1, 'name': 'films'},
    {'id' : 2, 'name': 'musiques'}
];

app.service('categoryProvider', function(){
    this.getCategories = function(){
        return categories;
    }
});