###HTML
```
<div class="container">
  <div class="app"></div>
<div>
```

###CSS
```
%container{
  height: 600px;
  padding: 20px;
}

hr {
  transform:rotate(90deg);
}

.rightside{
  @extend %container;
  margin-top:20px;
  padding-left:40px;
}

.leftside {
  @extend %container;
  height: 620px;
  textarea {
    width: 96%;
    height: 98%;
    padding: 20px;
  }
}
```

###JS

```
class LeftSide extends React.Component{
  constructor(props){
    super(props);
  }
  
  render(){
    return (
      <div className="leftside col-md-6">
        <textarea value={this.props.text}
        onChange={(event) => this.props.onTextChange(event.target.value)}
      />
      </div>
      )
  }
}

class RightSide extends React.Component{
  constructor(props){
    super(props);
  }
  rawMarkup() {
    return { __html: this.props.text };
  }
  render(){
    return (
      <div className="rightside col-md-6" dangerouslySetInnerHTML = {this.rawMarkup()}/>
      )
  }
}

class MainComp extends React.Component{
  constructor(props){
    super(props);
    
    this.state= {
      text: 'Heading\n=======\n\nSub-heading\n-----------\n \n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\nThe rain---not the reign---in\nSpain.\n\n *[thekairath](https://github.com/thekairath)*'
		};
  }
  
  render(){
    return (
      <div className="row">
      
        <hr />
        <LeftSide 
          text={this.state.text} 
          onTextChange = { (nText) => { this.setState({text: nText})} }/>
        <RightSide text={marked(this.state.text)}/>
      </div>
      )
  }
}

React.render(< MainComp />, document.querySelector(".app"));
```