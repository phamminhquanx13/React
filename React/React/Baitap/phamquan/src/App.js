import React from 'react';

class App extends React.Component {
   constructor(props){
     super(props);
     this.state ={
     cards: [
       {'name': 'A'},
       {'name': 'B'},
       {'name': 'R'},
       {'name': 'A'},
       {'name': 'Pi'}
       ],
       value: ''
     }
     
     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
   }
   componentDidUpdate() {
     console.log("Cards: ", this.state.cards);
   }
   
   handleSubmit() {
     alert('This box name was submitted: ' + this.state.value);
       event.preventDefault();
       this.setState({cards: [...this.state.cards, {name: this.state.value}]});
     }
    handleChange(event) {
     let name = event.target.value;
     console.log("In button: ", event);
     this.setState({value: event.target.value})
     this.forceUpdate();
   }
 
   render() {
     return (
       <div>
         
           <h1> React To Do List</h1>
         <AddBox handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
         <TextBox cards={this.state.cards}>
         </TextBox>
         
            
     </div>
     )
   }
 }
 
 class TextBox extends React.Component {
   constructor(props){
     super(props);
     this.state = {};
     this.moveCard = this.moveCard.bind(this);
     this.deleteCard = this.deleteCard.bind(this);
   }
   moveCard(fromIndex, toIndex) { 
     let cards = this.props.cards;
     let movedCard = cards.splice(fromIndex, 1)[0];
     console.log("Moved Card: ", movedCard);
     cards.splice(toIndex, 0, movedCard)
     this.setState({cards: cards})
   }
   deleteCard(index){
     let cards = this.props.cards;
     console.log("In Delete CArd: ", index);
     // let deleted = cards.splice(index, 1)[0];
     cards.splice(index, 1);
     this.setState({cards: cards});
     
   }
   render() {
      let elements = this.props.cards.map((element, index)=>{
           let number = index;
           let moveUp, moveDown, deletedCard;
           if(index !=0){
             moveUp = this.moveCard.bind(this,index, index-1)
           }
           if(index != this.props.cards.length-1){
             moveDown = this.moveCard.bind(this, index, index+1)
           }
        deletedCard = this.deleteCard.bind(this, index)
       return (
         <Card
           key={index}
           card = {element}
           moveUp={moveUp}
           moveDown ={moveDown}
           number={number}
           deleteCard = {deletedCard}
         />)
     })
     return (
      
       <div>
         <div id="textbox">
           {elements}
         </div>
       </div>
     )
   }
   
 }
 
 class Card extends React.Component {
   constructor(props){
     super(props);
   }
   render() {
     console.log(this.props);
       return (
   <div id='button-container'>
           <div>
           <h1><span id="number"> {this.props.number+1}</span>: {this.props.card.name} </h1>
           </div>
           <div id="btns">
             <div>
              {this.props.moveUp ? <button id="upBtn" onClick={this.props.moveUp}>Up!</button>: ''}
             </div>
             <div>
               {this.props.moveDown ? <button id="downBtn" onClick={this.props.moveDown}>Down!</button>: ''}
             </div>
             <div>
               {<button id="deleteBtn" onClick={this.props.deleteCard}>X</button>}
             </div>
           </div>
   </div>
                   
   )
   }
 
 }
 
 class AddBox extends React.Component {
   constructor(props){
     super(props);
     this.state ={
       value: ''
     }
 
 
   }
   render(){
     return(
  
         <form onSubmit = {this.props.handleSubmit} id='firstForm'>
         <label id='addLabel' >Add a task: 
         <input placeholder="type your task" type="text" onChange = {this.props.handleChange} id="addBox" value={this.props.value} /> </label>
         <input type="submit" value="Submit"></input>
         </form>
     )
   }
 }          
 
export default App;