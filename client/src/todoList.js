import React from 'react';

export class TodoList extends React.Component {
    constructor() {
        super();
        this.remove = this.remove.bind(this);
        this.done = this.done.bind(this);
        this.changeList = this.changeList.bind(this);
        this.state = { activeList: '全て' };
    }

    componentUpdate() {
        this.scrollToBottom()
    }

    remove(e) {
        this.props.removeTask(e.target.parentNode.id);
    }

    done(e) {
        this.props.doneTask(e.target.parentNode.id);
    }

    scrollToBottom() {
        var objDiv = document.getElementById('todoList');
        var height = document.getElementById('todoList').scrollHeight;
        objDiv.scrollTop = height
    }

    changeList(e) {
        var listChanger = document.getElementById('listChanger');
        var li = listChanger.querySelectorAll('li');
        for (let i = 0; i < li.length; i++) {
            li[i].classList.remove('active');
        }
        var activeLi = e.target.parentNode;
        console.log(activeLi.innerText)
        activeLi.classList.add('active');
        this.setState({ activeList: activeLi.innerText });
    }

    render() {
        let items_left = 0;
        const items = this.props.myList.map((elem, i) => {
            let task_id = elem.id;
            if (
                this.state.activeList === '全て' ||
                (this.state.activeList === '保留中' && elem.status === 'onhand') ||
                (this.state.activeList === '作業中' && elem.status === 'passive') ||
                (this.state.activeList === '完了' && elem.status === 'active')
            ) {
                if (elem.status === 'onhand' || elem.status === 'passive') {
                    items_left++;
                }
                return (
                    <li key={i} id={i} className={elem.status}>
                        <span className="id">{i + 1}</span>
                        <span className="title">
                            <span className={
                                `${elem.level == "0" ?
                                    "green" : (
                                        elem.level == '1' ?
                                            "yellow" : "red")
                                }`}>{
                                    `${elem.level == "0" ?
                                        "L" : (
                                            elem.level == '1' ?
                                                "M" : "H")
                                    }`}

                            </span>
                        </span>
                        <span className="title">{elem.text}</span>
                        <span className="title">{elem.body}</span>
                        <span className="title">{`
                            ${new Date(elem.end_time).getMonth() + 1}/
                            ${new Date(elem.end_time).getDate()} 
                            ${new Date(elem.start_time).getHours()}:
                            ${new Date(elem.start_time).getMinutes() != '0' ?
                                new Date(elem.start_time).getMinutes() : '00'
                            }
                        `}
                        </span>-
                        <span className="title">{`
                            ${new Date(elem.end_time).getMonth() + 1}/
                            ${new Date(elem.end_time).getDate()} 
                            ${new Date(elem.end_time).getHours()}:
                            ${new Date(elem.end_time).getMinutes() != '0' ?
                                new Date(elem.end_time).getMinutes() : '00'
                            }
                        `}
                        </span>
                        <span className="type" onClick={this.done} />
                        <span className="delete" onClick={this.remove}></span>
                    </li>
                )
            }
        });
        return (
            <div>
                <div id="todoList" className="todo-list type1"
                    style={{
                        height: 290,
                        overflowY: 'scroll',
                    }}>
                    <ul>
                        {items}
                    </ul>
                </div>
                <div className="todo-filter type1">
                    <div className="left">
                        <span>あと<b>{items_left}</b>こ</span>
                    </div>
                    <div className="right" id="listChanger">
                        <ul>
                            <li className="active" onClick={this.changeList}><span>全て</span></li>
                            <li><span onClick={this.changeList}>保留中</span></li>
                            <li><span onClick={this.changeList}>作業中</span></li>
                            <li><span onClick={this.changeList}>完了</span></li>
                        </ul>
                    </div>
                </div>
            </div >
        );
    }
}