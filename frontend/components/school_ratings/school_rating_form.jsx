import React from 'react';
import {range} from 'lodash';

class SchoolRatingForm extends React.Component {
    constructor(props) {
        super(props);
        this.nums = _.range(1, 11);
        this.categories = ["reputation", "location", "internet", "food", "opportunities", "facilities", "clubs", "social", "happiness", "safety"]
        this.categoryLabels = {
            reputation: '学校口碑',
            location: '地理位置',
            internet: '网络条件',
            food: '餐饮体验',
            opportunities: '发展机会',
            facilities: '硬件设施',
            clubs: '社团活动',
            social: '社交氛围',
            happiness: '幸福感',
            safety: '校园安全',
        }
        this.state = {
            categories: this.initializeState(this.categories),
            body: '',
            characters: 350
        }

        this.clickCancel = this.clickCancel.bind(this);
        this.submitSchoolRating = this.submitSchoolRating.bind(this);
    }

    clickCancel() {
        this.props.history.goBack();
    }

    initializeState(categories) {
        let state = {}
        for (let i = 0; i < categories.length; i++) {
            state[categories[i]] = 3
        }
        return state
    }

    componentDidMount() {
        this.props.requestSchool(this.props.match.params.schoolId);
        this.props.clearErrors();
    }

    update(field) {
        if (field === 'body') {
            return e => {
                return this.setState({
                [field]: e.currentTarget.value,
                characters: 350 - e.currentTarget.value.length
            })}
        } else {
            return e => {
                let categories = {...this.state.categories}
                categories[field] = e.currentTarget.value
                this.setState({ categories })
            }
        }
    };

    submitSchoolRating(e) {
        e.preventDefault();
        this.props.createSchoolRating({...this.state.categories, comment: this.state.body, school_id: this.props.school.id})
        .then(() => this.props.history.push(`/schoolRatings/${this.props.school.id}`))
    }

    render() {

        const {school} = this.props;

        if (!school) return null;

        return (
            <div className='page'>
                <div id='prof-review-form-disclaimer'>
                    <div id='prof-review-disclaimer-header'>评价须知</div>
                    <div id='prof-review-disclaimer-do-dont'>
                        <div className='do'>
                            <div className='do-header'>建议</div>
                            <div className='do-body'>发布前请再次检查内容，尽量清晰准确。</div>
                        </div>
                        <div className='do'>
                            <div className='do-header'>建议</div>
                            <div className='do-body'>可参考评分维度来更具体地描述学校体验。</div>
                        </div>
                        <div className='do'>
                            <div className='do-header'>禁止</div>
                            <div className='do-body'>请勿发布违规内容或重复转载被删除的评论。</div>
                        </div>
                    </div>
                </div>
                <div id='prof-review-form-header'>分享你对 {school.name} 的真实就读体验</div>
                <form className='school-rating-form' 
                    id='school-rating-form'
                    onSubmit={this.submitSchoolRating}>
                    <div className='school-rating-form-nums'>
                        {this.nums.map(num => <div 
                            key={num}
                            className='school-rating-form-num'>
                            {num}
                        </div>)}
                    </div>
                    <div className='school-rating-form-labels'>
                        {this.categories.map((category, index) => <div
                            key={index}
                            className='school-rating-form-label'>
                            {this.categoryLabels[category] || category}
                        </div>)}
                    </div>
                    <div className='school-rating-form-rating-values'>
                        {Object.values(this.state.categories).map((value, index) => <div
                            key={index}
                            className='prof-review-form-state-qual'>
                            {value}
                        </div>)}
                    </div>
                    <div className='school-rating-form-inputs'>
                        {this.categories.map((category, index) => <input
                            key={index}
                            className='school-rating-form-input'
                            type='range'
                            min='1'
                            max='5'
                            value={this.state.categories[category]}
                            onChange={this.update(category)}>
                        </input>)} 
                    </div>
                </form>
                <div className='school-rating-form-comment-num-label'>
                    <div className='school-rating-form-num'>11</div>
                    <div className='school-rating-form-label'>补充更具体的描述</div>
                </div>
                <textarea
                    className='school-rating-body'
                    value={this.state.body}
                    onChange={this.update('body')}>
                </textarea>
                {this.props.school_rating_errors.includes("Comment can't be blank") ? <div className='prof-review-form-blank-body-error'>评论不能为空</div> : null }
                {this.props.school_rating_errors.includes("Comment is too long (maximum is 350 characters)") ? <div className='prof-review-form-blank-body-error'>评论过长（最多 350 字符）</div> : null }
                <div className='school-rating-form-characters-left'>还可输入 {this.state.characters} 个字符
                </div>
                <input 
                    className='school-rating-form-submit' 
                    type='submit'
                    form='school-rating-form'>
                </input>
                <div className='school-rating-form-cancel' onClick={this.clickCancel}>取消</div>
            </div>
        )
    }
}

export default SchoolRatingForm;