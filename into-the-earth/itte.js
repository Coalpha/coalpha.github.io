function cl() { if (cmode) return '#D23C1E'; return '#000000'; }
var c = document.body.appendChild(document.createElement('canvas')),
  cmode = false,
  swi = 1,
  ctx = c.getContext('2d'),
  p = {
    bow: false,
    tries: 0,
    x: 1,
    y: 1,
    health: 50,
    currentFloor: 1,
    objectOn: '.',
    inven: [],
    equip: {
      Prim: null,
      Sec: null,
      Head: null,
      Rorso: null,
      Legs: null,
      Feet: null,
    },
    color: '#D92323',
    stats: {
      attack: 1,
      defense: 1,
    },
    maxHealth: 1000,
  },
  chestLoot = {
    trapped() {
      health -= 2;
      for (i = 0; i < 10; i++) {
        p.inven.push('Cursed Item');
      }
    },
    bad: ['$'],
    good: ['Food'],
    great: ['Wand', 'Bow', 'Potion'],
  },
  objson = [],
  floors = [
    [
      '                                            ',
      ' Θ.......................................Θ    ',
      ' .........................................    ',
      ' ...........%...%..%%%%..%....%...........    ',
      ' ............%.%..%....%.%....%...........    ',
      ' .............%...%....%.%....%...........    ',
      ' .............%...%....%.%....%...........    ',
      ' .............%....%%%%...%%%%............    ',
      ' .........................................    ',
      ' ...............¡....?....¡...............    ',
      ' ............?.&...........&.?............    ',
      ' ..............&/P...@...P/&..............    ',
      ' ............?.&...........&.?............    ',
      ' ...............8....v....8...............    ',
      ' .........................................    ',
      ' ............$.....$..$..$...$............    ',
      ' ............$.....$..$..$$..$............    ',
      ' ............$.....$..$..$.$.$............    ',
      ' .............$.$.$...$..$..$$............    ',
      ' ..............$.$....$..$...$............    ',
      ' .........................................    ',
      ' Θ.......................................Θ    ',
      '                                            ',
    ],
    [
      '       O0o0oO0ooOo0o0Oo          ',
      '   0oOo0o0Oo0oO0o0oO0oOO0oO:     ',
      ' oO0............$.........0O:    ',
      ' 0.......!...............¢..oO:          ',
      '0O........¢...........ǃ.......0oOooO0o   ',
      'o~.............@v??...........XXXXXXX^o',
      '0~~~..!.........i.....B....!..00OoOo00" ',
      'O&%~~.....R..................oO  ',
      ' o~~~.......¢............¢."O:   ',
      '  0O~...........".........0o.0:   ',
      '   :oo0Oo0oO0o0oXo0oo0oOoOo?BoO:   ',
      '   :   O0O0oo0oO0oO0ooOO?.C.b?o0: ',
      '   :   Oo......S.S..$.o0oO.a.b10: ',
      '   :  0O¢.....`.,.`...|||a..C.Oo: ',
      '   :   0o......a......ooo8.a8Oo:  ',
      '   :    0oOo.....0oOOo00OO00oo:   ',
      '   :      Oo0O.&o%0oo0o!::::::   ',
      '   ::::::::::ooOOOo0              ',
    ],
    [
      '##########                       ############',
      '#8G`..1..+***        ##########  #...R....$`#',
      '#333333..#  ****     #.$......+**+......."..#',
      '#&C`.....# **  ******-,...!...#  #########X##',
      '#`b.....%##+## *     #.......!#  #.,.,#.a..%#',
      '########++~~~# *     #####X.+##  #,.‚.#.%..a#',
      '#..#.....#~^~# *          * *    #.,.,#,##|##',
      '##,,..1..##### *          * *    #..,.#.,...#',
      '#v$#@.%..+|******************    #...,#,.,..#',
      '#.,#.....#:   *        *         #.R..#.,.,.#',
      '##0####### :  *        *  ########....+,.,.,#',
      ' #X&,¡$P#   : ************|$/|.|.|..`.#.,.,.#',
      ' #X######    :*        *  #######..abG#..,.,#',
      '  *       ******|$$$$$X*        #############',
      '  *********',
    ],
    [
      '######   ################        ',
      '#=@..#  *+.......$.....!#        ',
      '#v...+ * #`.$....,....$.#        ',
      '##### *1*#``..###+##.B..#   #####',
      '       * #&``.#  * #....+***+.¡.#',
      ' ##### * ###### ** ######   #.G.#',
      ' #%$~#* *#....# |  #.``&+***+..a#',
      ' #~%~+   +...G# *  #..``#   ##X##',
      ' #####:  #X...##+###.$.`#     X  ',
      '    #=####XXa...,.......# #####X ',
      '    #%%%%XXXXa.......$..+ #%%%+ ',
      '    #####################:#####: ',
      '                          :::::   ',
    ],
    [
      '           :: ',
      '##########l# :',
      '#@0#=,.0,RR#: ',
      '#0.#.,..0..# : ',
      '#0.|#.$.0,D#: ',
      '#,.0.##,0.##: ',
      '#..#,#.....X#v',
      '###########:! ',
    ],
    [
      '######         #####',
      '#¡%$%$      :  #..^#',
      '#.@^=D   (**"**+..=#',
      '#¡%$%$:::   !  #..v#',
      '######         #####',
    ],
    [
      '  ##################***||************########',
      '  #&&GX^.@..b&X.`C/#.###|###  *     *#.."D".#',
      '  #~~~~~~~~~~~~~~~~#.#Cabg$###|### * #..."..#',
      '  #..".............#.#&&...XXX...#*  #......#',
      '  #......GS....#####.###|#####...#:* #......#',
      '###,,..........#...#.#  *  #8%$%1#: *+.PG&E.#',
      '#(#P,...".ab...+...+.X|**  #88.11#:  #######',
      '#"###############:#### ::######::',
      '#%%%%%%%%v         : ::: : :::::::',
      '##########::::::::: :   : :',
    ],
    [
      '              ::::::::: ::',
      '#############:#########:  ::::::::::::::::::::::###########',
      '#?Ca...!....@#Θ+...+..+***         #############..R..!..$`#',
      '#CCb..!B###!###..+.!...#  R***     #.$....&.+..+....Θ.."..#',
      '#abb###...|.|.+&+..+.+.# **  R*****-,...!...############X##',
      '#####v#########...+...%##+## *  :  #..B....!#  #.,1,#.a..%#',
      '  ###,################+|~~R# *  :  ######+##   #,.‚.#.%..a#',
      '  #+|,|#      #CC#B!...#%!&#!*  :      * * *   #&,.,#,##|##',
      '  #&0,0|      ##,,....R##### *  :     * * *R*  #..,.#.,.!1#',
      '  ###|##:     #?$#..%.X.+***|******C * *!* * * #.".,#,.,!.#',
      '        :     #..#!...&#:   *       * * * * * *#.!..#"ǃ.,.#',
      '       ::     #.0#######:   X   | | | * #########B."+".,B,#',
      '       :      #X&,¡$P#:    * * * * * * !|$/|.|.|..`"#!!.,.#',
      '        : :::"#X#####:     *  | | | X   ######%!.abG#..,.,#',
      '         :    :#*#     ***X**|**$$*X:::::::::#############:',
      '         R!!!!#X#*******                      :::::::::::::',
    ],
    [
      '#############',
      '#@........3.#',
      '#.........3.#',
      '#....C....3.#',
      '#...b&b...3.#',
      '#....C....3.#',
      '#.........3.#',
      '#........=3Θ#',
      "############'",
    ],
  ],
  floor,
  original = [],
  behavior = {
    ',': function (x, y) {
      var rand = Math.random() * 16 / p.stats.defense;
      p.health -= rand;
      floor[y][x] = '.';
      message(`A trap injures you for ${Math.round(rand)} damage.`, '#f00');
      return true;
    },
    undefined: noMove('The abyss'),
    '.': canMove,
    '#': noMove('A wall'),
    '*': canMove,
    '^': canMove,
    '+': function (x, y) {
      var hi = Math.floor((Math.random() * 2) + 1);
      hi === 1 ? message('Wham! You kick down the door', '#FF5733', '') : message('The door opens.', '#FF5733', '');
      floor[y][x] = '-';
    },
    '-': canMove,
    v: canMove,
    '¡': function (x, y) {
      push(new Potion(Math.round(Math.random())));
      floor[y][x] = '.';
      return true;
    },
    '/': function (x, y) {
      push('raft');
      floor[y][x] = '.';
      return true;
    },
    '"': function (x, y) {
      var gold = p.inven.gold;
      var i;
      if (p.inven.length) {
        while (p.inven.length) {
          i = p.inven.pop();
          if (cmode) {} else { message(`That\'s a nice ${i.name || i}... would be a shame if someone stole it`, getRandomColor(), 'fr-FR'); }
        }
        if (!cmode) { message("Welp. Now you're broke!", '#E8FFBC', 'fr-FR'); }
      } else if (cmode) { message('A broker ran off with your stuff', '#900C3F'); } else {
        message("Wait a minuite, you're already broke!", '#fff', 'fr-FR');
        p.inven.gold > 0 && (message('Oh... you have gold...', '', 'fr-FR'), p.inven.gold = 0, message('And now ya don\'t', '', 'fr-FR'));
      }
      floor[y][x] = '#';
      p.inven.gold = gold;
      return true;
    },
    '~': function () {
      if (p.inven.includes('raft')) return true;
      return !cmode ? message("You don't have a raft", '#00c') : 0;
    },
    0(x, y, vx, vy) {
      if (vx && vy) return noMove('A boulder')();
      floor[y][x] = '.';
      x += vx;
      y += vy;
      switch (floor[y][x]) {
        case ',':
          floor[y][x] = '.';
          return true;
        case '.':
          floor[y][x] = '0';
          return true;
        default:
          floor[y - vy][x - vx] = '0';
          noMove('A boulder')();
      }
    },
    O: noMove('A Bush'),
    o: noMove('A shrub'),
    '|': canMove,
    $(x, y) {
      p.inven.gold++;
      floor[y][x] = '.';
      return true;
    },
    '&': function (x, y) {
      push('key');
      floor[y][x] = '.';
      return true;
    },
    X(x, y) {
      var idx = p.inven.indexOf('key');
      if (~idx) {
        p.inven.splice(idx, 1);
        floor[y][x] = '-';
      } else if (!cmode) { message("You don't have any keys.", '#DD2'); }
    },
    '!': function (x, y) {
      p.health -= 20;
      floor[y][x] = '.';
      return true;
    },
    '%': function (x, y) {
      p.health = Math.min(p.health + Math.random() * 6 + 1, p.maxHealth);
      floor[y][x] = '.';
      return true;
    },
    '¢': function (x, y) {
      // console.log(use);
      if (!use) return true;
      for (var s of sellers) {
        if (s.x === x && s.y === y && s.floor === p.currentFloor) {
          play = false;
          sell = true;
          seller = s;
          ware = 0;
          return true;
        }
      }
      return false;
    },
    D(x, y) {
      var idx = p.inven.indexOf('portal');
      if (~idx) {
        p.inven.splice(idx, 1);
        floor[y][x] = ')';
      }
      return true;
    },
    R(x, y) {
      var mlg = new SpeechSynthesisUtterance("You're bad at this game. Seriously, you really suck. I can't believe you fell for that! You totally deserved that! My rock full copter goes: RICK ROLLED! GET WRECKED SCRUB");
      mlg.lang = 'en-UK';
      window.speechSynthesis.speak(mlg);
      window.location = 'https://rick.amigocraft.net/';
      return true;
    },
    ǃ(x, y) {
      var idx = p.inven.indexOf('key');
      var mlg = new SpeechSynthesisUtterance('Wait, what the hell?');
      mlg.lang = 'en-US';
      window.speechSynthesis.speak(mlg);
      if (~idx) {
        p.inven.splice(idx, 1);
        p.inven.push('portal', 'key', new Bow(10, 10), "Hey, how'd you figure that one out?");
        p.health += 5;
        floor[y][x] = 'v';
      }
      return true;
    },
    3: noMove('A swamp'),
    ')': function (x, y) {
      if (!use) return true;
      for (var i in floor) {
        for (var j in floor[i]) {
          if (floor[i][j] == ' (') {
            floor[y][x] = ')';
            p.objectOn = '(';
            p.x = +j;
            p.y = +i;
            update();
            return false;
          }
        }
      }
      return true;
    },
    '(': function (x, y) {
      if (!use) return true;
      for (var i in floor) {
        for (var j in floor[i]) {
          if (floor[i][j] == ')') {
            floor[y][x] = ' (';
            p.objectOn = ')';
            p.x = +j;
            p.y = +i;
            floor[p.y][p.x] = '@';
            update();
            return false;
          }
        }
      }
      return true;
    },
    P(x, y) {
      push('portal ');
      floor[y][x] = '.';
      return true;
    },
    8(x, y) {
      p.stats.defense++;
      if (!cmode) { message('Your skin hardens.', '#EEC900'); }
      floor[y][x] = '.';
      return true;
    },
    1(x, y) {
      p.stats.attack++;
      if (!cmode) { message('You feel empowered.', '#EEC900'); }
      floor[y][x] = '.';
      return true;
    },
    '?': function (x, y) {
      if (Math.random() > 0.5) {
        p.stats.defense++;
        if (!cmode) { message('Your skin hardens.', '#EEC900'); }
      } else {
        p.stats.attack++;
        if (!cmode) { message('You feel empowered.', '#EEC900'); }
      }
      floor[y][x] = '.';
      p.health += 3;
      return true;
    },
    i(x, y) {
      p.bow = true;
      push(new Bow(Math.floor(p.stats.attack * 2 / p.stats.defense)));
      floor[y][x] = '.';
      return true;
    },
    ' ': noMove('The abyss'),
    l(x, y) {
      push(new Item('Prim', `+${Math.ceil(Math.random() * p.stats.attack)} to attack`), 'Magic Sword');
      floor[y][x] = '.';
      return true;
    },
    "'": function () {
      objson[p.currentFloor] = p.objectOn;
      floors[p.currentFloor] = floor;
      p.objectOn = objson[p.currentFloor = 0] || '.';
      return init();
    },
  },
  effects = ['healing', 'damage'],
  play = true,
  use = false,
  $ellers = [{
    floor: 1,
    x: 10,
    y: 4,
    wares: {
      key1: 5,
    },
  }, {
    floor: 1,
    x: 8,
    y: 13,
    wares: {
      key1: 3,
      portal1: 15,
    },
  }, {
    floor: 1,
    x: 12,
    y: 8,
    wares: {
      key1: 2,
    },
  }, {
    floor: 1,
    x: 25,
    y: 8,
    wares: {
      key1: 3,
    },
  }, {
    floor: 1,
    x: 25,
    y: 3,
    wares: {
      key1: 2,
    },
  }, {
    floor: 2,
    x: 8,
    y: 6,
    wares: {
      key1: 3,
      key2: 3,
      key3: 4,
    },
  },
  ],
  seller = null,
  sellers = [],
  ware,
  buy = false,
  defEnemies = {
    // Feather Wasp
    '`': {
      health: 1,
      move: 1,
      damage: 1,
      name: 'Feather Wasp',
    },
    // Goblin
    G: {
      health: 3,
      move: 0.9,
      damage: 1,
      name: 'Goblin',
    },
    // Bulk
    b: {
      health: 5,
      move: 0.4,
      damage: 2,
      name: 'Bulk',
    },
    // Archer
    a: {
      health: 1,
      shoot: true,
      move: 0.2,
      damage: 2,
      name: 'Archer',
    },
    // Snake
    S: {
      health: 3,
      move: 1,
      damage: 1,
      name: 'Snake',
    },
    // Le chat
    C: {
      health: 9,
      move: 1,
      damage: 6,
      name: 'Cat',
    },
    B: {
      health: 0.1,
      move: 1,
      name: 'Bonk',
      damage: 30,
    },
    Θ: {
      health: 4,
      name: 'Necromancer',
      act() {
        if (this.health <= 0) return this.objectOn = '%';
        if (Math.abs(this.x - p.x) < 2 && Math.abs(this.y - p.y) < 2) {
          var dam = Math.round(4 / Math.sqrt(p.stats.defense) / 2);
          p.health = Math.max(0, p.health - dam);
          if (!cmode) { message(`The ${this.name} hits! Minus ${dam} health.`, '#f00', '', 1); }
        } else if (Math.random() < 0.15) {
          for (var spots = [], i = -1; i < 2; i++) {
            for (var j = -1; j < 2; j++) {
              if ('.*-3'.includes(floor[i + this.y][j + this.x])) {
                spots.push({
                  x: j + this.x,
                  y: i + this.y,
                });
              }
            }
          }
          if (spots.length) {
            spots = spots[Math.floor(Math.random() * spots.length)];
            spots.objectOn = floor[spots.y][spots.x];
            var r = Math.random() * 10;
            floor[spots.y][spots.x] = spots.t = r > 5 ? 'Θ' : r > 1.5 ? 'S' : r > 0.2 ? 'G' : 'R';
            enemies.push(new Enemy(spots));
          }
        }
      },
    },
  },
  enemies = [],
  select = 0,
  log = [],
  floortxt = [
    'You win! Feel free to keep playing.\nOr you can close the tab and do someting productive. Or leave the tab open for five minuites. Special features!',
    'Press h for help and m to enable messages',
    'Protip: ! is bad and % is good, avoid moving things',
    'Decisions, desicions',
    'Hint: Things are not as they seem. You might as well try everything.',
    '¡ and $ are good',
    'Have fun!',
    'Deja vu? Nope? Well then, welcome to the land of death by poison.',
    'Welcome to the box.',
  ],
  inItem = false,
  select2 = 0;
ctx.font = 'bold 25px Anonymous Pro';
for (var i in floors) {
  original.push([]);
  for (var j in floors[i]) original[i][j] = floors[i][j] = floors[i][j].split('');
}
function resetSellers() {
  for (var i in $ellers) {
    sellers.push({});
    for (var j in $ellers[i]) {
      if (typeof $ellers[i][j] === 'object') {
        sellers[i][j] = {};
        for (var k in $ellers[i][j]) { sellers[i][j][k] = $ellers[i][j][k]; }
      } else {
        sellers[i][j] = $ellers[i][j];
      }
      floors[$ellers[i].floor][$ellers[i].y][$ellers[i].x] = '¢';
    }
  }
}
resetSellers();
function pathClear(x1, y1, x2, y2) {
  var txt = 'X+(D)|#oO0',
    m = [],
    i,
    j,
    slope,
    range,
    X = x2 > x1 ? x2 : x1,
    Y = y2 > y1 ? y2 : y1,
    x = x2 > x1 ? x1 : x2,
    y = y2 > y1 ? y1 : y2;
  for (j = y; j <= Y; j++) {
    m.push([]);
    for (i = x; i <= X; i++) {
      m[j - y][i - x] = floor[j][i];
    }
  }
  if (!m[0].includes('@'))m.reverse();
  if (m[0][0] != '@') for (var i in m)m[i].reverse();
  if (m.length < m[0].length) {
    var M = [];
    for (i in m[0])M.push([]);
    for (i in m) for (j in m[i])M[j][i] = m[i][j];
    m = Object.assign([], M);
  }
  slope = m[0].length / m.length;
  x = 0;
  for (i in m) {
    if (txt.includes(m[i][x])) return false;
    if (Math.floor((i + 1) * slope) > Math.floor(i * slope)) {
      x++;
      if (((i + 1) * slope) % 1 > 0) {
        if (txt.includes(m[i][x])) return false;
      }
    }
  }
  return true;
}
function Item(place, e, n) {
  this.effect = e;
  this.place = place;
  if (place === 'Prim' || place === 'Sec') {
    this.weapon = true;
    this.op = {
      Equip: (_) => {
        if (p.equip[this.place]) return;
        p.equip[this.place] = this;
        if (this.effect) {
          var tmp = parseEffect(this.effect);
          p.stats[tmp.to] += tmp.mod;
        }
      },
      Dequip: (_) => {
        if (p.equip[this.place] !== this) return;
        p.equip[this.place] = null;
        if (this.effect) {
          var tmp = parseEffect(this.effect);
          p.stats[tmp.to] -= tmp.mod;
        }
      },
    };
  } else {
    this.op = {
      'Put on': (_) => {
        if (p.equip[this.place]) return;
        p.equip[this.place] = this;
        if (this.effect) {
          var tmp = parseEffect(this.effect);
          p.stats[tmp.to] += tmp.mod;
        }
      },
      'Take off': (_) => {
        if (p.equip[this.place] !== this) return;
        p.equip[this.place] = null;
        if (this.effect) {
          var tmp = parseEffect(this.effect);
          p.stats[tmp.to] -= tmp.mod;
        }
      },
    };
  }
  this.name = `${n || (`${this.place} ${this.weapon ? 'Weapon' : 'Armour'}`)}: ${this.effect}`;
  this.item = true;
}

function parseEffect(str) {
  return {
    mod: parseInt(str),
    to: str.split(' ').pop(),
  };
}

function Enemy(t, x, y) {
  if (typeof t === 'object') {
    for (var i in defEnemies[t.t]) this[i] = defEnemies[t.t][i];
    this.t = t.t;
    this.x = t.x;
    this.y = t.y;
    this.objectOn = t.objectOn || '.';
  } else {
    for (var i in defEnemies[t]) this[i] = defEnemies[t][i];
    this.t = t;
    this.x = x;
    this.y = y;
    this.objectOn = '.';
  }
  this.act = this.act || function () {
    if (this.health <= 0) return true;
    if (this.objectOn === 'R') {
      this.objectOn === '.';
      return true;
    }
    if (Math.abs(this.x - p.x) < 2 && Math.abs(this.y - p.y) < 2) {
      var dam = Math.round(this.damage / Math.sqrt(p.stats.defense)) + 1;
      p.health = Math.max(0, p.health - dam);
      if (cmode && p.health < 30) { message('Cole, your health is low. Proceed with caution.', '#73ED3E'); } else { message(`The ${this.name} hits!-${dam} health.`, '#f00'); }
    } else if (Math.random() < this.move) {
      var spots = [];
      for (var i = -1; i < 2; i++) {
        for (var j = -1; j < 2; j++) {
          if ((`.-*$%&v^R3,${this.t == 'S' ? '~' : 'D'}`).includes(floor[i + this.y][j + this.x])) {
            spots.push({
              x: j + this.x,
              y: i + this.y,
            });
          }
        }
      }
      if (spots.length) {
        spots = spots[Math.floor(Math.random() * spots.length)];
        floor[this.y][this.x] = this.objectOn;
        this.objectOn = floor[this.y = spots.y][this.x = spots.x];
        if (this.objectOn === ',') {
          this.health -= Math.floor(Math.random() * 4);
          this.objectOn = '.';
        }
        floor[this.y = spots.y][this.x = spots.x] = this.t;
      }
    }
  };
}

function Potion(e) {
  this.effect = +e == e ? effects[e] : e;
  this.place = 'Sec';
  this.use = function (kill) {
    switch (this.effect) {
      case 'healing':
        p.health = Math.min(p.health + 4, p.maxHealth);
        break;
      case 'damage':
        for (var i in enemies) {
          if (Math.abs(enemies[i].x - p.x) < 3 && Math.abs(enemies[i].y - p.y) < 3) {
            enemies[i].health -= 2;
          }
        }
        break;
      default:
    }
    kill();
  };
  this.op = {
    Equip: (_) => {
      if (p.equip[this.place]) return;
      p.equip[this.place] = this;
    },
    Dequip: (_) => {
      if (p.equip[this.place] !== this) return;
      p.equip[this.place] = null;
    },
  };
  this.name = `${this.effect} potion`;
  this.item = true;
}
function Bow(power, r) {
  this.place = 'Sec';
  this.r = r || 3;
  this.use = function () {
    for (var e of enemies) {
      if (Math.abs(e.x - p.x) <= this.r && Math.abs(e.y - p.y) <= this.r && pathClear(e.x, e.y, p.x, p.y)) {
        e.health -= power;
        if (enemies[i].name === 'Archer') { an = 'n '; } else { an = ' '; }
        message(`You zapped a${an}${e.name} for ${power} damage!`, '#0c0', undefined, 1);
        update;
        return;
      }
    }
    message('No enemies to zap!', '#abc', '');
  };
  this.op = {
    Equip: (_) => {
      if (p.equip[this.place]) return;
      p.equip[this.place] = this;
    },
    Dequip: (_) => {
      if (p.equip[this.place] !== this) return;
      p.equip[this.place] = null;
    },
  };
  this.name = 'Magic Wand';
  this.item = true;
}

function isItem(thing) {
  return !!thing && thing.item;
}

function noMove(thing) {
  return function () {
    if (cmode) {
      message(`${thing} is obstructing your path.`, '#FF8700', '');
    }
  };
}

function canMove() {
  return !0;
}

function init() {
  play = true;
  var map = [];
  for (var i of floors) {
    map.push((function (a, b) {
      var k = [];
      for (var j of a) k.push(j.join(b).split(b));
      return k;
    })(i, 'ROFLCOPTER'));
  }
  floor = map[p.currentFloor];
  enemies = [];
  for (var i in floor) {
    for (var j in floor[i]) {
      if ('@'.includes(floor[i][j])) {
        p.x = +j;
        p.y = +i;
      } else if (floor[i][j] in defEnemies) {
        enemies.push(new Enemy(floor[i][j], +j, +i));
      }
    }
  }
  drawMap();
  log = [];
}
init();
p.inven.gold = 0;
c.width = screen.availWidth - 40;
c.height = screen.availHeight - 160;

function drawMap() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.fillStyle = '#FFF';
  var size = 22,
    cy = 50,
    cx,
    txt;
  ctx.font = 'bold 22px Anonymous Pro';
  if (floortxt[p.currentFloor]) {
    ctx.fillStyle = '#fff';
    txt = floortxt[p.currentFloor].split('\n');
    for (var i in txt) {
      ctx.fillText(txt[i], 25, cy);
      cy += size;
    }
  }
  for (var i in floor) {
    cx = 25;
    for (var j in floor[i]) {
      ctx.fillStyle = '#fff';
      (function c(a, b) {
        if (a.includes(floor[i][j])) ctx.fillStyle = b;
        return c;
      }('0', '#7EAC90'))('%R', getRandomColor())('&', '#DEA')('/', '#8B5934')('~', '#20B2AA')('OG', '#1C8B1C')('b', '#AF4374')('S', '#8C8799')('o¡', '#0f0')('.,', '#8B7C7C')('B', '#1DCF44')('*?81', '#4F4F4F')('$', '#FFAF33')('`', '#FFF333')('¢', '#FB2')('@!ǃ', p.color)('v^=+-X', '#DFBC75')('#|', '#564646')('C', '#F4A60C')('a', '#0CD9F4')('&', '#F0F40C')('Θ', '#5D4980')(':', cl())('‚', '#8B8C7C')('?', switcher())('3', '#3C0065')('il', '#2DA24B');
      ctx.fillText(floor[i][j], cx, cy);
      cx += size / 2 + 1;
    }
    cy += size + 1;
  }
  ctx.fillStyle = getRandomColor();
  if (p.health <= 50) ctx.fillStyle = '#0f0';
  if (p.health <= 25) ctx.fillStyle = '#ff0';
  if (p.health <= 10) ctx.fillStyle = '#f00';
  cy += 50;
  ctx.fillText(`You have ${Math.floor(p.health)} health.`, 10, cy);
  ctx.fillStyle = '#00f';
  cy += 50;
  ctx.fillText(`Your attack is ${p.stats.attack} and your defense is ${p.stats.defense}.`, 10, cy);
  for (var i in log) {
    cy += size + 5;
    txt = log[i].split(':');
    ctx.fillStyle = txt.shift();
    ctx.fillText(txt.join(':'), 10, cy);
  }
}
drawMap();

function update() {
  c.height = gitHite();
  c.width = gitWid();
  p.health = Math.round(p.health);
  if (play) {
    drawMap();
    if (p.health <= 0) {
      var m1g = new SpeechSynthesisUtterance('Ouch');
      m1g.lang = 'en-UK';
      window.speechSynthesis.speak(m1g);
      objson = [];
      floors = [];
      for (var i in original) {
        floors.push([]);
        for (var j in original[i]) { floors[i].push(original[i][j].join('').split('')); }
      }
      p.objectOn = '.';
      p.currentFloor = 1;
      p.inven = [];
      p.inven.gold = 0;
      p.health = 50;
      init();
      resetSellers();
    }
  } else if (seller) {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = '#FFF';
    ctx.font = '25px Anonymous Pro';
    ctx.fillText('Selling:', 10, 20);
    var y = 50;
    var idx = 0;
    for (var i in seller.wares) {
      if (ware === idx && buy) {
        buy = false;
        if (p.inven.gold >= seller.wares[i]) {
          p.inven.gold -= seller.wares[i];
          delete seller.wares[i];
          push(i.slice(0, -1));
          continue;
        }
      }
      ctx.fillText(`${(ware === idx ? '> ' : '  ') + i.slice(0, -1)}: ${seller.wares[i]}`, 10, y);
      y += 21;
      idx++;
    }
  } else {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = '#fff';
    ctx.font = '25px Anonymous Pro';
    ctx.fillText(`You have ${p.inven.gold} gold and ${p.inven.length} other items:`, 50, 50);
    var inv = [];
    if (!p.inven.gold && !p.inven.length) {
      ctx.fillText('Yer broke skrub!', 70, 100);
    } else {
      for (var i = 0; i < p.inven.length; i++) {
        ctx.fillText((i === select && !inItem ? '> ' : '  ') + (p.inven[i].name || p.inven[i]), 70, 100 + 25 * i);
        if (use && i === select) {
          if (isItem(p.inven[select]) && !inItem) {
            inItem = true;
            use = false;
          }
          if (!inItem) use = false;
        }
      }
      if (isItem(p.inven[select])) {
        var idx = 0;
        for (i in p.inven[select].op) {
          ctx.fillStyle = '#fff';
          ctx.fillText((idx === select2 && inItem ? '> ' : '  ') + i, 500, 100 + 25 * idx);
          if (use && idx === select2) {
            p.inven[select].op[i]();
          }
          idx++;
        }
      }
    }
  }
}

function getRandomColor() {
  for (var i = 0, c = '#', l = '0123456789ABCDEF'; i < 3; i++) { c += l[Math.floor(Math.random() * 16)]; }
  return c;
}

function movePlayer(vx, vy) {
  if (!(behavior[floor[p.y + vy][p.x + vx]] || canMove)(p.x + vx, p.y + vy, vx, vy)) return;
  if (floor[p.y + vy][p.x + vx] in defEnemies) {
    for (var i in enemies) {
      if (enemies[i].x == p.x + vx && enemies[i].y == p.y + vy) {
        enemies[i].health -= p.stats.attack;
        var an = false;
        if (enemies[i].name === 'Archer') { an = 'n '; } else { an = ' '; }
        if (!cmode)message(`You swing at a${an}${enemies[i].name} for ${p.stats.attack} damage.`, '#0f0', '');
      }
    }
  } else {
    floor[p.y][p.x] = p.objectOn;
    p.y = Math.min(p.y + vy, floor.length);
    p.x = Math.min(p.x + vx, floor[p.y].length);
    p.objectOn = floor[p.y][p.x];
    if (p.objectOn == '|') p.objectOn = '#';
    floor[p.y][p.x] = '@';
  }
  for (var i in enemies) {
    if (enemies[i].act()) {
      console.log(enemies[i]);
      floor[enemies[i].y][enemies[i].x] = enemies[i].objectOn;
      enemies.splice(i, 1);
    }
  }
}
document.onkeydown = function (evt) {
  if (evt.ctrlKey) return;
  var k = evt.keyCode || evt.which;

  function K(a) {
    return String.fromCharCode(k).toLowerCase() == a;
  }
  evt.preventDefault();
  if (K('i')) {
    play = !play;
    if (seller) seller = null;
  }
  if (seller) {
    if (K('w')) ware--;
    if (K('s')) ware++;
    if (K('x')) buy = true;
  } else if (!play) {
    if (K('w')) {
      if (inItem) select2--;
      else select--;
    }
    if (K('s')) {
      if (inItem) select2++;
      else select++;
    }
    if (K('x')) use = true;
    if (K('a')) { if (inItem) inItem = false; }
  }
  if (!play) return update();
  if (K('w') || K('&')) movePlayer(0, -1); else
  if (K('a') || K('%')) movePlayer(-1, 0); else
  if (K('s') || K('(')) movePlayer(0, 1); else
  if (K('d') || K("'")) movePlayer(1, 0); else
  if (K('q')) movePlayer(-1, -1); else
  if (K('e')) movePlayer(1, -1); else
  if (K('c')) movePlayer(1, 1); else
  if (K('z')) movePlayer(-1, 1); else
  if (K('r') && evt.shiftKey) p.health = 0; else
  if (K('m'))rms(); else
  if (K('h'))window.location = 'https://docs.google.com/document/d/1Uty66vE0If5Wf77W96-OPQHObU_8emDNxXugbN1TJQY/edit?usp=sharing'; else
  if (K('º'))cmode = (cmode === false);
  else if (K('f') && p.equip.Sec && p.equip.Sec.use) {
    p.equip.Sec.use(() => {
      for (var i in p.inven) {
        if (p.inven[i] === p.equip.Sec) {
          p.inven.splice(i, 1);
        }
      }
      p.equip.Sec = null;
    });
    movePlayer(0, 0);
  } else if (K('n')) movePlayer(0, 0);
  else if (K('x')) {
    use = true;
    function q(a) {
      return a.includes(p.objectOn);
    }
    if (q('v^=')) {
      objson[p.currentFloor] = p.objectOn;
      floors[p.currentFloor] = floor;
      p.objectOn = objson[p.currentFloor += q('v') ? 1 : q('^') ? -1 : 1 - p.currentFloor] || '.';
      return init(use = false);
    } else if (q('¢)')) {
      behavior[p.objectOn](p.x, p.y);
    } else if (q('-')) p.objectOn = '+';
    use = false;
  } else if (K('☃')) {
    if (prompt('Tell me how you typed that!') === 'Crtl+Alt+Del') {
      alert(
        "Go away... ʷᵒʷ, ᵗʰᶦᶰᵏˢ ᵗʰᵉʸ'ʳᵉ ˢᵒ ˢᵖᵉᶜᶦᵃᶫ",
        p.inven.includes('☃') ? 0 : push('☃'),
      );
    }
  }
  update();
};

function push(item) {
  var num = parseInt(item);
  if (cmode) { message(`Inventoried ${item.name || item}`, '#EEC900'); } else { message(`You pick up${num ? ' ' : ' a '}${item.name || item}${num ? 's.' : '.'}`, '#EEC900'); }
  if (!num) return p.inven.push(item);
  item = item.slice(([] + num).length + 2);
  for (var i = 0; i < num; i++) p.inven.push(item);
  setTimeout(update, 700);
}
var rys = false;
var lung = '';
function rms() {
  if (rys = confirm('Would you like the messages read aloud to you?'))lung = prompt('What language? For example "en-US"');
}
var premes = '';
function message(str, color, voice) {
  if (premes != str) {
    log.unshift(`${color || '#fff'}:${str}`);
    if (log.length > 20) log.pop();
    drawMap();
    if (cmode)rys = true, lung = 'en-US';
    if (rys) {
      var msg = Object.assign(new SpeechSynthesisUtterance(str), { volume: 1, lang: voice || lung });
      // You don't need the object.assign
      // The way I had it there worked fine.
      // Fix it.
      // -Cole
      if (voice)console.log(msg.lang = voice);
      else msg.lang = lung;
      msg.volume = 1;
      speechSynthesis.speak(msg);
    }
    premes = str;
  }
}
function switcher() { return ['#FF0023', '#AF4348', '#AD2D33'][swi = (swi + 1) % 3]; }
ctx.fillStyle = '#000';
ctx.fillRect(0, 0, c.width, c.height);
ctx.fillStyle = '#FFF';
window.setTimeout(() => { ctx.fillStyle = getRandomColor(); ctx.fillText('Into the Earth', gitWid() / 2.6, gitHite() / 3); ctx.fillStyle = getRandomColor(); ctx.fillText('A game by Marcus, Joshua, and Cole.', gitWid() / 2.6, gitHite() / 2.5); ctx.fillStyle = getRandomColor(); ctx.fillText('Music from Maplestory', gitWid() / 2.6, gitHite() / 2); ctx.fillStyle = getRandomColor(); ctx.fillText('Use wasd to continue.', gitWid() / 2.6, gitHite() / 1.5); }, 1000);
function gitHite() {
  return window.innerHeight;
}
function gitWid() {
  return window.innerWidth;
}
document.getElementById('ITE2').play();
document.getElementById('ITE2').addEventListener('ended', function () {
  this.currentTime = 0;
  this.play();
}, false);
