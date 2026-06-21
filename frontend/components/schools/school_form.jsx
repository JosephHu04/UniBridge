import React from "react";
import {Link} from 'react-router-dom'

class SchoolForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.props.school;

        this.submitSchoolForm = this.submitSchoolForm.bind(this);
        this.clickCancel = this.clickCancel.bind(this);
    }

    clickCancel() {
        this.props.history.goBack()
    }

    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value })
    }

    submitSchoolForm(e) {
        e.preventDefault();
        this.props.createSchool(this.state)
        .then((res) => {
            this.props.history.push(`/schoolRatings/${Object.values(res.payload.schools)[0].id}`)
        });
    };

    componentDidMount() {
        this.props.clearErrors();
    }

    render() {
        return (
            <form onSubmit={this.submitSchoolForm} className='page school-prof-form'>
                <div className='school-prof-form-header'>添加学校</div>
                <div className='school-prof-form-important'>提交前请先搜索，确认该学校尚未存在。</div>
                <div className='school-prof-form-row'>
                    <div className='school-prof-form-label'>学校名称</div>
                    <input
                        className='school-prof-form-input'
                        type='text'
                        value={this.state.name}
                        onChange={this.update('name')}>
                    </input>
                    {this.props.school_errors.includes("Name can't be blank") ? <div className='prof-form-school-name-error error'>学校名称不能为空。</div> : null }
                </div>
                <div className='school-prof-form-row'>
                    <div className='school-prof-form-label'>地区</div>
                    <input
                        className='school-prof-form-input'
                        type='text'
                        value={this.state.state}
                        onChange={this.update('state')}
                        placeholder="例如：澳门、香港、台湾">
                    </input>
                    {this.props.school_errors.includes("State can't be blank") ? <div className='prof-form-school-name-error error'>地区不能为空。</div> : null }
                </div>
                <div className='school-prof-form-row'>
                    <div className='school-prof-form-label'>城市</div>
                    <input
                        className='school-prof-form-input'
                        type='text'
                        value={this.state.city}
                        onChange={this.update('city')}>
                    </input>
                    {this.props.school_errors.includes("City can't be blank") ? <div className='prof-form-school-name-error error'>城市不能为空。</div> : null }
                </div>
                <div className='school-prof-form-row'>
                    <div className='school-prof-form-label'>官网链接</div>
                    <input
                        className='school-prof-form-input'
                        type='text'
                        value={this.state.website}
                        onChange={this.update('website')}
                        placeholder="粘贴学校官网 URL">
                    </input>
                    {this.props.school_errors.includes("Website can't be blank") ? <div className='prof-form-school-name-error error'>官网链接不能为空。</div> : null }
                    {this.props.school_errors.includes("Website has already been taken") ? <div className='prof-form-school-name-error error'>该官网已被使用</div> : null }
                </div>
                <div className='school-prof-form-submit-cancel'>
                    <div className='school-prof-form-submit-cancel-column'>
                        <input type='submit' className='school-prof-form-submit'></input>
                        <div className="school-prof-form-cancel" onClick={this.clickCancel}>取消</div>
                    </div>
                </div>
            </form>
        )
    }
}

export default SchoolForm;