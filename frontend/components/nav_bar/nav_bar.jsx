import React from 'react';
import { Link } from 'react-router-dom';
import ProfileNavLinksContainer from './profile_nav_links_container';

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profile_links: [
                {id: 1, title: '个人主页'},
                {id: 2, title: '账号设置'},
                {id: 3, title: '我的评价'},
                {id: 4, title: '收藏导师'},
                {id: 5, title: '退出登录'},
            ],
            search: {
                schoolName: '',
                profName: '',
            },
            display_profile_links: false,
            searchingForSchools: true,
            searchTypeChangeDisplay: 'none',
        };

        this.clickDemo = this.clickDemo.bind(this);
        this.clickSignUp = this.clickSignUp.bind(this);
        this.clickLogIn = this.clickLogIn.bind(this);
        this.displayProfileLinks = this.displayProfileLinks.bind(this);
        this.searchSchools = this.searchSchools.bind(this);
        this.searchProfs = this.searchProfs.bind(this);
        this.clickSearchType = this.clickSearchType.bind(this);
        this.changeSearchType = this.changeSearchType.bind(this);
    };

    changeSearchType() {
        if (this.state.searchingForSchools) {
            this.setState({searchingForSchools: false})
        } else {
            this.setState({searchingForSchools: true})
        }
    }

    clickSearchType() {
        if (this.state.searchTypeChangeDisplay === 'none') {
            this.setState({searchTypeChangeDisplay: 'flex'})
        } else {
            this.setState({searchTypeChangeDisplay: 'none'})
        }
    }

    searchSchools(e) {
        e.preventDefault();
        if (this.state.search.schoolName.length > 0) {
            let path = `/schools/${this.state.search.schoolName}`;
            this.props.history.push(path);
        }
    }

    searchProfs(e) {
        e.preventDefault();
        if (this.state.search.profName.length > 0) {
            let path = `/profs/all schools/${this.state.search.profName}`;
            this.props.history.push(path);
        }
    }

    clickDemo(e) {
        e.preventDefault();
        this.props.login({
                email: 'demouser@demo.com',
                first_name: '演示用户',
                password: 'cupcake',
            })
    };

    clickSignUp() {
        let path = '/signup';
        this.props.history.push(path);
    }

    clickLogIn() {
        let path = '/login';
        this.props.history.push(path);
    }

    displayProfileLinks() {
        this.setState({
            display_profile_links: !this.state.display_profile_links,
        });
    };

    update(field) {
        return (e) => {
            let search = {...this.state.search}
            search[field] = e.currentTarget.value;
            this.setState({ search })
        }
    }

    render() {
        const { current_user, location } = this.props;
        let profile_links = null;
        if ( this.state.display_profile_links ) {
            profile_links = (
                <>
                    {
                        this.state.profile_links.map((profile_link, index) => {
                            return <ProfileNavLinksContainer key={profile_link.id}
                                    title={profile_link.title} history={this.props.history}/>
                        })
                    }
                </>
            )
        }
        if (current_user) {
            return (
                <header>
                    <div className='nav-bar'>
                        <Link to='/'><div className='brand-text'>UniBridge</div></Link>
                        <div className='navbar-search'>
                            {this.state.searchingForSchools ? 
                            <div className='navbar-search-type'>
                                <div className='navbar-search-type-current' 
                                    onClick={this.clickSearchType}>
                                    <div className='navbar-search-type-current-label'>院校</div>
                                    {this.state.searchTypeChangeDisplay === 'none' ? 
                                    <i className="fas fa-chevron-down"></i> :
                                    <i className="fas fa-chevron-up"></i>}
                                </div>
                                <div 
                                    className='navbar-search-type-change'
                                    style={{display: this.state.searchTypeChangeDisplay}}
                                    onClick={this.changeSearchType}>
                                    <div>导师</div>
                                </div>
                            </div> : 
                            <div className='navbar-search-type'>
                                <div className='navbar-search-type-current' 
                                    onClick={this.clickSearchType}>
                                    <div className='navbar-search-type-current-label'>导师</div>
                                    {this.state.searchTypeChangeDisplay === 'none' ? 
                                    <i className="fas fa-chevron-down"></i> :
                                    <i className="fas fa-chevron-up"></i>}
                                </div>
                                <div 
                                    className='navbar-search-type-change'
                                    style={{display: this.state.searchTypeChangeDisplay}}
                                    onClick={this.changeSearchType}>
                                    <div>院校</div>
                                </div>
                            </div>}
                            {this.state.searchingForSchools ? 
                            <form className='navbar-form' onSubmit={this.searchSchools}>
                                <input 
                                    className='navbar-input'
                                    type='text'
                                    value={this.state.search.schoolName}
                                    onChange={this.update('schoolName')}>
                                </input>
                            </form> :
                            <form className='navbar-form' onSubmit={this.searchProfs}>
                                <input 
                                    className='navbar-input'
                                    type='text'
                                    value={this.state.search.profName}
                                    onChange={this.update('profName')}>
                                </input>
                            </form>}
                        </div>
                        <button onClick={this.displayProfileLinks} id='hey-button'>你好，{current_user.first_name}</button>
                    </div>
                    <div id='profile-nav-links-container'>
                        <ul id='profile-nav-links'>
                            {profile_links}
                        </ul>
                    </div>
                </header>
            )
        } else {
            if (location.pathname === '/login') {
                return (
                    <header>
                        <div>
                            <div className='nav-bar'>
                                <Link to='/'><div className='brand-text'>UniBridge</div></Link>
                                <div className='navbar-search'>
                                    {this.state.searchingForSchools ? 
                                    <div className='navbar-search-type'>
                                        <div className='navbar-search-type-current' 
                                            onClick={this.clickSearchType}>
                                            <div className='navbar-search-type-current-label'>院校</div>
                                            {this.state.searchTypeChangeDisplay === 'none' ? 
                                            <i className="fas fa-chevron-down"></i> :
                                            <i className="fas fa-chevron-up"></i>}
                                        </div>
                                        <div 
                                            className='navbar-search-type-change'
                                            style={{display: this.state.searchTypeChangeDisplay}}
                                            onClick={this.changeSearchType}>
                                            <div>导师</div>
                                        </div>
                                    </div> : 
                                    <div className='navbar-search-type'>
                                        <div className='navbar-search-type-current' 
                                            onClick={this.clickSearchType}>
                                            <div className='navbar-search-type-current-label'>导师</div>
                                            {this.state.searchTypeChangeDisplay === 'none' ? 
                                            <i className="fas fa-chevron-down"></i> :
                                            <i className="fas fa-chevron-up"></i>}
                                        </div>
                                        <div 
                                            className='navbar-search-type-change'
                                            style={{display: this.state.searchTypeChangeDisplay}}
                                            onClick={this.changeSearchType}>
                                            <div>院校</div>
                                        </div>
                                    </div>}
                                    {this.state.searchingForSchools ? 
                                    <form className='navbar-form' onSubmit={this.searchSchools}>
                                        <input 
                                            className='navbar-input'
                                            type='text'
                                            value={this.state.search.schoolName}
                                            onChange={this.update('schoolName')}>
                                        </input>
                                    </form> :
                                    <form className='navbar-form' onSubmit={this.searchProfs}>
                                        <input 
                                            className='navbar-input'
                                            type='text'
                                            value={this.state.search.profName}
                                            onChange={this.update('profName')}>
                                        </input>
                                    </form>}
                                </div>
                                <div className='session-buttons'>
                                    <button onClick={this.clickSignUp}>注册</button>
                                    <button onClick={this.clickDemo} id='demo-button'>演示登录</button>
                                </div>
                            </div>
                        </div>
                    </header>
                )
            } else if (location.pathname === '/signup') {
                return (
                    <header>
                        <div>
                            <div className='nav-bar'>
                                <Link to='/'><div className='brand-text'>UniBridge</div></Link>
                                <div className='navbar-search'>
                                    {this.state.searchingForSchools ? 
                                    <div className='navbar-search-type'>
                                        <div className='navbar-search-type-current' 
                                            onClick={this.clickSearchType}>
                                            <div className='navbar-search-type-current-label'>院校</div>
                                            {this.state.searchTypeChangeDisplay === 'none' ? 
                                            <i className="fas fa-chevron-down"></i> :
                                            <i className="fas fa-chevron-up"></i>}
                                        </div>
                                        <div 
                                            className='navbar-search-type-change'
                                            style={{display: this.state.searchTypeChangeDisplay}}
                                            onClick={this.changeSearchType}>
                                            <div>导师</div>
                                        </div>
                                    </div> : 
                                    <div className='navbar-search-type'>
                                        <div className='navbar-search-type-current' 
                                            onClick={this.clickSearchType}>
                                            <div className='navbar-search-type-current-label'>导师</div>
                                            {this.state.searchTypeChangeDisplay === 'none' ? 
                                            <i className="fas fa-chevron-down"></i> :
                                            <i className="fas fa-chevron-up"></i>}
                                        </div>
                                        <div 
                                            className='navbar-search-type-change'
                                            style={{display: this.state.searchTypeChangeDisplay}}
                                            onClick={this.changeSearchType}>
                                            <div>院校</div>
                                        </div>
                                    </div>}
                                    {this.state.searchingForSchools ? 
                                    <form className='navbar-form' onSubmit={this.searchSchools}>
                                        <input 
                                            className='navbar-input'
                                            type='text'
                                            value={this.state.search.schoolName}
                                            onChange={this.update('schoolName')}>
                                        </input>
                                    </form> :
                                    <form className='navbar-form' onSubmit={this.searchProfs}>
                                        <input 
                                            className='navbar-input'
                                            type='text'
                                            value={this.state.search.profName}
                                            onChange={this.update('profName')}>
                                        </input>
                                    </form>}
                                </div>
                                <div className='session-buttons'>
                                    <button onClick={this.clickLogIn} id='login-button'>登录</button>
                                    <button onClick={this.clickDemo} id='demo-button'>演示登录</button>
                                </div>
                            </div>
                        </div>
                    </header>
                )
            } else {
                return (
                    <header>
                            <div className='nav-bar'>
                                <Link to='/'><div className='brand-text'>UniBridge</div></Link>
                                <div className='navbar-search'>
                                    {this.state.searchingForSchools ? 
                                    <div className='navbar-search-type'>
                                        <div className='navbar-search-type-current' 
                                            onClick={this.clickSearchType}>
                                            <div className='navbar-search-type-current-label'>院校</div>
                                            {this.state.searchTypeChangeDisplay === 'none' ? 
                                            <i className="fas fa-chevron-down"></i> :
                                            <i className="fas fa-chevron-up"></i>}
                                        </div>
                                        <div 
                                            className='navbar-search-type-change'
                                            style={{display: this.state.searchTypeChangeDisplay}}
                                            onClick={this.changeSearchType}>
                                            <div>导师</div>
                                        </div>
                                    </div> : 
                                    <div className='navbar-search-type'>
                                        <div className='navbar-search-type-current' 
                                            onClick={this.clickSearchType}>
                                            <div className='navbar-search-type-current-label'>导师</div>
                                            {this.state.searchTypeChangeDisplay === 'none' ? 
                                            <i className="fas fa-chevron-down"></i> :
                                            <i className="fas fa-chevron-up"></i>}
                                        </div>
                                        <div 
                                            className='navbar-search-type-change'
                                            style={{display: this.state.searchTypeChangeDisplay}}
                                            onClick={this.changeSearchType}>
                                            <div>院校</div>
                                        </div>
                                    </div>}
                                    {this.state.searchingForSchools ? 
                                    <form className='navbar-form' onSubmit={this.searchSchools}>
                                        <input 
                                            className='navbar-input'
                                            type='text'
                                            value={this.state.search.schoolName}
                                            onChange={this.update('schoolName')}>
                                        </input>
                                    </form> :
                                    <form className='navbar-form' onSubmit={this.searchProfs}>
                                        <input 
                                            className='navbar-input'
                                            type='text'
                                            value={this.state.search.profName}
                                            onChange={this.update('profName')}>
                                        </input>
                                    </form>}
                                </div>
                                <div className='session-buttons'>
                                    <button onClick={this.clickLogIn} id='login-button'>登录</button>
                                    <button onClick={this.clickSignUp}>注册</button>
                                    <button onClick={this.clickDemo} id='demo-button'>演示登录</button>
                                </div>
                            </div>
                    </header>
                )
            }
        }
    }
};

export default NavBar;