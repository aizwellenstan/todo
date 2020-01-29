import React from 'react';


export class Login extends React.Component {
    constructor() {
        super();
        this.state = ({
            isRegister: false
        })
        this.doLogin = this.doLogin.bind(this);
        this.doRegister = this.doRegister.bind(this);
        // this.uri = 'http://127.0.0.1:3000/'
        this.uri = 'https://fivexruby-server.herokuapp.com/'
    }

    doLogin() {
        const userName = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (userName !== '' && password !== '') {
            fetch(this.uri + 'login', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    'Username': userName,
                    'Password': password
                })
            })
                .then(
                    response =>
                        response.json().then(data => ({
                            data: data,
                            status: response.status
                        }))
                )
                .then(res => {
                    if (res.status === 401) {
                        alert('ユーザ名かパスワードが間違っています');
                    } else {
                        if (res.data.token) {
                            localStorage.setItem('token', res.data.token)
                        }
                        setTimeout(() => {
                            this.props.doLogin(userName);
                            window.location.reload();
                        }, 1000)
                    }
                })
        } else {
            alert('ユーザーネームとパスワードを入力してください');
        }
    }

    doRegister() {
        const userName = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const repeatPassword = document.getElementById('repeatPassword').value;
        if (userName !== '' && password !== '') {
            if (password === repeatPassword) {
                fetch(this.uri + 'signup', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    },
                    body: JSON.stringify({
                        'username': userName,
                        'password': password
                    })
                })
                    .then(
                        response =>
                            response.json().then(data => ({
                                data: data,
                                status: response.status
                            }))
                    )
                    .then(res => {
                        if (res.status === 409) {
                            alert('エラー ユーザー名は既に存在します');
                        } else {
                            setTimeout(() => {
                                this.setState({
                                    isRegister: false
                                })
                            }, 1000)
                        }
                    })
            } else {
                alert('check password')
            }
        } else {
            alert('ユーザーネームとパスワードを入力してください');
        }
    }

    render() {
        const isRegister = this.state.isRegister;
        if (isRegister) {
            return (
                <div className="content">
                    <div className="img">
                        <a href="#" className="logo" alt="todo" title="todo" />
                    </div>
                    <div className="login type1">
                        <div className="input-wrapper">
                            <i className="icon username" />
                            <input className="textbox" type="text" name="username" id="username" placeholder="username or email" />
                        </div>
                        <div className="input-wrapper">
                            <i className="icon password" />
                            <input className="textbox" type="password" name="password" id="password" placeholder="password" />
                        </div>
                        <div className="input-wrapper">
                            <i className="icon password" />
                            <input className="textbox" type="password" name="password" id="repeatPassword" placeholder="repeat password" />
                        </div>
                    </div>
                    <div className="login-options">
                        <button type="button" className="login-btn"
                            onClick={(e) => this.setState({ isRegister: false })}>代わりにログイン</button>
                        <button type="button" className="login-btn" onClick={this.doRegister}>登録</button>
                    </div>
                </div>
            )
        }
        return (
            <div className="content">
                <div className="img">
                    <a href="#" className="logo" alt="todo" title="todo" />
                </div>
                <div className="login type1">
                    <div className="input-wrapper">
                        <i className="icon username" />
                        <input className="textbox" type="text" name="username" id="username" placeholder="username or email" />
                    </div>
                    <div className="input-wrapper">
                        <i className="icon password" />
                        <input className="textbox" type="password" name="password" id="password" placeholder="password" />
                    </div>
                </div>
                <div className="login-options">
                    <button type="button" className="login-btn"
                        onClick={(e) => this.setState({ isRegister: true })}>登録</button>
                    <button type="button" className="login-btn" onClick={this.doLogin}>ログイン</button>
                </div>
            </div>
        )
    }
}
