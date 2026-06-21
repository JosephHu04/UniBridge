import React from "react";
import {Link} from 'react-router-dom';
import AccountLinks from './account_links';

class EditUserForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            emailChange: {
                id: this.props.user.id,
                email: this.props.user.email,
                password: '',
                updatingEmail: true,
            },
            passwordChange: {
                id: this.props.user.id,
                email: this.props.user.email,
                newPassword: '',
                oldPassword: '',
                updatingPassword: true,
            }
        }

        this.changeEmail = this.changeEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.clickCancel = this.clickCancel.bind(this);
    };

    clickCancel() {
        this.props.history.goBack()
    }

    componentDidMount() {
        this.props.clearErrors();
    }

    updateEmailForm(field) {
        let emailChange = {...this.state.emailChange}
        return e => {
            emailChange[field] = e.currentTarget.value;
            this.setState({emailChange})
        }
    }

    updatePasswordForm(field) {
        let passwordChange = {...this.state.passwordChange}
        return e => {
            passwordChange[field] = e.currentTarget.value;
            this.setState({passwordChange})
        }
    }

    changeEmail(e) {
        e.preventDefault();
        this.props.updateEmail(this.state.emailChange)
        .then(() => this.props.history.push(`/account/${this.props.user.id}`));
    }

    changePassword(e) {
        e.preventDefault();
        this.props.updatePassword(this.state.passwordChange)
        .then(() => this.props.history.push(`/account/${this.props.user.id}`));
    }

    render() {
        const {user} = this.props;
        return (
            <div className="page">
                <div className="account-header">你好，{user.first_name}</div>
                <AccountLinks 
                location={this.props.match.path}
                user={user}/>
                <form onSubmit={this.changeEmail} className='edit-user-form-proper'>
                    <div className='edit-user-form-header'>修改邮箱</div>
                    <div className='edit-user-form-input-row'>
                        <div className='edit-user-form-label'>新邮箱</div>
                        <input 
                            type='text'
                            value={this.state.emailChange.email}
                            onChange={this.updateEmailForm('email')}
                            className="edit-user-form-input">
                        </input>
                    {this.props.changeEmailErrors.includes("Email cannot be blank") ? <div className='prof-form-school-name-error error'>邮箱不能为空</div> : null }
                    </div>
                    <div className='edit-user-form-input-row'>
                        <div className='edit-user-form-label'>密码</div>
                        <input 
                            type='password'
                            value={this.state.emailChange.password}
                            onChange={this.updateEmailForm('password')}
                            className="edit-user-form-input">
                        </input>
                        {this.props.changeEmailErrors.includes("Incorrect password") ? <div className='prof-form-school-name-error error'>密码不正确</div> : null }
                    </div>
                    <div className='edit-user-form-submit-cancel-row'>
                        <div className='edit-user-form-submit-cancel-col'>
                            <input 
                                type='submit' 
                                className='edit-user-form-submit edit-user-button' 
                                value='更新邮箱'>
                            </input>
                            <div className="edit-user-form-cancel link cancel" onClick={this.clickCancel}>取消</div>
                        </div>
                    </div>
                    <div className='edit-user-form-border'></div>
                </form>
                <form onSubmit={this.changePassword} className='edit-user-form-proper'>
                    <div className="edit-user-form-header">修改密码</div>
                    <div className="edit-user-form-input-row">
                        <div className="edit-user-form-label">旧密码</div>
                        <input
                            type='password'
                            value={this.state.passwordChange.oldPassword}
                            onChange={this.updatePasswordForm('oldPassword')}
                            className="edit-user-form-input">
                        </input>
                        {this.props.changePasswordErrors.includes("Incorrect password") ? <div className='prof-form-school-name-error error'>密码不正确</div> : null }
                    </div>
                    <div className="edit-user-form-input-row">
                        <div className="edit-user-form-label">新密码</div>
                        <input
                            type='password'
                            value={this.state.passwordChange.newPassword}
                            onChange={this.updatePasswordForm('newPassword')}
                            className="edit-user-form-input">
                        </input>
                        {this.props.changePasswordErrors.includes("Password is too short, must be at least 6 characters") ? <div className='prof-form-school-name-error error'>密码过短，至少需要 6 位</div> : null }
                    </div>
                    <div className='edit-user-form-submit-cancel-row'>
                        <div className='edit-user-form-submit-cancel-col'>
                            <input 
                                type='submit' 
                                className='edit-user-form-submit edit-user-button' 
                                value='更新密码'>
                            </input>
                            <div className="edit-user-form-cancel link cancel" onClick={this.clickCancel}>取消</div>
                        </div>
                    </div>
                    <div className='edit-user-form-border'></div>
                    <div className="edit-user-form-header">删除账号</div>
                    <Link 
                        to={`/account/delete/${user.id}`}
                        id='edit-user-form-delete'
                        className="link">
                        <i className="fas fa-trash-alt" id='delete-icon'></i>前往删除账号
                    </Link>
                </form>
            </div>
        )
    }
}

export default EditUserForm