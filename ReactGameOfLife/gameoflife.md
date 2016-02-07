###HTML
```
<div class="container app"></div>
```

###CSS
```
body {
  background: #EB6B56;
}
.topbuttons {
  button{
    margin-right: 20px;
  }
}

.app{
  margin-top: 20px;
}
.table {
  margin: 3% 0; padding: 0;
  box-sizing: border-box;
  display: inline-block;
  width: 400px;
  height: 400px;
  line-height: 0;
}
.tablebig {
  margin: 3% 0; padding: 0;
  box-sizing: border-box;
  display: inline-block;
  width: 600px;
  height: 600px;
  line-height: 0;
}
.cellbig {
  box-sizing: border-box;
  width: 15px; 
  height: 15px; 
  background: #D1D5D8; 
  display: inline-block;
  border:1px solid black;
  margin: 0;
  padding: 0;
}
.cell {
  box-sizing: border-box;
  width: 10px; 
  height: 10px; 
  background: #D1D5D8; 
  display: inline-block;
  border:1px solid black;
  margin: 0;
  padding: 0;
}
.alive {
  background: #B8312F;
}
```

###JS

```
class TopButtons extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="col-md-4 topbuttons">
        <h2>Brand New GameOfLife</h2>
        <p><a href="https://github.com/thekairath" target="_blank">Check Creator's Github</a></p>
        
        <p>{"Generations: " + this.props.generations} </p>
        <button className="btn btn-primary" onClick={this.props.changeRun}>{this.props.run ? "Stop": "Run"}</button>
        <button className="btn btn-success" onClick={this.props.changeSize}>{this.props.big == false ? "Bigger": "Smaller"}</button>
        <button className="btn btn-danger" onClick={this.props.destructionToggle}>Destroy</button>
      </div>
    )
  }
}
class Board extends React.Component{
  constructor(props){
    super(props);
    this.createBoard = this.createBoard.bind(this);
    this.vizualTable = this.vizualTable.bind(this);
    this.recreationOfUniverse = this.recreationOfUniverse.bind(this);
    this.initInterVal = this.initInterVal.bind(this);
    this.state = {
      mapArr: this.createBoard(),
      intVal: this.props.run
    }
    this.props.run ? this.initInterVal() : null;
  }
  
  initInterVal(){
    return setInterval(function(){ 
        this.recreationOfUniverse();
    }.bind(this), 1000); 
  }

  recreationOfUniverse(){
    let tempArr = this.state.mapArr.slice(0);
    for(let i = 0; i < this.props.row; i++){
      for(let j = 0; j < this.props.col; j++){
        let count = 0;
        let tempi = i; let tempj = j; let tempii = i; let tempjj = j;
        if( i == 0){ tempi = this.props.col;} 
        if( i == this.props.col -1 ){ tempii = -1;}
        if( j == 0){ tempj = this.props.row;} 
        if( j == this.props.row -1){ tempjj = -1;}
        
          this.state.mapArr[tempi -1][tempj - 1].isAlive == true ? count++ : null;
          this.state.mapArr[tempi -1][j].isAlive == true ? count++ : null;
          this.state.mapArr[tempi -1][tempjj +1].isAlive == true ? count++ : null;
          this.state.mapArr[i][tempj - 1].isAlive == true ? count++ : null;
          this.state.mapArr[i][tempjj + 1].isAlive == true ? count++ : null;
          this.state.mapArr[tempii + 1][tempj - 1].isAlive == true ? count++ : null;
          this.state.mapArr[tempii + 1][j].isAlive == true ? count++ : null;
          this.state.mapArr[tempii + 1][tempjj + 1].isAlive == true ? count++ : null;
        
        if(this.props.generations > 0) { 
          if(this.state.mapArr[i][j].isAlive){
            if(count > 2){ tempArr[i][j].isAlive = false; }
            if(count < 2){ tempArr[i][j].isAlive = false; }
          }
          if(count == 3){
            tempArr[i][j].isAlive = true;
          }
        }
      }
    }
    if(this.props.destruction){
      for(let i = 0; i < this.props.row; i++){
        for(let j = 0; j < this.props.col; j++){
            tempArr[i][j].isAlive = false;
          }
      }
      this.setState({mapArr: tempArr});
      this.props.resetGen();
    } else {
      this.props.run ? this.props.incGen() : false;
      this.props.run ? this.setState({mapArr:tempArr}) : null;
    }
  }
  
  createBoard(){
      let map = [];
      for(let i = 0; i < this.props.row; i++ ){
        map.push([]);
      }
      for(let i = 0; i < this.props.row; i++ ){
        for(let j = 0; j < this.props.col; j++){
          map[i].push({test: 1, isAlive: this.randomizationOfExistance()})
        }
      }
      return map;
  }
  vizualTable(){
    if(this.state.mapArr){
        return this.state.mapArr.map((cols, colind)=>{
         return cols.map((cell, rowin)=>{
             return <div key={colind + " " + rowin}
             className={"cell" + (this.props.big == true ? "big " : " ") + " " + 
                 (cell.isAlive? "alive" : "notexist")}></div>
           })
        }) 
    }
  }
  randomizationOfExistance(){
    return Math.random() > 0.9 ? true : false;
  }
  render(){
    return (
      <div className={ this.props.big == true ?  "tablebig" : "table" }>
        {this.vizualTable()}
      </div>
    )
  }
}

class BaseComponent extends React.Component {
 _bind(...methods) {
    methods.forEach( (method) => this[method] = this[method].bind(this) );
 }
}

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      col: 40,
      row: 40,
      generations: 0,
      run: true,
      destruction: false,
      big: false
    }
    this.incGenerations = this.incGenerations.bind(this);
    this.changeRun = this.changeRun.bind(this);
    this.destructionToggle = this.destructionToggle.bind(this);
    this.resetGen = this.resetGen.bind(this);
    this.changeSize = this.changeSize.bind(this);
  }
  changeSize(){
    this.setState({ big: !this.state.big });
  }
  destructionToggle(){
    this.setState({destruction: true})
  }
  incGenerations(){
    this.setState({ generations: (this.state.generations + 1)});
  }
  resetGen(){
    this.setState({ generations: 0});
  }
  changeRun(){
    var newRun;
    this.state.run == true ? newRun = false : newRun = true;
    this.setState({ run: newRun });
  }
  render(){ 
    return (
      <div className="col-md-12">
        <TopButtons generations={this.state.generations} changeRun={this.changeRun} run={this.state.run} run={this.state.run}
          destructionToggle={this.destructionToggle} changeSize={this.changeSize} big={this.state.big}/>
        <Board row={this.state.row} col={this.state.col} incGen={this.incGenerations} big={this.state.big}
          generations={this.state.generations} run={this.state.run} destruction={this.state.destruction} resetGen={this.resetGen}
          />
      </div>
    )
  }
}
ReactDOM.render(<App/>, document.querySelector(".app"));
```