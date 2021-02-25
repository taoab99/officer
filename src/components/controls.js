import React, { Component } from 'react';


class Controls extends Component{
  constructor(){
    super();
    this.state={
      hideorshow: false,
      keyword: ''
    };
    this.onset= this.onset.bind(this);
  }
  onset(){
    this.setState({
      hideorshow: !this.state.hideorshow
    });
  }
  hienthi= ()=>{
    this.props.show();
  }

  onchanges=(event)=>{
    var target = event.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value
    });
  }

  onsearch=()=>{
    this.props.onsearch(this.state.keyword);
  }
  // sắp xếp

  onClick=(sorby, sortvalue)=>{
     
      this.props.onsort(sorby, sortvalue);
  }
  render(){
    return (
        <div>
                <div className="inputwidth">
                    <button className="bnt-blue" onClick={this.hienthi}>Them Cong Viec</button>
                    <button onClick={this.props.func}>Hien Thị Danh Sách</button>
                </div>

                <div className="dieukhien inputwidth">
                    <input 
                          type="text"
                          name='keyword'
                          value={this.setState.keyword}
                          placeholder="Nhap vao tu khoa"
                          onChange={this.onchanges}
                    >
                    </input>
                    <button 
                            className="bnt-blue"
                            onClick={this.onsearch}
                            >
                              Tim kiem
                    </button>
                    <button className="bnt-blue" onClick={this.onset}>Sap Xep</button>
                    {
                       this.state.hideorshow && 
                          <div className="dropdow">
                            <ul className="inputwidth">
                                <li
                                  onClick={ ()=>this.onClick('name', 1)}
                                >
                                  <a>a-z</a>
                                </li>

                                <li
                                  onClick={ ()=>this.onClick('name', -1)}
                                  >
                                  <a>z-a</a>
                                </li>
                            </ul>
                          </div>
                     }
                    
                </div>
      </div>
    )
  }
}
export default Controls;