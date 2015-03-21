"use strict";
/* global $ */

var NOT_RESET = 0;
var btnChoose, btnReset, btnHide, btnRedo;

/////////////////////////////////////////////
//          Manage Alien Lists             //
/////////////////////////////////////////////
var DATA = (function() {
  //Lists of names for generator
  var pool = [], excluded = [], current = [], given = [], restricted = [];

  //Full list
  var names = [], byName = {};

  return {
    //init alien details
    init: function(list) {
      list.forEach(function(alien) {
        names.push(alien.name);
        byName[alien.name] = alien;
      });
      names.sort();
    },
    //Get all alien names
    getNames: function() { return names ? names.slice(0) : []; },
    //Get alien details
    getByName: function(name) { return byName[name]; },

    //Exclude given names from pool
    exclude: function(names) { excluded = names.slice(0).sort(); },
    //Get list of names excluded from pool
    getExcludedNames: function() { return excluded.slice(0); },

    //Get list of aliens that have been used so far
    getGivenNames: function() { return given.slice(0); },

    //Get currently selected
    getSelectedNames: function() { return current.slice(0); },
    //Select an additional alien
    select: function(avoidConflicts) {
      //Select name (return if wasn't able to select
      var choice = Math.floor(Math.random() * pool.length);
      if(!pool[choice]) return;
      var name = pool.splice(choice, 1)[0];
      current.push(name);
      current.sort();

      //If current choice has any restrictions, remove them from pool as well
      var alien = byName[name];
      if(avoidConflicts && alien.restriction) {
        var restrictions = alien.restriction.split(',');
        for(var j = 0; j < restrictions.length; j++) {
          var index = pool.indexOf(restrictions[j]);
          if(index > -1) { restricted.push(pool.splice(index, 1)[0]); }
        }
      }
      //Return select name
      return name;
    },
    //Return current selection to pool
    undo: function() {
      pool = pool.concat(current, restricted);
      pool.sort();
      current = []; restricted = [];
    },
    //Make current selection permanent
    next: function() {
      given = given.concat(current, restricted).sort();
      restricted = []; current = [];
    },

    //Get number of aliens given out so far
    getOutOfPoolSize: function() { return current.length + given.length + restricted.length; },
    //Get number of aliens still available
    getPoolSize: function() { return pool.length; },
    //Initialize pool based on settings and clear out selections
    reset: function(opts) {
      pool = names.filter(function(name) {
        var e = byName[name];
        return opts.isComplexity(e.level) && opts.isGame(e.game) && excluded.indexOf(e.name) <= 0 && (opts.getSetupAllowed() === 0 || e.setup === undefined || (opts.getSetupAllowed() === 1 && e.setup !== "color"));
      });

      given = [];
      current = [];
      restricted = [];
    }
  };
})();

/////////////////////////////////////////////
//               Settings                  //
/////////////////////////////////////////////
var SETTINGS = (function(manager) {
  var getEl = document.getElementById;
  var STORAGE = window.localStorage;
  var nNumber = getEl("choose");

  var complexities = [true, true, true], levels = ["Green", "Yellow", "Red"];
  var games = { E: true };
  var conflicts = true;
  var numToGive = 2;
  var setup = 0;//0: remove none, 1: remove extra color, 2: remove all

  var save = function(key, value) {
    if(!STORAGE) return;
    if(typeof value !== "string") value = JSON.stringify(value);
    STORAGE.setItem(key, value);
  };

  return {
    //Load settings from localStorage
    //Triggers game setup click to select correction radio button and init generator
    load: function() {
      if(STORAGE) {
        try {
          var load = JSON.parse(STORAGE.games);
          if(load) {
            games = load;
            Object.keys(games).forEach(function(e) { getEl("game" + e).checked = games[e]; });
          }

          load = JSON.parse(STORAGE.levels);
          if(load) {
            complexities = load;
            levels.forEach(function(level, i) { getEl(level).checked = complexities[i]; });
          }

          load = STORAGE.choose;
          if(load) {
            numToGive = load;
            getEl("choose").value = numToGive;
          }

          load = STORAGE.preventConflict;
          if(load !== undefined && load !== null) {
            conflicts = load == "true";
            getEl("preventConflict").checked = conflicts;
          }

          load = JSON.parse(STORAGE.exclude);
          if(load) manager.exclude(load);

          load = STORAGE.setup;
          if(load) {
            setup = parseInt(load, 10);
            $("#setup" + setup).trigger("click");
          }
        } catch(ex) {
          STORAGE.clear();
          OUTPUT.message("Could not load settings. Resetting to defaults.");
        }
      }
    },
    //Save which aliens are excluded
    exclude: function(names) { save("exclude", names); },
    //Return whether is included
    isGame: function(game) { return games[game]; },
    //Set whether game is included
    setGame: function(game, enabled){ games[game] = enabled; save("games", games); },
    //Return whether alien level is allowed
    isComplexity: function(level) { return complexities[level]; },
    //Set whether alien level is allowed
    setComplexity: function(color, enabled) {
      complexities[levels.indexOf(color)] = enabled;
      save("levels", complexities);
    },
    //Whether or not conflicts should be avoided
    restrictConflicts: function(trueOrFalse) {
      if(trueOrFalse !== undefined) {
        conflicts = trueOrFalse;
        save("preventConflict", conflicts);
      }
      return conflicts;
    },
    //Set what level of game setup is allowed to be given out
    setSetupAllowed: function(level) { setup = level; save("setup", setup); },
    //Return level of game setup aliens allowed
    getSetupAllowed: function() { return setup; },
    //Return how many aliens to give out at once
    howManyToGive: function() { return numToGive; },
    //Keep choose # within 1 and max. Run when resetting alien list (# might have changed) and changing # to pick
    resetHowManyToSelect: function(num) {
      if(num) numToGive = num;
      var max = manager.getPoolSize();
      if(max > 0 && numToGive > max) numToGive = max;
      if(numToGive < 1) numToGive = 1;

      //Set new value, and disable choose button if not enough left
      save("choose", numToGive);
      nNumber.value = numToGive;
      setState(undefined, max < numToGive, undefined, undefined, undefined);
      return numToGive;
    }

  };
})(DATA);

function setState(showOrHide, disablePick, disableShowHide, disableRedo, disableReset) {
  var undef;
  if(showOrHide !== undef) btnHide.textContent = showOrHide ? "Show" : "Hide";
  if(disableShowHide !== undef) btnHide.disabled = disableShowHide;
  if(disablePick !== undef) btnChoose.disabled = disablePick;
  if(disableRedo !== undef) btnRedo.disabled = disableRedo;
  if(disableReset !== undef) btnReset.disabled = disableReset;
}

//Determine list of possible choices based on selected options
function resetGenerator() {
  console.log("Reset");
  //Create POOL from aliens that match level and game and are not excluded, and clear other lists
  DATA.reset(SETTINGS);

  setState(false, true, true, true, true);//Nothing given yet, so no Hide/Reset/Redo
  SETTINGS.resetHowManyToSelect();//Make sure it's within new limit

  //Write status
  OUTPUT.message("List reset.");
  OUTPUT.status();
}

/////////////////////////////////////////////
//            Manage Output                //
/////////////////////////////////////////////
var OUTPUT = (function(manager) {
  var nOutput = document.getElementById("output");
  var nStats = document.getElementById("numbers");

  var levelToClassMapping = { 2: "danger", 1: "warning", 0: "success" };

  //Make a panel for an alien
  function makePanel(alien) {
    var level = levelToClassMapping[alien.level];
    return '<div class="panel panel-' + level + '"><div class="panel-heading">' + alien.name + ' ' + createLabels(alien) + '<span class="clearfix"></span></div><div class="panel-body"><a href="#" class="pull-right btn btn-sm btn-' + level + '">+</a>' + alien.power + '</div><div class="panel-footer" style="display:none;">' + alien.description + '</div></div>';
  }

  function createLabels(alien) {
    var level = levelToClassMapping[alien.level];
    var stars = ' <span class="pull-right label label-' + level + '">';
    for(var i = 0; i <= alien.level; i++) { stars += '★'; }
    stars += '</span>';
    var warning = alien.setup || alien.restriction ? '<span class="pull-right label label-' + level + '">!</span>' : "";
    return '<span class="pull-right label label-' + level + '">C' + alien.game.slice(0, 1) + '</span>' + stars + warning;
  }

  return {
    //Write message in output area
    message: function(text) { NOT_RESET = 0; nOutput.innerHTML = '<div class="col-sm-offset-1 col-md-offset-2 col-sm-10 col-md-8">' + text + '</div>'; },
    //Write aliens to page
    aliens: function(names, message) {
      var aliens = names.map(manager.getByName);
      var mid = Math.ceil(aliens.length / 2);
      var output = '';
      if(message) output += '<p class="col-sm-offset-1 col-md-offset-2 col-sm-10 col-md-8">' + message + '</p></div><div class="row">';
      output += '<div class="col-sm-offset-1 col-md-offset-2 col-sm-5 col-md-4">' + aliens.slice(0, mid).map(function(e) { return makePanel(e); }).join("") + '</div>';
      output += '<div class="col-sm-5 col-md-4">' + aliens.slice(mid).map(function(e) { return makePanel(e); }).join("") + '</div>';
      nOutput.innerHTML = output;
      NOT_RESET = 0;
    },

    //Write status above buttons and beneath # to choose box
    status: function() {
      var allGiven = manager.getOutOfPoolSize();
      nStats.textContent = allGiven + ' of ' + (allGiven + manager.getPoolSize()) + ' aliens picked.';
    },
    excludeOption: function(item) {
      if(!item.id) { return item.text; }
      var name = item.text;
      return $(createLabels(manager.getByName(name)) + '<span class="alien-name">' + name + '</span>');
    }
  };
})(DATA);

//onload
$(function() {

  //Keep number to choose within amount of aliens left
  $("#choose").on("change", function() { SETTINGS.resetHowManyToSelect(this.value); })[0];

  //Changing check box resets alien list
  $("#Complexities").on("click", "input", function() { SETTINGS.setComplexity(this.id, this.checked); resetGenerator(); });
  $("#Games").on("click", "input", function() { SETTINGS.setGame(this.id[4], this.checked); resetGenerator(); });
  $("input[type=radio][name=excludeSetup]").on("change", function() { SETTINGS.setSetupAllowed(parseInt(this.value, 10)); resetGenerator(); });

  //Changing conflict option saves state, but does not reset
  $("#preventConflict").on("click", function() { SETTINGS.restrictConflicts(this.checked); });

  //Button to reset alien list
  btnReset = $("#reset").on("click", function() {
    if(confirm("Reset list of aliens?")) resetGenerator();
    else NOT_RESET++;

    if(NOT_RESET > 2) {
      DATA.next();
      OUTPUT.aliens(DATA.getGivenNames(), "Aliens given out so far:");
      setState(false, undefined, false, true, undefined);//Allow hide, disable redo
    }
  })[0];

  btnHide = $("#hide").on("click", function() {
    var current = DATA.getSelectedNames();

    //Hide choices
    if(btnHide.textContent === "Hide") {
      //Only offer Show if hiding current pick, not hiding full list. Disable redo while hidden
      setState(current.length, undefined, !current.length, true, undefined);
      OUTPUT.message("Choices hidden.");
      return;
    }

    //Ask for initial of one of the aliens before reshowing them
    var initials = current.map(function(e) { return e[0].toLowerCase(); });
    if(initials.indexOf((prompt("Enter the first initial of one of the aliens you were given, then click OK.") || "").toLowerCase()) < 0) {
      OUTPUT.message("Wrong letter.");
      return;
    }

    //If passed, then show aliens and switch buttons
    OUTPUT.aliens(current);
    setState(false, undefined, undefined, false, undefined);//Let user hide, and enable redo
  })[0];

  btnChoose = $("#newAliens").on("click", function() {
    DATA.next();

    //Pick aliens randomly
    var howManyToChoose = SETTINGS.howManyToGive();
    for(var i = 0; i < howManyToChoose; i++) {
      var name = DATA.select(SETTINGS.restrictConflicts());
      if(!name) break;
    }

    var selected = DATA.getSelectedNames();
    if(selected.length < howManyToChoose) {
      DATA.undo();
      OUTPUT.message("Not enough potential aliens left." + (SETTINGS.restrictConflicts() ? " It's possible that the \"Prevent conflicts\" option is preventing me from displaying remaining aliens." : ""));
      setState(undefined, true, true, undefined, undefined);//Can't pick and can't hide
      return;
    }

    //Update status
    OUTPUT.status();
    OUTPUT.aliens(selected);

    //Enable redo & hide, disable pick if necessary
    setState(false, undefined, false, false, false);
    SETTINGS.resetHowManyToSelect();

    return;
  })[0];

  btnRedo = $("#redo").on("click", function() {
    if(confirm("Redo?")) {
      DATA.undo();
      $(btnChoose).trigger("click");
    }
  })[0];

  //Click button in alien to show long description
  $("#output").on("click", "a", function(e) {
    var $this = $(this);
    $this.text($this.text() === "+" ? "-" : "+").parent().next().toggle();
    e.preventDefault();
    return false;
  });

  //init
  $.getJSON("data/aliens.json").done(function(data) {
    DATA.init(data);
    SETTINGS.load();
    //Make list of aliens to EXCLUDE from POOL and init select2
    $("#exclude").append(DATA.getNames().map(function(e) { return new Option(e, e); })).val(DATA.getExcludedNames()).on("change", function() {
      var toExclude = $(this).val() || [];
      DATA.exclude(toExclude);
      SETTINGS.exclude(toExclude);
      resetGenerator();
    }).select2({
      placeholder: "None selected",
      templateResult: OUTPUT.excludeOption
    });
    
    resetGenerator();
  }).fail(function() { OUTPUT.message("Unable to load data. Refresh to try again."); });

});