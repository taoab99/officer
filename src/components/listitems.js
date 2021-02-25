import React, { Component } from 'react';
import Item from './item';


class Listitems extends Component{
  constructor(){
    super();
    this.state={
      fillterName: '',
      fillterStatus: -1 
    }

  }
  onchange=(event)=>{
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.props.onfillter(name === 'fillterName' ? value : this.state.fillterName, name === 'fillterStatus' ? value : this.state.fillterStatus);

    this.setState({
      [name]:value
    });
  }
  render(){

    var tasks = this.props.data;
    var {fillterName, fillterStatus} = this.state;
    var element = tasks.map((item, index)=>
      {
       return <Item 
                key={index} 
                id={index} 
                VaLue={item}
                changeStatus={this.props.changeStatus}
                onUpdate={this.props.onUpdate}
                ondelete={this.props.ondelete}
                />
      }
    )
    return (
             <div className="list-items">
                <table>
                <thead>
                    <tr>
                    <th>STT</th>
                    <th>Ten</th>
                    <th>Trang Thai</th>
                    <th>Hanh Dong</th>
                    </tr>
                    <tr>
                    <td></td>
                    <td><input 
                              type="text" 
                              className="inputwidth"
                              name="fillterName"
                              value={fillterName}
                              onChange={this.onchange}
                              >

                        </input>
                    </td>
                    <td>
                        <select 
                          className="inputwidth"
                          name="fillterStatus"
                          value={fillterStatus}
                          onChange={this.onchange}
                        >
                          <option value={-1}>Tat Ca</option>
                          <option value={0}>An</option>
                          <option value={1}>Hien Thi</option>
                        </select>
                    </td>
                    <td></td>
                    </tr>
                    {element}
                </thead>
                </table>
          </div>
    )
  }
}
export default Listitems;