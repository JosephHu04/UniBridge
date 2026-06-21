import React from 'react';
import {Link} from 'react-router-dom';

class ProfForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            prof: {
                id: null,
                first_name: "",
                last_name: "",
                subject: "",
                school_name: "",
            },
            searchDisplay: 'none'
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clickSchool = this.clickSchool.bind(this)
        this.displaySearch = this.displaySearch.bind(this)
        this.hideSearch = this.hideSearch.bind(this)
        this.clickCancel = this.clickCancel.bind(this)
    }

    clickCancel() {
        this.props.history.goBack()
    }

    update(field) {
        return e => {
            let prof = {...this.state.prof}
            prof[field] = e.currentTarget.value;
            this.setState({prof})
        }
    };

    clickSchool(e) {
        let prof = {...this.state.prof}
        prof.school_name = e.currentTarget.children[0].innerText;
        this.setState({prof})
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.action(this.state.prof)
        .then((res) => this.props.history.push(`/profs/${Object.values(res.payload.profs)[0].id}`));
    };

    componentDidMount() {
        if (this.props.match.path === "/profs/edit/:profId") {
            this.props.requestProf(this.props.match.params.profId)
        }
        this.props.requestSchools()
        this.props.clearErrors();
    }

    componentDidUpdate(prevProps) {
        if (this.props.prof.first_name && prevProps.prof !== this.props.prof) {
            this.setState({prof: this.props.prof})
        }
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
            if (schools[i].name.toLowerCase().includes(this.state.prof.school_name.toLowerCase())) {
                filterdSchools.push(schools[i])
            }
        }
        return filterdSchools
    }

    render() {
        const { schools } = this.props;
        let filteredSchools = this.filterSchools(schools);

        return (
            <form onSubmit={this.handleSubmit} className='page school-prof-form'>
                <div className='school-prof-form-header'>{this.props.formType}</div>
                <div className='school-prof-form-important'>提交前请先搜索，确认该导师尚未被添加到当前学校。</div>
                <div className='school-prof-form-row'>
                    <div className='school-prof-form-label'>学校名称</div>
                    <input
                        onFocus={this.displaySearch}
                        onBlur={this.hideSearch}
                        className='school-prof-form-input'
                        type='text'
                        value={this.state.prof.school_name}
                        onChange={this.update('school_name')}>
                    </input>
                    {this.props.prof_errors.includes("School not found") ? <div className='prof-form-school-name-error error'>未找到该学校</div> : null }
                </div>
                <div className='prof-form-school-search-container'>
                    <ul className='edit-profile-school-search'
                        style={{display: this.state.searchDisplay}}>
                        {
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
                <div className='school-prof-form-row'>
                    <div className='school-prof-form-label'>导师名</div>
                    <input
                        className='school-prof-form-input'
                        type='text'
                        value={this.state.prof.first_name}
                        onChange={this.update('first_name')}>
                    </input>
                    {this.props.prof_errors.includes("First name cannot be blank") ? <div className='prof-form-school-name-error error'>导师名不能为空</div> : null }
                </div>
                <div className='school-prof-form-row'>
                    <div className='school-prof-form-label'>导师姓</div>
                    <input
                        className='school-prof-form-input'
                        type='text'
                        value={this.state.prof.last_name}
                        onChange={this.update('last_name')}>
                    </input>
                    {this.props.prof_errors.includes("Last name cannot be blank") ? <div className='prof-form-school-name-error error'>导师姓不能为空</div> : null }
                </div>
                <div className='school-prof-form-row'>
                    <div className='school-prof-form-label'>院系/方向</div>
                    <input
                        className='school-prof-form-input'
                        type='text'
                        value={this.state.prof.subject}
                        onChange={this.update('subject')}>
                    </input>
                    {this.props.prof_errors.includes("Department cannot be blank") ? <div className='prof-form-school-name-error error'>院系不能为空</div> : null }
                </div>
                <div className='school-prof-form-submit-cancel'>
                    <div className='school-prof-form-submit-cancel-column'>
                        <input type='submit' className='school-prof-form-submit'></input>
                        <div className='school-prof-form-cancel cancel' onClick={this.clickCancel}>取消</div>
                    </div>
                </div>
            </form>
        )
    }
};

export default ProfForm;