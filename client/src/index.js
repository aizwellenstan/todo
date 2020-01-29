import React from 'react';
import { render } from 'react-dom';

import { Header } from './inc/header';
import { Footer } from './inc/footer';
import { TodoForm } from './todoForm';
import { TodoList } from './todoList';
import { Login } from './login';

import { library } from '@fortawesome/fontawesome-svg-core'; //fontawesomeのコアファイル
// import { fab } from '@fortawesome/free-brands-svg-icons'; //fontawesomeのbrandアイコンのインポート
import { fas } from '@fortawesome/free-solid-svg-icons'; //fontawesomeのsolidアイコンのインポート
import { far } from '@fortawesome/free-regular-svg-icons'; //fontawesomeのregularアイコンのインポート
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fas, far); //他のコンポーネントから簡単に呼び出せるようにするための登録処理？



class TodoApp extends React.Component {
    constructor() {
        super();
        this.state = {
            userSession: TodoApp.getUserSessionData(),
            tasks: [],
            sort: 'end_time ASC',
            searchTerm: '',
            filteredList: []
        };
        this.addTask = this.addTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.doneTask = this.doneTask.bind(this);
        this.doLogin = this.doLogin.bind(this);
        this.sortTask = this.sortTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.uri = 'http://127.0.0.1:3000/tasks/'
        this.uri = 'https://fivexruby-server.herokuapp.com/tasks/'
    }

    componentWillMount() {
        if (localStorage.getItem('login')) {
            this.refreshTasks()
        }
    }

    sortTask(sort) {
        this.setState({
            sort: sort
        })
        setTimeout(() => {
            this.refreshTasks()
        }, 1000)
    }

    refreshTasks() {
        function handleErrors(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }

        let userName = JSON.parse(localStorage.getItem('login')).userName

        fetch(`${this.uri}?sort=${this.state.sort}`, {
            headers: { 'username': userName },
            method: 'get'
        })
            .then(handleErrors)
            .then(
                response =>
                    response.json().then(data => ({
                        data: data,
                        status: response.status
                    }))
            )
            .then(res => {
                if (res.data) {
                    this.setState({
                        tasks: res.data,
                        filteredList: res.data
                    });
                }
            })
            .catch(function (err) {
                alert('Fetch エラー : サーバー死んだ');
            });
    }

    static getUserSessionData() {
        let loginData = localStorage.getItem('login');
        loginData = JSON.parse(loginData);
        if (loginData !== null && loginData.login === true) {
            return { userName: loginData.userName };
        } else {
            return false;
        }
    }

    static isLogged() {
        let loginData = localStorage.getItem('login');
        loginData = JSON.parse(loginData);
        if (loginData !== null && loginData.login === true) {
            return true;
        }
        return false;
    }

    doLogin(userName) {
        let loginData = {
            login: true,
            userName: userName
        };
        this.setState({
            userSession: {
                userName: loginData.userName,
            }
        });
        loginData = JSON.stringify(loginData);
        localStorage.setItem('login', loginData);
    }

    addTask(task, body, start, end, level) {
        if (task !== '') {
            let userName = this.state.userSession.userName
            fetch(this.uri, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(
                    {
                        text: task,
                        body: body,
                        status: 'onhand',
                        username: userName,
                        start_time: start,
                        end_time: end,
                        level: level
                    }
                )
            })
                .then(
                    this.setState({
                        tasks: []
                    }),
                    setTimeout(() => {
                        this.refreshTasks()
                    }, 1000)
                )
        } else {
            alert('何もない')
        }

        // .then(
        //     response =>
        //         response.json().then(data => ({
        //             data: data,
        //             status: response.status
        //         }))
        // )
        // .then(res => {
        //     if (res.data) {
        //         this.setState({
        //             tasks: res.data
        //         });
        //     }
        // })
    }

    removeTask(task_id) {
        if (this.state.tasks.length == 0) {
            alert('もう何もない')
        } else {
            let taskid = this.state.tasks[task_id].id
            fetch(this.uri + taskid, {
                method: 'delete',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                }
            })
                .then(
                    this.setState({
                        tasks: []
                    }),
                    setTimeout(() => {
                        this.refreshTasks()
                    }, 1000)
                )
        }
    }

    doneTask(task_id) {
        function handleErrors(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }

        let task = this.state.tasks[task_id]
        if (task.status) {
            task.status == 'passive' ?
                task.status = 'active' : task.status = 'passive'

            fetch(this.uri + task.id, {
                method: 'put',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(
                    task
                )
            })
                .then(
                    this.setState({
                        tasks: []
                    }),
                    setTimeout(() => {
                        this.refreshTasks()
                    }, 1000)
                )
                .catch(function (err) {
                    console.log(err)
                    alert('Fetch エラー : サーバー死んだ');
                });
        } else {
            alert('もう此処にいない')
        }
    }

    handleChange = event => {
        var searchTerm = event.target.value
        this.setState({ searchTerm: searchTerm })
        var filteredList = this.state.tasks.filter(task => {
            return task.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.body.toLowerCase().includes(searchTerm.toLowerCase())
        })
        this.setState({ filteredList: filteredList })
    };

    render() {
        let layout = (<Login doLogin={this.doLogin} />);
        if (TodoApp.isLogged() === true) {
            layout = (
                <div>
                    <Header loginData={TodoApp.getUserSessionData} />
                    <TodoForm addTask={this.addTask} />
                    <br />
                    <center>
                        <div style={{ marginTop: 1 + 'em' }}>
                            Sort By
                            <br />
                            TimeEnd&nbsp;
                            <FontAwesomeIcon style={{ cursor: 'pointer' }} onClick={() => { this.sortTask('end_time ASC') }} icon={['fas', 'arrow-up']} />
                            <FontAwesomeIcon style={{ cursor: 'pointer' }} onClick={() => { this.sortTask('end_time DESC') }} icon={['fas', 'arrow-down']} />
                            <br />
                            TimeStart&nbsp;
                            <FontAwesomeIcon style={{ cursor: 'pointer' }} onClick={() => { this.sortTask('start_time ASC') }} icon={['fas', 'arrow-up']} />
                            <FontAwesomeIcon style={{ cursor: 'pointer' }} onClick={() => { this.sortTask('start_time DESC') }} icon={['fas', 'arrow-down']} />
                            <br />
                            レベル&nbsp;
                            <FontAwesomeIcon style={{ cursor: 'pointer' }} onClick={() => { this.sortTask('level ASC') }} icon={['fas', 'arrow-up']} />
                            <FontAwesomeIcon style={{ cursor: 'pointer' }} onClick={() => { this.sortTask('level DESC') }} icon={['fas', 'arrow-down']} />
                        </div>
                        <input
                            type="text"
                            placeholder="探す"
                            value={this.state.searchTerm}
                            onChange={(e) => { this.handleChange(e) }}
                        />
                    </center>
                    <TodoList myList={this.state.filteredList} addTask={this.addTask} removeTask={this.removeTask}
                        doneTask={this.doneTask} />
                    <Footer />
                </div >
            );
        }
        return (
            <div>
                <div className="content">
                    {layout}
                </div>
            </div>
        )
    }
}

render(<TodoApp />, document.getElementById('appRoot'));
