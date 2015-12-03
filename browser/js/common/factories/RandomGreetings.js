app.factory('RandomGreetings', function () {

    var getRandomFromArray = function (arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    };

    var greetings = [
        'Lasso your life!',
        'Griddle me this!',
        '\'ello lassie!'
    ];

    return {
        greetings: greetings,
        getRandomGreeting: function () {
            return getRandomFromArray(greetings);
        }
    };

});
