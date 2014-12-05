API-Camel
=========

The term "camel" is derived via Latin and Greek (camelus and kamēlos respectively) from
Hebrew or Phoenician gāmāl. The Hebrew meaning of the word gāmāl is may refer to an
increased ability of service the animal provides when being properly cared for.

API-Camel is your one-stop "camel" for dealing with HTTP feeds and APIs on NodeJS or other
JS environments. It takes the heavy lifting out of your shoulders and encapsulates
endpoints and models in an abstracted and standardized manner.

Installing
----------

As an npm module, feel free to:

    npm install git://github.com/luchiniatwork/api-camel.git#0.1.0

Getting Started
---------------

Let's consider the following API request for NBA's player statistics. It fetches a JSON
response containing the details for the 2013/2014 season for player Solomon Jones from NBA
D-League's BayHawks.

    $ curl http://data.nba.com/data/10s/v2014/json/mobile_teams/dleague/2013/players/playercard_200780_02.json

This request will return something like this:

    {
        "pl": {
            "ca": {...},
            "dob": "1984-07-16",
            "dy": "2006",
            "fn": "Solomon",
            "gls": {...},
            "hcc": "South Florida/USA",
            "ht": "6-10",
            "ln": "Jones",
            "num": "44",
            "pc": "solomon_jones",
            "pid": 200780,
            "pos": "F",
            "ta": "ERI",
            "tc": "Erie",
            "tid": 1612709913,
            "tn": "BayHawks",
            "wt": 245,
            "y": 0
        }
    }

Albeit very thourough and easy-to-use, this response still has a couple of issues worth noticing:

* The node identifiers are not necessarily clear. Solomon's first name is marked as `"fn"` - which
  is acceptable if you understand the context - however, some identifiers are plainly challenging
  such as `"y"`.
* The hierarchy of the nodes is not necessarily how you may want to organize your data as you
  consumer this response.
* There is somewhat of a mix of different concepts here: Solomon's data, as well as some information
  about Solomon's team (BayHawks). I.e. we learn here that BayHawks abbreviation (identified as `"ta"`
  is `"ERI"`). Not the best possible separation of concerns/contexts.
* Last but not least, if you code directly against this response, chances are that the day the NBA
  changes its interface, your whole application will require refactoring. I.e. if you decide to bind
  your UI yo show Solomon's team's abbreviation as `{{res.pl.ta}}`

Wouldn't It Be Great...
-----------------------

... if we could consume this API in a friendly and protected way? Something like this would be perfect:

    var nbaEndpoints = new NBAEndpoints();
    
    nbaEndpoints.getPlayerCard({
      league: 'dleague',
      season: '2013',
      playerID: '200780'
    }).then(function (playerCard) {
      console.log(playerCard.getFirstName());
      console.log(playerCard.getLastName());
    });

Which would yield simply:

    Solomon
    Jones

This is exactly the kind of thing that API-Camel allows you to do in a very controlled manner.

API-Camel's Opinionated Approach
--------------------------------

API-Camel uses a series of principles behind its operational mode:

* Encapsulation: API-Camel is totally tuned towards having as much encapsulation as possible.
  that concept permeates some of the architectural decisions behind it
* Data Models: one of the main encapsulation components is the data model principle. Hiding complexities
  of the API requests and responses behind clearly specified data models is key
* API Endpoints: any single API will have a collection of endpoints for a series of different
  functionalities. API-Camel expects each to be defined and encapsulated accordingly.
* promises: we love promises and have built API-Camel with promises from the ground up. If you are
  not familiar with them, check them out [here](http://www.html5rocks.com/en/tutorials/es6/promises/).

Breaking the Model Down
-----------------------

The first thing we need is to specify how a player model should work for us. Let's accomplish
this by creating a file called `player-card-model.js` and adding the following lines to it:

    var apiCamel = require('api-camel');
    var BaseModel = apiCamel.BaseModel;
    
    var PlayerCardModel = function () {
      BaseModel.call(this);
    };
    
    PlayerCardModel.prototype = new BaseModel();

We are first taking care of requiring API-Camel and getting its `BaseModel` (first and second line).
The constructor function makes sure to call the parent's constructor function and is important
for initialization purposes.

Do not overlook the last line. It specifies that the current class you are creating is a model
object (it inherits from API-Camel's BaseModel).

Next we specify one of the most important components for API-Camel: the model's mapping instructions:

    PlayerCardModel.mapping = [
      'PlayerCardResponse::pl'
    ];

Remember that the highest level of the API response we've seen was a `"pl"` node? What we are doing here
is telling API-Camel that every time there is a player card response, match the `"pl"` identifier to this
mapping and create an instance of our very own player model (`PlayerCardModel`).

The model's mapping is an array. That means that there might be several matches across the API that reuse
the same model we are defining. For instance, let's assume there is a `TeamResponse` that also contains
several player's in it. We would simply use the following and API-Camel would automatically deal with
the multiple matches:

    PlayerCardModel.mapping = [
      'PlayerCardResponse::pl',
      'TeamResponse::pl',
    ];

We now create the getter methods to encapsulate our data model:

    PlayerCardModel.prototype.getFirstName = function() {
      return this.get('fn')
    };
    
    PlayerCardModel.prototype.getLastName = function() {
      return this.get('ln')
    };

Notice that each method is hiding from higher layers the format used at the API level. In this specific
case we are returning whatever was in the identifier `"fn"` of the response as part of the `getFirstName()`
method. The same applies for `"ln"` and `getLastName()`.

Last but not least, we export the class as a Node module:

    module.exports = PlayerCardModel;

Here are all the lines together for our `player-card-model.js`:

    var apiCamel = require('api-camel');
    var BaseModel = apiCamel.BaseModel;
    
    var PlayerCardModel = function () {
      BaseModel.call(this);
    };
    
    PlayerCardModel.prototype = new BaseModel();
    
    PlayerCardModel.mapping = [
      'PlayerCardResponse::pl'
    ];
    PlayerCardModel.prototype.getFirstName = function() {
      return this.get('fn')
    };
    
    PlayerCardModel.prototype.getLastName = function() {
      return this.get('ln')
    };
    
    module.exports = PlayerCardModel;

Specifying the Endpoints
------------------------

Now we need to tell API-Camel how the API works per se. Create a file called `nba-endpoints.js` and
add the following lines to it:

    var apiCamel = require('api-camel');
    var BaseEndpoints = apiCamel.BaseEndpoints;
    
    var PlayerCardModel = require('./player-card-model');
    
    var NBAEndpoints = function () {
      BaseEndpoints.call(this, {
        baseURL: 'http://data.nba.com/data/10s/v2014/json',
        modelList: [
          PlayerCardModel
        ]
      });
    };
    
    NBAEndpoints.prototype = new BaseEndpoints();

First three lines take care of requiring API-Camel and getting the parent implementation for all 
endpoints (`BaseEndpoints`). It also requires the `PlayerCardModel` we wrote before.

On the class' constructor we call the parent's constructor and send an options object that must specify
at least two attributes:

* `baseURL`: this will tell the parent class which base URL to prefix your endpoints later on.
* `modelList`: this is an array that tells the parent class which models should be considered when
  parsing API responses. As you can see above, we specified the `PlayerCardModel` that
  we created before.

New we create a helper method that will take care of the endpoint for getting the player card per se:

    NBAEndpoints.prototype.getPlayerCard = function(options) {
    
      var endpoint = [
        'mobile_teams',
        options.league,
        options.season,
        'players',
        [
          'playercard',
          options.playerID,
          '02'
        ].join('_') + '.json'
      ].join('/');
    
      return this._request({
        endpoint: endpoint,
        namespace: 'PlayerCardResponse'
      });
    };

The `getPlayerCard` method accepts basic parameters for our business requirements here (`options.league`,
`options.season`, and `options.playerID`). These get joined into a string called `endpoint` according to 
NBA's URL format.

The last call is to `BaseEndpoints`' private method `this._request`. This method takes these options in:

* `endpoint` (madatory): the endpoint suffix URL (this will be prefaced by the `baseURL` we specified at 
  the class level)
* `namespace` (mandatory): remember that when we specified the mapping for our model class we had 
  `'PlayerCardResponse::pl'`? The first part of the matching string (before the `::`) is the namespace.
  The namespace is provided here so that the model can be found among all the models we may eventually have.
* `method` (optional): either `'GET'` or `'POST'`

And last but not least, remember to export the class as a Node module:

    module.exports = NBAEndpoints;

Here is the whole content of `nba-endpoints.js`:

    var apiCamel = require('api-camel');
    var BaseEndpoints = apiCamel.BaseEndpoints;
    
    var PlayerCardModel = require('./player-card-model');
    
    var NBAEndpoints = function () {
      BaseEndpoints.call(this, {
        baseURL: 'http://data.nba.com/data/10s/v2014/json',
        modelList: [
          PlayerCardModel
        ]
      });
    };
    
    NBAEndpoints.prototype = new BaseEndpoints();
    
    NBAEndpoints.prototype.getPlayerCard = function(options) {
    
      var endpoint = [
        'mobile_teams',
        options.league,
        options.season,
        'players',
        [
          'playercard',
          options.playerID,
          '02'
        ].join('_') + '.json'
      ].join('/');
    
      return this._request({
        endpoint: endpoint,
        namespace: 'PlayerCardResponse'
      });
    };
    
    module.exports = NBAEndpoints;

Endpoints and Models working together
-------------------------------------

Now that we have our data model `PlayerCardModel` and our endpoint `NBAEndpoints` classes, we can
enjoy the fruits of our work. Simply:

    var NBAEndpoints = require('./nba-endpoints');
    var nbaEndpoints = new NBAEndpoints();
    
    nbaEndpoints.getPlayerCard({
      league: 'dleague',
      season: '2013',
      playerID: '200780'
    }).then(function (playerCard) {
      console.log(playerCard.getFirstName());
      console.log(playerCard.getLastName());
    });

There you go! You require our `NBAEndpoints` class, instantiate it and call the endpoint `getPlayerCard`.

When the promise resolves, you get a `PlayerCardModel` instance (here called `playerCard`). And then you
can do whatever you need to do with your data model.

Advanced Settings
-----------------

For the sake of good architecture, you want to reuse as many data models as
possible. Let's consider the response we get from the API we are coding
througout this tutorial:

    {
        "pl": {
            "ca": {...},
            "dob": "1984-07-16",
            "dy": "2006",
            "fn": "Solomon",
            "gls": {...},
            "hcc": "South Florida/USA",
            "ht": "6-10",
            "ln": "Jones",
            "num": "44",
            "pc": "solomon_jones",
            "pid": 200780,
            "pos": "F",
            "ta": "ERI",
            "tc": "Erie",
            "tid": 1612709913,
            "tn": "BayHawks",
            "wt": 245,
            "y": 0
        }
    }

You'll notice that we have nodes about the player and nodes about the team. We want to break these 

Other Fun Things
----------------


Forking, Extending, Testing
---------------------------

Feel free to fork and extend/fix API-Camel any way you see fit.

If you need to test it, simply run:

    npm test