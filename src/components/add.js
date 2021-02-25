import React, { Component } from 'react';


class Additems extends Component{
  constructor(){
    super();
    this.state={
      id:'',
      name: '',
      status: false
    };
  }
  // hiển thị state khi click vào update
  componentWillMount(){
    if(this.props.update){
      this.setState({
        id: this.props.update.id,
        name: this.props.update.name,
        status: this.props.update.status,
  
      });
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.update){
      this.setState({
        id: nextProps.update.id,
        name: nextProps.update.name,
        status: nextProps.update.status,
  
      });
    }else if(!nextProps.update){
      this.setState({
        id:'',
        name: '',
        status: false
  
      });
    }
  }

  // đóng form
  onCloseForm=()=>{
    this.props.show();
  }
  onsubmit=(event)=>{
    event.preventDefault();
    this.onClear();
    this.onCloseForm();
  }

  onchanges=(event)=>{
    var taget = event.target;
    var name = taget.name;
    var value = taget.value;
    if(name === 'status'){
      var value = taget.value === 'true' ? true : false;
    }
    this.setState({
      [name]: value
    });
  }

  luulai=()=>{
    this.props.Push(this.state);
  }

  onClear=()=>{
    this.setState({
      name: '',
      status: false
    })
  }
  render(){
    var { id } = this.state;
    return (
          <div className="additem pd boder">
            <div className="header">
                <p>{id == '' ? 'thêm công việc' : 'cập nhật công việc'}</p>
            </div>

            <div className="conten">

            <form onSubmit={this.onsubmit}>
                <label>
                  <b>Ten:</b>
                </label>
                <input 
                  className="inputwidth" 
                  type='text'
                  name="name"
                  value={this.state.name}
                  onChange={this.onchanges}
                  ></input>

                <label>
                    <b>Trang thai:</b>
                </label>
                <select 
                  className="inputwidth"
                  name="status"
                  value={this.state.status}
                  onChange={this.onchanges}
                  >
                    <option value={true}>kich hoat</option>
                    <option value={false}>an</option>
                </select>
                <div className="mg">
                    <button 
                      className="bnt-orange"
                      onClick={this.luulai}
                      >Luu Lai</button>
                    <button className="bnt-tomato">Huy Bo</button>
                </div>
            </form>
          </div>
      </div>
    )
  }
}
export default Additems;