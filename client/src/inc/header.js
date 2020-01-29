import React from 'react';

export class Header extends React.Component {
    constructor() {
        super()
    }

    render() {
        const loginData = this.props.loginData();
        const handleClick = function () {
            localStorage.removeItem('login')
            localStorage.removeItem('token')
            window.location.reload();
        }
        let layout = (
            <div className="member-info">
                <div className="name">{loginData.userName}</div>
                <div className="img">
                    <img src="" alt="" />
                </div>
                &nbsp;
                <button style={{ cursor: 'pointer' }} onClick={handleClick}>ログアウト</button>
            </div>
        );
        return (
            <div>
                {layout}
                <div className="img" style={{ paddingTop: '210px' }}>
                    <a href="#" className="logo" alt="todo" title="todo" />
                </div>
            </div>
        )
    }
}
