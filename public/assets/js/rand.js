var DELAY = 30; // default delay time
var AUDIO_TICK = new Audio("assets/audio/pick_1.mp3");
var AUDIO_FINISH = new Audio("assets/audio/kids-hooray.mp3");

var INDEX_START = 0;
var STATUS = "START";

function start(qty, btn) {
  _hideElement(btn);
  loop(qty);
}

function stop(qty, btn) {
  STATUS = "STOP";
  _hideElement(btn, qty);
}

function getMultipleRandom(arr, num) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}

function loop(qty) {
  delay = DELAY;
  // if (INDEX_START > LOOP_TIMES - LAST_ITEM) {
  // 	delay = DELAY * DELAY_MULTIPLIER;
  // 	DELAY_MULTIPLIER++;
  // }
  // console.log("delay", delay);
  setTimeout(function () {
    for (let i = 0; i < qty; i++) {
      var picked = NAMES[Math.floor(Math.random() * NAMES.length)];
      // console.log(picked);
      _setName(picked, [i]);
    }
    // INDEX_START++;
    if (STATUS != "STOP") {
      loop(qty);
    } else {
      var result = getMultipleRandom(NAMES, qty);
      console.log(result);
      for (let i = 0; i < result.length; i++) {
        _setName(result[i], [i]);
      }
      AUDIO_FINISH.play();
    }
  }, delay);
}

function _setName(name, id) {
  var targetDomm = document.getElementById("drawId" + id);
  targetDomm.value = name.id;
  var targetDom = document.getElementById("draw" + id);
  targetDom.innerHTML = name.name;
  //   $("#draw" + id).val(name);
}

function _hideElement(btn, qty) {
  if (btn === "start") {
    var el = document.getElementById(btn);
    el.classList.add("hidden");
    var al = document.getElementById("stop");
    // el.style.display = "none";
    al.classList.remove("hidden");
  } else {
    var el = document.getElementById(btn);
    el.classList.add("hidden");
    var al = document.getElementById("finish");
    al.classList.remove("hidden");
    for (let i = 0; i < qty; i++) {
      var x = document.getElementById("btn-x" + [i]);
      x.classList.remove("hidden");
    }
  }
}

function coret(elm) {
  var el = document.getElementById("draw" + elm);
  el.classList.add("coret");
  document.getElementById("drawId" + elm).setAttribute("name", "skip[]");
}
