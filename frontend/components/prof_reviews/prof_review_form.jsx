import React from 'react';

class ProfReviewForm extends React.Component {
    constructor(props) {
        super(props);
        const paBase = this.props.profReview.personality_and_attitude || 3;
        const aaBase = this.props.profReview.academic_and_ability || 3;
        const rpBase = this.props.profReview.resources_and_platform || 3;

        this.state = {
            ...this.props.profReview,
            personality_and_attitude: paBase,
            academic_and_ability: aaBase,
            resources_and_platform: rpBase,
            pa_respect_students: paBase,
            pa_boundary_clear: paBase,
            pa_private_time_respect: paBase,
            pa_credit_fairness: paBase,
            aa_output_recent: aaBase,
            aa_guidance_quality: aaBase,
            aa_graduation_support: aaBase,
            rp_funding_equipment: rpBase,
            rp_industry_network: rpBase,
            rp_career_recommendation: rpBase,
            tagStyles: new Array(23).fill('gray'),
            num_blues: 0,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.tags = [
            '反馈及时', '受人尊重', '作业较多',
            '课后可沟通', '阅读量大',
            '重视课堂参与', '逃课容易挂科',
            '有启发性', '成绩评定维度少', '考试占比高',
            '有小组项目', '评分标准清晰', '课堂有趣',
            '突击测验较多', '讲课精彩', '偏重讲授',
            '关心学生', '有加分机会', '论文任务多', '评分严格', '考试较难'
        ]

        this.clickCancel = this.clickCancel.bind(this);

        this.dimensionQuestionConfig = {
            personality: [
                { key: 'pa_respect_students', label: '是否尊重学生' },
                { key: 'pa_boundary_clear', label: '沟通方式是否专业并有边界' },
                { key: 'pa_private_time_respect', label: '是否尊重学生私人时间' },
                { key: 'pa_credit_fairness', label: '学术成果归属是否规范' },
            ],
            academic: [
                { key: 'aa_output_recent', label: '近3年学术产出情况' },
                { key: 'aa_guidance_quality', label: '是否能给予有效指导' },
                { key: 'aa_graduation_support', label: '课题推进与毕业支持情况' },
            ],
            resources: [
                { key: 'rp_funding_equipment', label: '项目经费与实验设备条件' },
                { key: 'rp_industry_network', label: '行业资源与人脉支持' },
                { key: 'rp_career_recommendation', label: '升学就业推荐支持' },
            ],
        };
    };

    clickCancel() {
        this.props.history.goBack();
    }


    update(field) {
        if (field === 'body') {
            return e => {
                return this.setState({
                [field]: e.currentTarget.value,
                characters: 350 - e.currentTarget.value.length
            })}
        } else {
            return e => this.setState({ [field]: e.currentTarget.value })
        }
    };

    makeTrue(field) {
        return () => this.setState({ [field]: true })
    }

    makeFalse(field) {
        return () => this.setState({ [field]: false })
    }

    changeColor(index) {
        return () => {
            this.setState(prevState => {
                const newStyles = [...prevState.tagStyles];
                let delta = 0;
                if (prevState.tagStyles[index] === 'gray' && prevState.num_blues < 3) {
                    newStyles[index] = 'blue';
                    delta = 1;
                } else {
                    newStyles[index] = 'gray';
                    delta = -1;
                }
                return { tagStyles: newStyles, num_blues: prevState.num_blues + delta };
            });
        }
    };

    getSelectedTags() {
        const { tagStyles } = this.state;
        const selected = [];
        for (let i = 0; i < tagStyles.length; i++) {
            if (tagStyles[i] === 'blue') selected.push(i);
        }
        return { indices: selected, labels: selected.map(i => this.tags[i]) };
    }

    handleSubmit(e) {
        e.preventDefault();
        const payload = { ...this.state };
        const { labels } = this.getSelectedTags();
        // Assign selected tags to tag1/tag2/tag3
        payload.tag1 = labels[0] || '';
        payload.tag2 = labels[1] || '';
        payload.tag3 = labels[2] || '';
        payload.personality_and_attitude = this.getDimensionScore(this.dimensionQuestionConfig.personality, payload);
        payload.academic_and_ability = this.getDimensionScore(this.dimensionQuestionConfig.academic, payload);
        payload.resources_and_platform = this.getDimensionScore(this.dimensionQuestionConfig.resources, payload);

        delete payload.tagStyles;
        delete payload.num_blues;
        delete payload.characters;
        delete payload.pa_respect_students;
        delete payload.pa_boundary_clear;
        delete payload.pa_private_time_respect;
        delete payload.pa_credit_fairness;
        delete payload.aa_output_recent;
        delete payload.aa_guidance_quality;
        delete payload.aa_graduation_support;
        delete payload.rp_funding_equipment;
        delete payload.rp_industry_network;
        delete payload.rp_career_recommendation;

        this.props.action(payload)
        .then(() => this.props.history.push(`/profs/${this.state.prof_id}`));
    };

    getDimensionAverage(questionList, sourceState = this.state) {
        const sum = questionList.reduce((acc, question) => acc + Number(sourceState[question.key] || 0), 0);
        return Math.round((sum / questionList.length) * 10) / 10;
    }

    getDimensionScore(questionList, sourceState = this.state) {
        return Math.round(this.getDimensionAverage(questionList, sourceState));
    }

    renderDimensionSection(title, questionList, average) {
        return (
            <div className='dimension-card'>
                <div className='dimension-card-header'>
                    <div className='dimension-title'>{title}</div>
                    <div className='dimension-avg'>均分 {average.toFixed(1)}</div>
                </div>
                {questionList.map((question) => (
                    <div key={question.key} className='dimension-sub-row'>
                        <div className='dimension-sub-label'>{question.label}</div>
                        <div className='after-label'>
                            <div className='prof-review-form-state-qual'>{this.state[question.key]}</div>
                            <input
                                className='slider'
                                type='range'
                                min='1'
                                max='5'
                                value={this.state[question.key]}
                                onChange={this.update(question.key)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    componentDidMount() {
        this.setState({ characters: 350 })
    }

    render() {


        const grades =  [
            'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+',
            'C', 'C-', 'D+', 'D', 'D-', 'F', 
            'Drop / Withdrawal', 'Incomplete', 
            'Not sure yet', 'Rather not say', 
            'Audit / No grade', 'Select'
        ];

        let inputStyleTakeAgainYes;
        let inputStyleTakeAgainNo;
        let inputStyleForCreditYes;
        let inputStyleForCreditNo;
        let inputStyleTextBookYes;
        let inputStyleTextBookNo;
        let inputStyleAttendanceYes;
        let inputStyleAttendanceNo;

        if (this.state.take_again) {
            inputStyleTakeAgainYes = { backgroundColor: 'red' }
        } else {
            inputStyleTakeAgainYes = { backgroundColor: 'gray' }
        }

        if (!this.state.take_again) {
            inputStyleTakeAgainNo = { backgroundColor: 'red' }
        } else {
            inputStyleTakeAgainNo = { backgroundColor: 'gray' }
        }

        if (this.state.for_credit) {
            inputStyleForCreditYes = { backgroundColor: 'red' }
        } else {
            inputStyleForCreditYes = { backgroundColor: 'gray' }
        }

        if (!this.state.for_credit) {
            inputStyleForCreditNo = { backgroundColor: 'red' }
        } else {
            inputStyleForCreditNo = { backgroundColor: 'gray' }
        }

        if (this.state.txt_book) {
            inputStyleTextBookYes = { backgroundColor: 'red' }
        } else {
            inputStyleTextBookYes = { backgroundColor: 'gray' }
        }

        if (!this.state.txt_book) {
            inputStyleTextBookNo = { backgroundColor: 'red' }
        } else {
            inputStyleTextBookNo = { backgroundColor: 'gray' }
        }

        if (this.state.attendance === null) {
            inputStyleAttendanceNo = { backgroundColor: 'gray' }
            inputStyleAttendanceYes = {backgroundColor: 'gray'}
        } else if (this.state.attendance === true) {
            inputStyleAttendanceYes = { backgroundColor: 'red' }
            inputStyleAttendanceNo = { backgroundColor: 'gray' }
        } else {
            inputStyleAttendanceYes = { backgroundColor: 'gray' }
            inputStyleAttendanceNo = { backgroundColor: 'red' }
        };

        return (
            <div id='prof-review-form-container'>
                <div id='prof-review-form-disclaimer'>
                    <div id='prof-review-disclaimer-header'>评价须知</div>
                    <div id='prof-review-disclaimer-do-dont'>
                        <div className='do'>
                            <div className='do-header'>建议</div>
                            <div className='do-body'>请围绕导师的专业能力展开评价，如教学风格、指导质量和表达清晰度。</div>
                        </div>
                        <div className='do'>
                            <div className='do-header'>建议</div>
                            <div className='do-body'>发布前请再次核对内容。课程名称请准确，文字尽量清晰易读。</div>
                        </div>
                        <div className='do'>
                            <div className='do-header'>禁止</div>
                            <div className='do-body'>请勿发布辱骂、贬损、歧视或未经证实的恶意指控内容。</div>
                        </div>
                    </div>
                </div>
                <div id='prof-review-form-header'>{this.props.formType}{this.props.prof.first_name} {this.props.prof.last_name}</div>
                <form onSubmit={this.handleSubmit} id='prof-review-form'>
                    <div id='prof-review-form-1' className='prof-review-form-row'>
                        <div id='prof-review-form-num-1' className='prof-review-form-number'>1</div>
                        <div id='prof-review-form-1-label'>
                            <div id='prof-review-form-1-label-header'><strong>课程名称</strong></div>
                        </div>
                        <input
                            id='prof-review-form-class-input'
                            type='text'
                            value={this.state.klass}
                            placeholder="输入课程名称"
                            onChange={this.update('klass')}>
                        </input>
                        {this.props.prof_review_errors.includes("Klass can't be blank") ? <div className='blank-klass-error'>课程名称不能为空。</div> : null }
                    </div>
                    <div id='prof-review-form-2' className='prof-review-form-row'>
                        <div className='prof-review-form-number'>2</div>
                        <div className='prof-review-form-label' id='prof-review-form-label-2'><strong>综合评分</strong></div>
                        <div className='after-label'>
                            <div className='prof-review-form-state-qual'>{this.state.quality}</div>
                            <input
                                className='slider'
                                type='range'
                                min='1'
                                max='5'
                                onChange={this.update('quality')}
                            />
                        </div>
                    </div>
                    <div id='prof-review-form-3' className='prof-review-form-row'>
                        <div className='prof-review-form-number'>3</div>
                        <div className='prof-review-form-label' id="prof-review-form-label-3"><strong>课程难度（旧字段）</strong></div>
                        <div className='after-label'>
                            <div id='diff-state' className='prof-review-form-state-qual'>{this.state.difficulty}</div>
                            <input
                                className='slider'
                                type='range'
                                min='1'
                                max='5'
                                value={this.state.difficulty}
                                onChange={this.update('difficulty')}
                            />
                        </div>
                    </div>
                    <div id='prof-review-dimensions' className='prof-review-form-row dimension-row'>
                        <div className='prof-review-form-number'>4</div>
                        <div className='dimension-group'>
                            {this.renderDimensionSection(
                                '人品与态度',
                                this.dimensionQuestionConfig.personality,
                                this.getDimensionAverage(this.dimensionQuestionConfig.personality)
                            )}
                            {this.renderDimensionSection(
                                '学术与能力',
                                this.dimensionQuestionConfig.academic,
                                this.getDimensionAverage(this.dimensionQuestionConfig.academic)
                            )}
                            {this.renderDimensionSection(
                                '资源与平台',
                                this.dimensionQuestionConfig.resources,
                                this.getDimensionAverage(this.dimensionQuestionConfig.resources)
                            )}
                        </div>
                    </div>
                    <div id='prof-review-form-7' className='prof-review-form-row'>
                        <div className='prof-review-form-number'>5</div>
                        <div className='prof-review-form-label'><strong>你愿意再次选这位导师吗？</strong></div>
                        <div className='after-label'>
                            <input type='button' className="boolean-button" style={inputStyleTakeAgainYes} onClick={this.makeTrue('take_again')} value='愿意' />
                            <input type='button' className="boolean-button" style={inputStyleTakeAgainNo} onClick={this.makeFalse('take_again')} value='不愿意' />
                        </div>
                    </div>
                    <div id='prof-review-form-8a' className='prof-review-form-row'>
                        <div className='prof-review-form-number'>6</div>
                        <div className='prof-review-form-label'><strong>这门课是否计入学分？</strong></div>
                        <div className='after-label'>
                            <input className="boolean-button" type='button' style={inputStyleForCreditYes} onClick={this.makeTrue('for_credit')} value='是' />
                            <input className="boolean-button" type='button' style={inputStyleForCreditNo} onClick={this.makeFalse('for_credit')} value='否' />
                        </div>
                    </div>
                    <div id='prof-review-form-8b' className='prof-review-form-row'>
                        <div className='prof-review-form-number'>7</div>
                        <div className='prof-review-form-label' id='prof-review-form-label-6'><strong>教材使用频率</strong></div>
                        <div className='after-label'>
                            <input className="boolean-button" type='button' style={inputStyleTextBookYes} onClick={this.makeTrue('txt_book')} value='经常' />
                            <input className="boolean-button" type='button' style={inputStyleTextBookNo} onClick={this.makeFalse('txt_book')} value='很少' />
                        </div>
                    </div>
                    <div id='prof-review-form-8c' className='prof-review-form-row'>
                        <div className='prof-review-form-number'>8</div>
                        <div className='prof-review-form-label' id='prof-review-form-label-7'><strong>考勤要求</strong>（可选）</div>
                        <div className='after-label'>
                            <input type='button' className="boolean-button" style={inputStyleAttendanceYes} onClick={this.makeTrue('attendance')} value='必须到课' />
                            <input type='button' className="boolean-button" style={inputStyleAttendanceNo} onClick={this.makeFalse('attendance')} value='不强制' />
                        </div>
                    </div>
                    <div id='prof-review-form-8' className='prof-review-form-row'>
                        <div className='prof-review-form-number'>9</div>
                        <div className='prof-review-form-label' id='prof-review-form-label-8'><strong>最终成绩</strong>（可选）</div>
                        <select id='prof-review-form-grades' name='grades' onChange={this.update('grade')} defaultValue={'Select'}>
                            {
                                grades.map((grade, index) =>
                                    <option
                                        key={index}
                                        value={grade}>
                                        {grade}
                                    </option>)
                            }
                        </select>
                    </div>
                    <div id='prof-review-form-9'>
                        <div className='prof-review-form-number'>10</div>
                        <div className='prof-review-form-label'><strong>最多选择 3 个最符合该导师的标签</strong>（可选） <br/> 你的每一次评价，都会影响后来同学的选择。</div>
                    </div>
                    <div id='prof-review-form-tags'>
                        {
                            this.tags.map((tag, index) => <input
                                key={index} type='button'
                                style={{ backgroundColor: this.state.tagStyles[index] }}
                                onClick={this.changeColor(index)}
                                value={tag} />)
                        }
                    </div>
                    <div id='prof-review-form-10'>
                        <div className='prof-review-form-number'>11</div>
                        <div className='prof-review-form-label'>补充具体体验（可选）</div>
                    </div>
                    <textarea
                        id='prof-review-form-body'
                        value={this.state.body}
                        onChange={this.update('body')}>
                    </textarea>
                    <div 
                        id='prof-review-form-characters'>
                        还可输入 {this.state.characters} 个字符
                        {this.props.prof_review_errors.includes("Body can't be blank") ? <div className='prof-review-form-blank-body-error'>评论内容不能为空。</div> : null }
                        {this.props.prof_review_errors.includes("Body is too long (maximum is 350 characters)") ? <div className='prof-review-form-blank-body-error'>评论过长（最多 350 字符）。</div> : null }
                        {this.props.prof_review_errors.length > 0 ? <div className='prof-review-form-blank-body-error'>{this.props.prof_review_errors[0]}</div> : null }
                    </div>
                    <input id='prof-review-form-submit' type='submit'></input>
                </form>
                <div id='prof-review-form-cancel' onClick={this.clickCancel}>取消</div>
            </div>
        );
    };
};

export default ProfReviewForm;
