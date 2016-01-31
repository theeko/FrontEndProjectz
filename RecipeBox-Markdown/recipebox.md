###HTML
`<div id="app" class="well container"></div>`

###CSS
````
.panel{
  button {
    margin: 10px 0 10px 10px;
  }
}
.form-group div {
  margin-top: 10px;
}
```

###JS
```
class Panel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return ( < div > {
        this.props.recipes.map((recipe) => {
            return ( 
      < Items recipe = {
                recipe
              }
              removeItem = {
                this.props.removeItem
              }
              handleEdit = {
                this.props.handleEdit
              }
              />)
            })
        } < /div>
      )
    }
  }

class Items extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        gradients: this.props.recipe.gradients,
        show: false
      }

      this.handleClick = this.handleClick.bind(this);
      this.clickHandler = this.clickHandler.bind(this);
    }
    clickHandler() {
      this.props.removeItem(this.props.recipe);
    }

    handleClick() {
      if (this.state.show == false) {
        this.setState({
          show: true
        });
      } else {
        this.setState({
          show: false
        });
      }
    }
    render() {
      return ( < div className = "panel panel-default"
        key = {
          this.props.recipe.title
        } >
        < div className = "panel-heading"
        onClick = {
          this.handleClick
        } > < h3 className = "panel-title" > {
          this.props.recipe.title
        } < /h3></div >
        < div className = {
          this.state.show == true ? "panel-body" : "panel-body hide"
        } >
        < table className = "table" >
              <tbody>
              {
          this.props.recipe.gradients.map((gradient) => {
            return <tr > < td > {
              gradient
            } < /td></tr >
          })
        } </tbody>< /table> < button className = "btn btn-danger"
        onClick = {
          this.clickHandler
        } > Delete < /button> <EditButton title = {
        this.props.recipe.title
      } gradients={ this.props.recipe.gradients}
      handleEdit = {
        this.props.handleEdit
      }
      /> < /div > < /div>
    )
  }
}

class AddButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      gradients: ""
    }
    this.clearInputs = this.clearInputs.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleGradientChange = this.handleGradientChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  clearInputs() {
    this.setState({
      title: "",
      gradients: ""
    })
  }
  handleTitleChange(e) {
    this.setState({
      title: e.target.value
    });
  }
  handleGradientChange(e) {
    this.setState({
      gradients: e.target.value
    });
  }
  submitHandler() {
    let title = this.state.title == "" ? "Untitled" : this.state.title;
    let gradients = this.state.gradients == "" ? "Untitled" : this.state.gradients;
    this.props.newItem(title, gradients);
    this.setState({
      title: "",
      gradients: ""
    })
  }

  render() {
    return ( < div >
      < button type = "button"
      className = "btn btn-info btn-lg"
      data-toggle = "modal"
      data-target = "#myModal" > New Recipe < /button>

      < div className = "modal fade"
      id = "myModal"
      role = "dialog" >
      < div className = "modal-dialog" >
      < div className = "modal-content" >
      < div className = "modal-header" >
      < button type = "button"
      className = "close"
      data-dismiss = "modal" > & times; < /button> < h4 className = "modal-title" > New Recipe </h4 > < /div> < div className = "modal-body" > < div className = "form-group" >

      < div > < input className = "form-control"
      type = "text"
      placeholder = "recipe title"
      value = {
        this.state.title
      }
      onChange = {
        this.handleTitleChange
      } > < /input></div >
      < div > < input className = "form-control"
      type = "text"
      placeholder = "gradients/separete by coma(,)"
      value = {
        this.state.gradients
      }
      onChange = {
        this.handleGradientChange
      } > < /input></div >
      < /div> < /div > < div className = "modal-footer" >
      < button className = "btn btn-success"
      onClick = {
        this.submitHandler
      }
      data-dismiss = "modal" > Add < /button> < button type = "button"
      className = "btn btn-default"
      data-dismiss = "modal"
      onClick = {
        this.clearInputs
      } > Close < /button> < /div > < /div>

      < /div> < /div >

      < /div>
    )
  }
}

class EditButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      gradients: this.props.gradients.join(","),
      copytitle: this.props.title
    }
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleGradientChange = this.handleGradientChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }
  handleTitleChange(e) {
    this.setState({
      title: e.target.value
    });
  }
  handleGradientChange(e) {
    this.setState({
      gradients: e.target.value
    });
  }
  submitHandler() {
    this.props.handleEdit(this.state.copytitle, this.state.title, this.state.gradients.split(","));
  }

  render() {
    return ( < span >
      < button type = "button"
      className = "btn btn-notice"
      data-toggle = "modal"
      data-target = {
        "#" + this.props.title
      } > Edit < /button>

      < div className = "modal fade"
      id = {
        "" + this.props.title
      }
      role = "dialog" >
      < div className = "modal-dialog" >
      < div className = "modal-content" >
      < div className = "modal-header" >
      < button type = "button"
      className = "close"
      data-dismiss = "modal" > & times; < /button> < h4 className = "modal-title" > Edit Recipe </h4 > < /div> < div className = "modal-body" > < div className = "form-group" >

      < div > < input className = "form-control"
      type = "text"
      value = {
        this.state.title
      }
      onChange = {
        this.handleTitleChange
      } > < /input></div >
      < div > < input className = "form-control"
      type = "text"
      placeholder = "gradients/separete by coma(,)"
      value = {
        this.state.gradients
      }
      onChange = {
        this.handleGradientChange
      } > < /input></div >
      < /div> < /div > < div className = "modal-footer" >
      < button className = "btn btn-success"
      onClick = {
        this.submitHandler
      }
      data-dismiss = "modal" > Edit Recipe < /button> < button type = "button"
      className = "btn btn-default"
      data-dismiss = "modal"
      onClick = {
        this.clearInputs
      } > Close < /button> < /div > < /div>

      < /div> < /div >

      </span>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    let defaultItems = [{
      title: "Spaghetti",
      gradients: ["Noodles", "Tomato Sauce", "(Optional) Meatballs"]
    }, {
      title: "Onion Pie",
      gradients: ["Onion", "Pie Crust"]
    }];
    if (!localStorage.getItem("recipes")) {
      localStorage.setItem("recipes", JSON.stringify(defaultItems));
    }

    this.state = {
      recipes: JSON.parse(localStorage.getItem("recipes"))
    }
    this.removeItem = this.removeItem.bind(this);
    this.newItem = this.newItem.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  removeItem(recipe) {
    console.log(recipe);
    let index = this.state.recipes.indexOf(recipe);
    localStorage.setItem("recipes", JSON.stringify(this.state.recipes.filter(elem => {
      return recipe != elem
    })));
    this.setState({
      recipes: this.state.recipes.filter(elem => {
        return recipe != elem
      })
    });
  }
  newItem(title, gradients) {
    let newRecipes = this.state.recipes;
    newRecipes.push({
      title: title,
      gradients: gradients.split(",")
    });
    localStorage.setItem("recipes", JSON.stringify(newRecipes));
    this.setState({
      recipes: newRecipes
    });
  }
  handleEdit(title, newtitle, newgradients) {
    console.log("handle edit called inside App comp");
    this.state.recipes.map(recipe => {
      if (recipe.title == title) {
        let newrecipes = this.state.recipes;
        let ind = this.state.recipes.indexOf(recipe);
        newrecipes[ind].title = newtitle;
        newrecipes[ind].gradients = newgradients;
        localStorage.setItem("recipes", JSON.stringify(newrecipes));
        this.setState({
          recipes: newrecipes
        });
      }
    });
  }

  render() {
    return ( < div >
      < Panel recipes = {this.state.recipes}
      removeItem = {this.removeItem}
      handleEdit = {this.handleEdit} /> 
      < AddButton newItem = {this.newItem}/> < /div >
  )
}
}

React.render( < App / > , document.querySelector("#app"));
```