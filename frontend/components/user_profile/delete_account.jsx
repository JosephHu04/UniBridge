import React from 'react';
import {Link} from 'react-router-dom';
import AccountLinks from './account_links';

class DeleteAccount extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.user.id,
            password: '',
        }

        this.deleteAccount = this.deleteAccount.bind(this)
        this.update = this.update.bind(this)
        this.clickCancel = this.clickCancel.bind(this)
    }

    clickCancel() {
        this.props.history.goBack()
    }

    deleteAccount(e) {
        e.preventDefault()
        this.props.deleteUser(this.state)
        .then(() => this.props.history.push(`/signup`));
    }

    update(e) {
        this.setState({password: e.currentTarget.value})
    }

    renderErrors() {
        return (
            <ul>
                {this.props.userErrors.map((error, i) => (
                    <li key={`error-${i}`} className='error'>
                        {error}
                    </li>
                ))}
            </ul>
        )
    }

    render() {
        const {user} = this.props;
        return (
            <form className='page' onSubmit={this.deleteAccount}>
                <div className="account-header">你好，{user.first_name}</div>
                <AccountLinks 
                location={this.props.match.path}
                user={user}/>
                <div id='delete-account-header'>你确定要删除账号吗？</div>
                <ul id='delete-account-list'>
                    <li>删除账号是不可恢复的操作</li>
                    <li>你已发布的评价不会被自动删除</li>
                    <li>删除后你将无法继续编辑既有评价</li>
                </ul>
                <div className='delete-account-row'>确认删除该账号：</div>
                <div className='delete-account-row'>
                    请输入密码以确认
                    <input 
                        type='password'
                        id='delete-account-password'
                        value={this.state.password}
                        onChange={this.update}>
                    </input>
                </div>
                <div id='delete-account-final-row'>
                    <div id='delete-account-final-row-contents'>
                        <input
                            id='delete-account-button' 
                            type='submit'
                            value='删除账号'
                            className='edit-user-button'>
                        </input>
                        <div className='edit-user-form-cancel link cancel' onClick={this.clickCancel}>取消</div>
                    </div>
                </div>
                {this.renderErrors()}
            </form>
        )
    }
}

export default DeleteAccount;