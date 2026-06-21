 import React from 'react';
import {Link} from 'react-router-dom';
import AccountLinks from './account_links';

class EditProfile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            profile: {
                id: this.props.user.id,
                first_name: this.props.user.first_name,
                school_id: this.props.user.school_id,
                updatingProfile: true,
                schoolName: ""
            },
            searchDisplay: 'none'
        }

        this.editProfile = this.editProfile.bind(this)
        this.updateName = this.updateName.bind(this)
        this.updateSchool = this.updateSchool.bind(this)
        this.displaySearch = this.displaySearch.bind(this)
        this.hideSearch = this.hideSearch.bind(this)
        this.clickSchool = this.clickSchool.bind(this)
        this.clickCancel = this.clickCancel.bind(this)
    }

    clickCancel() {
        this.props.history.goBack()
    }

    componentDidMount() {
        this.props.requestSchools()
        this.props.clearErrors();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.schools !== this.props.schools) {
            let profile = {...this.state.profile}
            profile.schoolName = this.props.schools[this.state.profile.school_id].name
            this.setState({profile})
        }
    }

    editProfile(e) {
        e.preventDefault();
        this.props.updateProfile(this.state.profile)
        .then(() => this.props.history.push(`/account/profile/${this.props.user.id}`));
    }

    updateName(e) {
        let profile = {...this.state.profile}
        profile.first_name = e.currentTarget.value;
        this.setState({profile})
    }

    updateSchool(e) {
        let profile = {...this.state.profile}
        profile.schoolName = e.currentTarget.value;
        this.setState({profile})
    }

    displaySearch() {
        this.setState({searchDisplay: 'block'})
    }

    hideSearch() {
        setTimeout(() => {
            this.setState({searchDisplay: 'none'})
        }, 250);
    }

    filterSchools(schools) {
        let filterdSchools = []
        for (let i = 0; i < schools.length; i++) {
            if (schools[i].name.toLowerCase().includes(this.state.profile.schoolName.toLowerCase())) {
                filterdSchools.push(schools[i])
            }
        }
        return filterdSchools
    }

    clickSchool(e) {
        let profile = {...this.state.profile}
        profile.schoolName = e.currentTarget.children[0].innerText;
        this.setState({profile})
    }

    render() {
        const { user, schools } = this.props;
        const schoolList = Object.values(schools);
        let filteredSchools = this.filterSchools(schoolList);

        return (
            <div className='page'>
                <div className='account-header'>你好，{user.first_name}</div>
                <AccountLinks 
                location={this.props.match.path}
                user={user}/>
                <form onSubmit={this.editProfile} className='edit-user-form-proper'>
                    <div className='edit-user-form-input-row'>
                        <div className='edit-user-form-label'>姓名</div>
                        <input 
                            type='text'
                            value={this.state.profile.first_name}
                            onChange={this.updateName}
                            className="edit-user-form-input">
                        </input>
                        {this.props.profileErrors.includes("Name cannot be blank") ? <div className='prof-form-school-name-error error'>姓名不能为空</div> : null }
                    </div>
                    <div className='edit-user-form-input-row'>
                        <div className='edit-user-form-label'>学校</div>
                        <input
                            onFocus={this.displaySearch}
                            onBlur={this.hideSearch}
                            type='text'
                            value={this.state.profile.schoolName}
                            onChange={this.updateSchool}
                            className="edit-user-form-input">
                        </input>
                        {this.props.profileErrors.includes("School not found") ? <div className='prof-form-school-name-error error'>未找到该学校</div> : null }
                    </div>
                    <div className='edit-profile-school-search-container'>
                        <ul className='edit-profile-school-search'
                            style={{display: this.state.searchDisplay}}>{
                            filteredSchools.map((school) => 
                            <li 
                                key={school.id}
                                className='school-li'
                                onClick={this.clickSchool}>
                                <div className='school-li-name'>{school.name}</div>
                                <div className='school-li-location'>{school.city}, {school.state}</div>
                            </li>)
                        }
                            <Link to='/schools/new' className='school-search-add-school'>找不到你的学校？点击这里添加</Link>
                        </ul>
                    </div>
                    <div className='edit-user-form-submit-cancel-row'>
                        <div className='edit-user-form-submit-cancel-col'>
                            <input 
                                type='submit' 
                                className='edit-user-form-submit edit-user-button' 
                                value='保存修改'>
                            </input>
                            <div className='edit-user-form-cancel link cancel' onClick={this.clickCancel}>取消</div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default EditProfile