import React, { Component } from 'react';
import './App.css';
import Additems from './components/add';
import Controls from './components/controls';
import Listitems from './components/listitems';


class App extends Component{
  constructor(){
    super();
    this.state={
      tasks: [],
      isconplateshow: false,
      taskupdate: '',
      fillter: {
        name: '',
        status: -1
      },
      keyword: '',
      sortby: '',
      sortvalue: -1
    }
    this.taoitems= this.taoitems.bind(this);
  }
// reset lại thì công việc sẽ lưu vào localStorage và không bị mất đi
  componentWillMount(){
    if(localStorage && localStorage.getItem('task')){
      var taa = JSON.parse(localStorage.getItem('task'));

      this.setState({
        tasks: taa
      })
    }
  }
// button tạo các công việc cho list items
  taoitems(){
    var tasks =[
      {
        id: this.getId(),
        name: "Học Reactjs",
        status: true
      },
      {
        id: this.getId(),
        name: "Học java",
        status: true
      },
      {
        id: this.getId(),
        name: "Học php",
        status: false
      }
    ];
    this.setState({
      tasks: tasks
    })
    localStorage.setItem('task', JSON.stringify(tasks));
  }
  // hàm tạo ngẫu nhiên cho hàm tạo id 
  setid(){
    return Math.random()
  }
// tạo id cho công việc
  getId(){
    return this.setid() + this.setid() + '-' + this.setid() + '-' + this.setid() + '-' + this.setid() + '-' + this.setid() + '-' + this.setid() + '-' + this.setid();
  }
// hiển thị hoặc ẩn form add item
  setshow = ()=>{
    if(this.state.isconplateshow === true && this.state.taskupdate != ''){
      this.setState({
        isconplateshow: true,
        taskupdate: ''
      });
    }else{
      this.setState({
        isconplateshow: !this.state.isconplateshow,
        taskupdate: ''
      });
    }
   
  }
// thêm công việc vào list danh sách 
  Push=(data)=>{
    var { tasks } = this.state;
    if(data.id === ''){
      data.id = this.getId();
      tasks.push(data);
    }
    else{
      var resul ='';
      tasks.forEach((item, index)=>{
        if(item.id === data.id){
          resul = index;
        }
        return resul;
    });
    tasks[resul]= data;
    }
    this.setState({
      tasks: tasks,
      taskupdate: ''
    });
    localStorage.setItem('task', JSON.stringify(tasks));
  }


  // xóa công việc khỏi list items

  ondelete=(id)=>{
    var { tasks } = this.state;
    var resul = "";
    tasks.forEach((item, index)=>{
        if(item.id === id){
          resul = index;
        }
        return resul;
    });
    tasks.splice(resul, 1);

    this.setState({
      tasks : tasks
    });  }
  // thay đổi lại trạng thái của item
  changeStatus=(id)=>{
    var { tasks } = this.state;
    var resul = "";
    tasks.forEach((item, index)=>{
        if(item.id === id){
          resul = index;
        }
        return resul;
    });
    tasks[resul].status = !tasks[resul].status;

    this.setState({
      tasks : tasks
    });
  }
// đóng form

hidendForm=()=>{
  this.setState({
    isconplateshow: true
  })
}
  // update item

  onUpdate=(id)=>{
    var { tasks } = this.state;
    var resul = "";
    tasks.forEach((item, index)=>{
        if(item.id === id){
          resul = index;
        }
        return resul;
    });
    var update = tasks[resul];
    this.setState({
      taskupdate: update
    })
    this.hidendForm();
  }


  // fillter
  onfillter= (filltername, fillterstatus)=>{
    fillterstatus = parseInt(fillterstatus);
    this.setState({
      fillter :{
        name: filltername.toLowerCase(),
        status: fillterstatus
      }
    });
    
  }

  // tìm kiếm 
  onsearch=(key)=>{
    this.setState({
      keyword: key.toLowerCase()
    });
  }
  //sắp xếp theo yêu cầu

  onsort=(sortby, sortvalue)=>{
    this.setState({
      sortby: sortby,
      sortvalue: sortvalue
    });
  }
  render(){

    var {tasks, taskupdate, fillter, keyword, sortby, sortvalue} = this.state;
    if(fillter){
      if(fillter.name){
        tasks = tasks.filter((task)=>{
          return task.name.toLowerCase().indexOf(fillter.name) !== -1;
        });
      }
      tasks = tasks.filter((task)=>{
        if(fillter.status === -1){
          return task ;
        }else{
          return task.status === (fillter.status === 1 ? true : false);
        }
      });
    }
    if(keyword
      ){
      tasks = tasks.filter((task)=>{
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }
   if(sortby === 'name'){
    tasks.sort((a, b)=>{
      if(a.name > b.name){
        return sortvalue;
      }else if(a.name < b.name){
        return -sortvalue;
      }
      else return 0;
    })
   }

  return (
    <div className="App">
      <div className="header">
        <h2>
          quản lý công việc
        </h2>
      </div>

      {/* noi dung */}
      <div className="container">
         
      {
        this.state.isconplateshow === true && <Additems Push={this.Push} 
                                                        show={this.setshow}
                                                        update={taskupdate}
                                                        />
      }

        <div className={this.state.isconplateshow === true ? 'control-item pd boder' : 'control-all pd boder'}>
          <Controls 
                    func={this.taoitems}
                    show={this.setshow}
                    onsearch={this.onsearch}
                    onsort={this.onsort}
                    />
          <Listitems 
            data={tasks} 
            changeStatus={this.changeStatus}
            onUpdate={this.onUpdate}
            ondelete={this.ondelete}
            onfillter={this.onfillter}
            />
        </div>
      </div>
    </div>
  );
  }
}

export default App;
