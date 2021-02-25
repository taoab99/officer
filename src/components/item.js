import React, { Component } from 'react';

class Item extends Component{

    changes=()=>{
        var id = this.props.VaLue.id;
        this.props.changeStatus(id);
    }

    //udate items

    onUpdate=()=>{
        var id = this.props.VaLue.id;
        this.props.onUpdate(id);
    }

    // delete items trong list

    ondelete=()=>{
        this.props.ondelete(this.props.VaLue.id)
    }
    render(){
        return(
                <tr>
                    <td>{this.props.id}</td>
                    <td>{this.props.VaLue.name}</td>
                    <td><span 
                            className={this.props.VaLue.status === true ? "bnt-tomato" : "bg-green"}
                            onClick={this.changes}
                            >
                            {this.props.VaLue.status === true ? "Active" : "Ẩn"}
                        </span>
                    </td>
                    <td>
                        <button 
                            className="bnt-orange"
                            onClick={this.onUpdate}
                            >Sua</button>
                        <button 
                            className="bnt-tomato"
                            onClick={this.ondelete}
                            >Xoa</button>
                    </td>
                </tr>
        )
    }
}
export default Item;