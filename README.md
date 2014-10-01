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

* The node identifiers are not necessarily clear. Solomon's first name is marked as "fn" - which
  is acceptable if you understand the context - however, some identifiers are plainly challenging
  such as "y".
* The hierarchy of the nodes is not necessarily how you may want to organize your data as you
  consumer this response.
* There is somewhat of a mix of different concepts here: Solomon's data, as well as some information
  about Solomon's team (BayHawks). I.e. we learn here that BayHawks abbreviation (identified as "ta"
  is "ERI"). Not the best possible separation of concerns/contexts.
* Last but not least, if you code directly against this response, chances are that the day the NBA
  changes its interface, your whole application will require refactoring. I.e. if you decide to bind
  your UI yo show Solomon's team's abbreviation as {{res.pl.ta}}

Breaking the Models Down
-------

The first thing you need is to specify how a player model should work for you. Let's accomplish
that by creating a file called `player-card-model.js`. Add the following lines to it:

    var apiCamel = require('api-camel');
    var BaseModel = apiCamel.BaseModel;
    
    PlayerCardModel.prototype = new BaseModel();
        
    var PlayerCardModel = function () {
      BaseModel.call(this);
    };

The first line takes care of requiring API-Camel. The second and third lines will make sure you
are requiring and specifying that the current model you are creating is a model object (it inherits
from API-Camel's BaseModel).

The constructor function makes sure to call the parent's constructor function and is important
for initialization purposes.

Next we specify one of the most important components for API-Camel: the model's mapping instructions:

    PlayerCardModel.mapping = [
      'PlayerCardResponse::pl'
    ];



Testing
-------

    npm test