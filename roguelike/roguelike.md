###HTML
```
.app.container
```

###CSS
```
$greyColor : #d2d2d2;
$colorTwo : #F2784B;
h3 { 
  color: #22313F;
  font-weight: 900;
}
body{
  background: #F4B350;
}
.spangroup{
  display: inline-block;
  margin-right: 1em;
}
.bold{
  font-weight: bold;
}
button{
  margin: 0 20px;
}
#darkness{
  background: black;
}
.heroinfo{ color:black; display:block;height: 20px; margin: 4%; display:block; height: 50px}
%cell{
  width: 20px;
  height: 20px;
  display: inline-block;
  padding: 0; margin: 0;
  z-index:2;
}
.hero{
  @extend %cell;
  background: $colorTwo url("https://preview.c9users.io/kairath/frontendprojectz/FrontEndProjectz/roguelike/rogue.svg");
  background-size: cover;
}
.moongate{
  @extend %cell;
  background: $colorTwo url("https://preview.c9users.io/kairath/frontendprojectz/FrontEndProjectz/roguelike/moongate.PNG");
  background-size: cover;
}
.enemy{
  @extend %cell;
  background: $colorTwo url("https://preview.c9users.io/kairath/frontendprojectz/FrontEndProjectz/roguelike/enemy.png");
  background-size: cover;
}
.boss{
  @extend %cell;
  background: $colorTwo url("https://preview.c9users.io/kairath/frontendprojectz/FrontEndProjectz/roguelike/boss.png");
  background-size: cover;
}
.potion{
  @extend %cell;
  background: $colorTwo url("https://preview.c9users.io/kairath/frontendprojectz/FrontEndProjectz/roguelike/red-potion.png");
  background-size: cover;
}
.weapon{
  @extend %cell;
  background: $colorTwo url("https://preview.c9users.io/kairath/frontendprojectz/FrontEndProjectz/roguelike/treasurebox.png");
  background-size: cover;
}
.cell {
  @extend %cell;
  background: #22313F;
  // background: url("https://preview.c9users.io/kairath/frontendprojectz/FrontEndProjectz/roguelike/bricksx64.png");
  background-size: cover;
}
.room {
  @extend %cell;
  background: $colorTwo;
}
.board {
  padding:0;
  line-height:0;
  width: 802px;
  border:1px solid black;
}
```

###JS

```
const COL = 40, ROW = 30, ENEMYCOUNT = 6, ROOMCOUNT = 15;
let level = 1,
    hero,
    enemies = [],
    boss,
    potions = [], 
    weapons = [ ["dagger", 3], ["Sword", 4], ["Hammer", 5], ["a +15 Katana", 10] ];

class Helper {
  static randomization(max = COL - 4, min = 3) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

class Dungeon {
  constructor(col,row,enemycount,roomcount,level){
    this.COL = col;
    this.ROW = row;
    this.ENEMYCOUNT = enemycount;
    this.ROOMCOUNT = roomcount;
    this.level = level;
  }
  
  creationOfBoard (COL,ROW) { 
    let board = [];
    for(let i = 0; i < ROW; i++){
      board[i] = [];
      for(let j = 0; j < COL; j++){
        board[i].push({ status: 0 }); 
      }
    }
    return this.generateRooms(board,this.ROOMCOUNT);
  }

  generateRooms (map, size) {
    let rooms = []
    for(let i = 0; i < size; i++){
      rooms.push({ haveAccess: false, h: Helper.randomization(ROW/ROOMCOUNT*2, 3), 
                   w: Helper.randomization(COL/ROOMCOUNT*2, 3), x: 0, y: 0, center: { x: 0, y:0 }});
    }
    return this.createRooms(rooms, map);
  }

  createRooms (rooms, map) {
   let tempMap = map, collapse = false;
   let x = Helper.randomization(this.ROW-3,3), y = Helper.randomization(this.COL-3,3);
    for(let i = 0; i < this.ROOMCOUNT; i++){ 
      collapse = false;
      if(tempMap[x][y].status != 0 || x+rooms[i].h > this.COL - 4 || y+rooms[i].w > this.ROW - 4 ){
        x = Helper.randomization(this.ROW-3,3); y = Helper.randomization(this.COL-3,3); i--; continue; 
      }
      for(let p = x; p <= x + rooms[i].h; p++){
          for(let r = y; r <=  y + rooms[i].w ; r++){
            tempMap[p][r].status != 0 ? collapse = true : collapse = false;
          }
      }
      if(!collapse){
        rooms[i].x = x; 
        rooms[i].y = y;
        rooms[i].center.x = Math.floor((x + rooms[i].h)/2);
        rooms[i].center.y = Math.floor((y + rooms[i].w)/2);
        for(let k = rooms[i].x; k <= rooms[i].x + rooms[i].h; k ++){
            for(let l = rooms[i].y; l <= rooms[i].y + rooms[i].w; l++){
                tempMap[k][l].status = 1;
            }
        }   
      }
    }
    return this.createRoomAccess(tempMap,rooms);
  }

  createRoomAccess (map,rooms) {
    let tempMap = map;
    for(let i=0; i < this.ROOMCOUNT-1; i++){
      let room1 = rooms[i];
      let room2 = rooms[i+1];
      for(let j = Math.min(room1.x,room2.x); j <= Math.max(room1.x,room2.x); j++){
        map[j][room2.y].status = 1;
      }
      for(let k = Math.min(room1.y,room2.y); k <= Math.max(room1.y,room2.y); k++){
        map[room1.x][k].status = 1;
      }
      
    }
    return this.appearencesOfThings(map, rooms);
  }
  
  placement(name,map,rooms,howmany=1){
    let newStatus;
    if(name == "hero"){
      newStatus = 3
    } else if (name == "enemy") { 
      newStatus = 4 
    } else if (name == "boss"){
      newStatus = 5;
    } else if (name == "potion") {
      newStatus = 6;
    } else if (name == "weapon"){ 
      newStatus = 7 
    } else if (name == "moongate"){ 
      newStatus = 8 
    }
    while(howmany>0){
      let room = rooms[Helper.randomization(rooms.length-1,0)]
      let x = Helper.randomization(room.x + room.h, room.x);
      let y = Helper.randomization(room.y + room.w, room.y);
      if(map[x][y].status == 1){ map[x][y].status = newStatus; this.createObj(name,x,y)} else { map = this.placement(name,map,rooms) }
      howmany--;
    }
    return map;
  }
  
  createObj(name,x,y){
    switch(name){
      case "potion":
        break;
      case "hero":
        if(level == 1){
          hero = new Hero(x,y,1);
        } else { hero.reXandY(x,y) }
        break;
      case "enemy":
        enemies.push(new EnemyUnit(x,y,this.level));
        break;
      case "boss":
        boss = new Boss(x,y,10);
        break;
      case "weapon":
        break;
    }
  }
  
  appearencesOfThings(map, rooms){
    map = this.placement("hero",map,rooms);
    map = this.placement("enemy",map,rooms,this.ENEMYCOUNT);
    map = this.placement("potion",map,rooms,Helper.randomization(this.ENEMYCOUNT,2));
    map = this.placement("weapon",map,rooms);
    if(level !=4){ map = this.placement("moongate",map,rooms); }
    if(this.level == 4){
      map = this.placement("boss",map,rooms);
    }
    return map;
  }
  
  initDungeon(){
    return  this.creationOfBoard(this.COL, this.ROW);
  }
  
  getHero(){
    return hero;
  }
}
  
class Living {
  constructor(coordX,coordY,lvl){
    this.level = lvl;
    this.baseMinDmg = lvl*1;
    this.baseMaxDmg = lvl*5;
    this.hp = lvl*6;
    this.coordX = coordX;
    this.coordY = coordY;
  }
  
  getbaseMinDmg(){
    return this.baseMinDmg;
  }
  getbaseMaxDmg(){
    return this.baseMaxDmg
  }
  
  getX(){
    return this.coordX;
  }
  getY(){
    return this.coordY;
  }

  getDamage(dmg){
    this.hp -= dmg;
  }

  getHp(){
    return this.hp;
  }
}
  
class Hero extends Living{
  constructor(coordX,coordY,lvl){
    super(coordX,coordY,lvl);
    this.hp = 100;
    this.experince = 0;
    this.toNextLevel = 50;
    this.weapon = "none"
  }

  setX(amount){
    if(amount > 0){
      this.coordX++;
    } else { this.coordX--; }
  }

  setY(amount){
     if(amount > 0){
        this.coordY++;
      } else { this.coordY--; }
  }

  reXandY(x,y){
    this.coordX = x;
    this.coordY = y;
  }

  gainExperince(){
    this.experince += 10;
    if(this.experince >= this.toNextLevel){
      this.experince = 0;
      this.hp = 100;
      this.level++;
    }
  }

  getNeededExp(){
    return this.toNextLevel - this.experince;
  }

  getLevel(){
    return this.level;
  }
  
  addWeapon(name){
    this.weapon = name;
    this.baseMinDmg = this.level*1 + weapons[level-1][1];
    this.baseMaxDmg = this.level*5 + weapons[level-1][1];
  }
  
  getWeapon(){
    return this.weapon;
  }

  drinkPot(){
    if(this.hp < 100){
      let amount = Helper.randomization(level * 5,4);
      if(this.hp + amount > 100){
        this.hp = 100;
      } else {
        this.hp += amount
      }
    }
  }
  
}
  
class EnemyUnit extends Living{
  constructor(coordX,coordY,lvl){
    super(coordX,coordY,lvl);
  }
}

class  Boss extends Living{
  constructor(coordX,coordY,lvl){
    super(coordX,coordY,lvl);
    this.hp = 20 * level;
  }
}

class Cell extends React.Component{
  constructor(props){
    super(props)
    this.whichThing = this.whichThing.bind(this);
    this.state = {
      
    }
  }
  whichThing(){
     if(this.props.status== 1 ) {
       return "room";
     } else if(this.props.status== 0){
       return "cell";
     } else if (this.props.status== 3) {
       return "hero";
     } else if (this.props.status== 4) { 
       return "enemy";
     } else if(this.props.status== 5) { 
       return "boss";  
     } else if(this.props.status == 6) { 
       return "potion";
     } else if(this.props.status == 7) { 
       return "weapon";
     } else { this.props.status = 8} { 
       return "moongate"; 
     }
  }
  render(){
    return (  
      <div className={ this.whichThing() } id={this.props.hideit=="yes" ? "darkness" : "nodarkness"}></div> 
    )
  }
  
}

class Board extends React.Component{
  constructor(props){
    super(props)
    this.renderificationOfTheBoard = this.renderificationOfTheBoard.bind(this);
    let dungeon = new Dungeon(COL,ROW,ENEMYCOUNT,ROOMCOUNT,level);
    this.handleArrowPress = this.handleArrowPress.bind(this);
    this.movePlayer = this.movePlayer.bind(this);
    this.toggleDark = this.toggleDark.bind(this);
    document.addEventListener('keydown', this.handleArrowPress);
    this.state = {
      board: dungeon.initDungeon(),
      toggleDark: true
    }
  }

  handleArrowPress(event){
    const keys = [37, 38, 39, 40]
    if (keys.indexOf(event.keyCode) >= 0) {
      let tempMap = this.state.board;
      switch (event.keyCode) {
      case 87:
      case 38:
        if(hero.getX() == 0){ break;}
        this.movePlayer(-1,0);
        break;
      case 83:
      case 40:
        if(hero.getX() == ROW-1){ break;}
        this.movePlayer(1,0);
        break;
      case 65:
      case 37:
        if(hero.getY() == 0){ break;}
        this.movePlayer(0,-1);
        break;
      case 68:
      case 39:
        if(hero.getY() == ROW-1){ break;}
        this.movePlayer(0,1);
      }
    }
  }

  movePlayer(a,b){
    //3 hero , 4 enemy , 5 boss, 6 potion, 7 weapon, 8 moongate , 0 not exist, 1 room, 2 not used
    let tempMap = this.state.board;
    if(this.state.board[hero.getX()+a][hero.getY()+b].status == 1){
        tempMap[hero.getX()][hero.getY()].status = 1;
        b == 0 ? hero.setX(a) : hero.setY(b);
        tempMap[hero.getX()][hero.getY()].status = 3;
        this.setState({ board: tempMap });
    } else if (this.state.board[hero.getX()+a][hero.getY()+b].status == 4){
        enemies.forEach((enemy)=>{
          if(enemy.getX() == hero.getX() + a && enemy.getY() == hero.getY()+b){
            enemy.getDamage(Helper.randomization(hero.getbaseMaxDmg(),hero.getbaseMinDmg()));
            hero.getDamage(Helper.randomization(enemy.getbaseMaxDmg(), enemy.getbaseMinDmg()));
            if(enemy.getHp() <= 0){
              tempMap[hero.getX()][hero.getY()].status = 1;
              b == 0 ? hero.setX(a) : hero.setY(b);
              hero.gainExperince();
              tempMap[hero.getX()][hero.getY()].status = 3;
              this.setState({ board: tempMap });
            }
          }
        })
      } else if(this.state.board[hero.getX()+a][hero.getY()+b].status == 6){
        tempMap[hero.getX()][hero.getY()].status = 1;
        b == 0 ? hero.setX(a) : hero.setY(b);
        hero.drinkPot();
        tempMap[hero.getX()][hero.getY()].status = 3;
        this.setState({ board: tempMap });
      } else if(this.state.board[hero.getX()+a][hero.getY()+b].status == 7){
        tempMap[hero.getX()][hero.getY()].status = 1;
        b == 0 ? hero.setX(a) : hero.setY(b);
        hero.addWeapon(weapons[level-1][0]);
        tempMap[hero.getX()][hero.getY()].status = 3;
        this.setState({ board: tempMap });
      } else if (this.state.board[hero.getX()+a][hero.getY()+b].status == 8){
        level++;
        let uplevel = new Dungeon(COL,ROW,ENEMYCOUNT,ROOMCOUNT,level);
        this.setState({ board: uplevel.initDungeon()});
      } else if(this.state.board[hero.getX()+a][hero.getY()+b].status == 5){
        boss.getDamage(Helper.randomization(hero.getbaseMaxDmg(),hero.getbaseMinDmg()));
        hero.getDamage(Helper.randomization(boss.getbaseMaxDmg(),boss.getbaseMinDmg()));

        if(boss.getHp() < 0){
         level = 1;
         let brandnewdungo = new Dungeon(COL,ROW,ENEMYCOUNT,ROOMCOUNT,level);
         this.setState({ board: brandnewdungo.initDungeon() });
        }
      }
  }

  renderificationOfTheBoard(){
    if(this.state.board){
        return this.state.board.map((row,rowind)=>{
          return row.map((col,colind)=>{
            if(!this.state.toggleDark){return <Cell status={col.status} hideit="no"/>}
            else {
              let heroX = hero.getX(), heroY = hero.getY();
              if(heroX - 5 <= rowind && rowind <= heroX + 5 && heroY - 5 <= colind && colind <= heroY + 5){
                return <Cell status={col.status} hideit="no"/>
              } else {
                return <Cell status={col.status} hideit="yes"/>
              }
            }
          })
        }) 
      
    }
  }
  toggleDark(){
    this.setState({toggleDark: !this.state.toggleDark})
  }
  render(){
    return(
      <div className="container">
        <div className="heroinfo">
          <h3>React Roguelike</h3>
          <p>
            <div className="spangroup"><span className="bold">Health: </span>         <span> {hero.getHp()} </span></div>
            <div className="spangroup"><span className="bold">Weapon: </span>         <span> {hero.getWeapon()} </span></div>
            <div className="spangroup"><span className="bold">Damage: </span>         <span> {hero.getbaseMinDmg() + "-" + hero.getbaseMaxDmg()} </span></div>
            <div className="spangroup"><span className="bold">Level: </span>          <span> {hero.getLevel()} </span></div>
            <div className="spangroup"><span className="bold">toNextLevel: </span>    <span> {hero.getNeededExp()} </span></div>
            <button className="btn btn-primary" onClick={this.toggleDark}>Toggle Darkness</button>
          </p>
        </div>
        <div className="board">{this.renderificationOfTheBoard()}</div>
      </div>
    )
  }
}

class App extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div >
        <Board />
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.querySelector(".app"));
```