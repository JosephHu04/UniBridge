import React from 'react';
import {Link} from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.clearErrors();
    }

    handleInput(type) {
        return(e) => {
            this.setState({ [type]: e.target.value });
        };
    };

    handleSubmit(e) {
        e.preventDefault();
        this.props.login(this.state)
        .then(() => this.props.history.push('/'));
    }

    renderErrors() {
        return(
            <ul className='form-errors'>
                {this.props.login_errors.map((error, i) => (
                    <li key={`error-${i}`} id={`error-${i}`}>
                        {error}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        return (
            <div className='session-form' id='login-form'>
                <h2 id='login-header'>登录导师评价平台</h2>
                
                <form id='login-form-proper'>
                    <div id='login-txt'>登录后依然保持匿名，放心交流真实就读体验。</div>
                    <Link to='/signup' id='login-signup-link'>还没有账号？立即注册</Link>
                    <input
                        type='text'
                        value={this.state.email}
                        onChange={this.handleInput('email')}
                        placeholder="邮箱"
                    />
                    <input
                        type='password'
                        value={this.state.password}
                        onChange={this.handleInput('password')}
                        placeholder="密码"
                    />
                    <button onClick={this.handleSubmit} className='login-form-submit'>登录</button>
                </form>
                {this.renderErrors()}
            </div>
        )
    }
}

export default Login;