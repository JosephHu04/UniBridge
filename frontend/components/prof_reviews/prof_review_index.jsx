import React from 'react';
import ProfReviewShow from './prof_review_show';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import LoadingSpinner from '../loading_spinner';

class ProfReviewIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedKlass: '全部课程',
            profSave: null,
        }

        this.tags = [
            '反馈及时', '受人尊重', '作业较多',
            '课后可沟通', '阅读量大',
            '重视课堂参与', '逃课容易挂科',
            '有启发性', '成绩评定维度少', '考试占比高',
            '有小组项目', '评分标准清晰', '课堂有趣',
            '突击测验较多', '讲课精彩', '偏重讲授',
            '关心学生', '有加分机会', '论文任务多', '评分严格', '考试较难'
        ]

        this.clickRateProf = this.clickRateProf.bind(this);
        this.clickSave = this.clickSave.bind(this);
        this.clickUnsave = this.clickUnsave.bind(this);
    };

    componentDidMount() {
        this.props.requestProf(this.props.match.params.profId)
        this.props.requestProfReviews(this.props.match.params.profId, this.props.currentUser?.id)
    };

    componentDidUpdate(prevProps) {
        if (prevProps.profSaves !== this.props.profSaves) {
            this.setState({profSave: this.findProfSave(this.props.profSaves, this.props.prof.id, this.props.currentUser?.id)})
        }
        if (prevProps.currentUser !== this.props.currentUser) {
            this.props.requestProfReviews(this.props.match.params.profId, this.props.currentUser?.id)
        }
    }

    clickSave() {
        if (!this.props.currentUser) {
            let path = '/signup';
            this.props.history.push(path);
        }
        this.props.createProfSave({saver_id: this.props.currentUser.id, prof_saved_id: this.props.prof.id})
    }

    clickUnsave() {
        this.props.deleteProfSave(this.state.profSave.id)
    }

    groupLikes(profReviews, likes) {
        let groupedLikes = {}
        for (let i = 0; i < profReviews.length; i++) {
            if (!groupedLikes[profReviews[i].id]) {
                groupedLikes[profReviews[i].id] = []
            }
        }
        for (let i = 0; i < likes.length; i++) {
            groupedLikes[likes[i].review_id]?.push(likes[i])
        }

        return groupedLikes
    }

    getRadarStats(profReviews) {
        let sumPA = 0, sumAA = 0, sumRP = 0, count = 0;
        profReviews.forEach(r => {
            if (r.personality_and_attitude != null) {
                sumPA += r.personality_and_attitude;
                sumAA += r.academic_and_ability;
                sumRP += r.resources_and_platform;
                count++;
            }
        });
        if (count === 0) return [
            { subject: "人品与态度", A: 0, fullMark: 5 },
            { subject: "学术与能力", A: 0, fullMark: 5 },
            { subject: "资源与平台", A: 0, fullMark: 5 },
        ];
        return [
            { subject: "人品与态度", A: parseFloat((sumPA/count).toFixed(1)), fullMark: 5 },
            { subject: "学术与能力", A: parseFloat((sumAA/count).toFixed(1)), fullMark: 5 },
            { subject: "资源与平台", A: parseFloat((sumRP/count).toFixed(1)), fullMark: 5 },
        ];
    }

    getStats(profReviews, numReviews) {
        if (numReviews === 0) {
            return [null, null, null];
        }

        let sumQual = 0;
        let sumDiff = 0;
        let numWouldTakeAgain = 0;
        let numWouldNotTakeAgain = 0;
        for (let i = 0; i < numReviews; i++) {
            sumQual += profReviews[i].quality;
            sumDiff += profReviews[i].difficulty;
            if (profReviews[i].take_again === true) {
                numWouldTakeAgain ++
            } else if (profReviews[i].take_again === false) {
                numWouldNotTakeAgain ++
            }
        }
        let stats = [sumQual, sumDiff].map(num => num / numReviews)
        stats.push(numWouldTakeAgain / (numWouldTakeAgain + numWouldNotTakeAgain));
        return stats;
    }

    clickRateProf() {
        let path = `/profReviews/new/${this.props.prof.id}`
        this.props.history.push(path);
    }

    getTopTags(profReviews) {
        let tags_count = {};
        for (let i = 0; i < this.tags.length; i++) {
            tags_count[this.tags[i]] = 0
        };
        for (let i = 0; i < profReviews.length; i++) {
            if (this.tags.includes(profReviews[i].tag1)) {
                tags_count[profReviews[i].tag1] += 1
            }
            if (this.tags.includes(profReviews[i].tag2)) {
                tags_count[profReviews[i].tag2] += 1
            }
            if (this.tags.includes(profReviews[i].tag3)) {
                tags_count[profReviews[i].tag3] += 1
            }
        }
        let tagsCountArray = [];
        tagsCountArray.push(Object.keys(tags_count), Object.values(tags_count))
        let tagsCountTranspose = [];
        for (let i = 0; i < tagsCountArray[0].length; i++) {
            tagsCountTranspose.push([tagsCountArray[0][i], tagsCountArray[1][i]])
        }
        let topTags = [];
        let sortedCounts = Object.values(tags_count).sort().reverse();
        for (let i = 0; i < sortedCounts.length; i++) {
            for (let j = 0; j < tagsCountTranspose.length; j++) {
                if (tagsCountTranspose[j][1] === sortedCounts[i] && topTags.length < 5 && sortedCounts[i] && !topTags.includes(tagsCountTranspose[j][0])) {
                    topTags.push(tagsCountTranspose[j][0])
                } 
            }
        }
        return topTags;
    }

    update(field) {
        if (field === 'selectedKlass') {
            return e => {
                return this.setState({
                    [field]: e.currentTarget.value,
                })
            }
        }
    }

    getKlasses(profReviews) {
        let klasses = ['全部课程'];

        for (let i = 0; i < profReviews.length; i++) {
            if (!klasses.includes(profReviews[i].klass)) {
                klasses.push(profReviews[i].klass)
            }
        }

        return klasses;
    }

    filterProfReviews(profReviews) {
        let filteredProfReviews = [];
        if (this.state.selectedKlass === "全部课程") {
            return profReviews
        }
        for (let i = 0; i < profReviews.length; i++) {
            if (profReviews[i].klass === this.state.selectedKlass) {
                filteredProfReviews.push(profReviews[i])
            }
        }
        return filteredProfReviews
    }

    findProfSave(profSaves, profId, userId) {
        for (let i = 0; i < profSaves.length; i++) {
            if (profSaves[i].saver_id === userId && profSaves[i].prof_saved_id === profId) {
                return profSaves[i]
            }
        }
        
        return null
    }

    findSchool(schools, school_id) {
        for (let i = 0; i < schools.length; i++) {
            if (schools[i].id === school_id) {
                return schools[i]
            }
        }

        return null
    }

    render() {
        const { prof, profReviews, likes, currentUser, createLike, deleteLike, history, schools } = this.props;
        if (!prof) return <LoadingSpinner text="加载导师信息..." />
        const numReviews = profReviews.length;
        let groupedLikes = this.groupLikes(profReviews, likes)
        const stats = this.getStats(profReviews, numReviews);
        const topTags = this.getTopTags(profReviews);
        const klasses = this.getKlasses(profReviews);
        const filteredProfReviews = this.filterProfReviews(profReviews)
        const radarData = this.getRadarStats(profReviews);
        const wouldTakeAgain = (stats[2] === null || Number.isNaN(stats[2])) ? "N/A" : `${Math.round(stats[2] * 100)}%`;
        const avgDifficulty = (stats[1] === null || Number.isNaN(stats[1])) ? "N/A" : stats[1].toFixed(1);

        return (
            <div id='prof-review-index'>
                <div id='prof-review-index-prof-show'>
                    <div id='prof-show-quality-name'>
                        <div id='prof-show-avg-qual'>
                            <div id='prof-show-avg-qual-nums'>
                                <div id='prof-show-avg-qual-proper'>{ numReviews === 0 ? "N/A" : stats[0]?.toFixed(1) }</div>
                                <div id='out-of-5'> / 5.0</div>
                            </div>
                            <div id='qual-based-on'>综合评分（基于 {numReviews} 条评价）</div>
                        </div>
                        <div id='prof-review-index-prof-show-name'>
                            <div id='prof-review-index-prof-name'>
                                <div className='prof-name-static'>
                                    {prof.first_name} {prof.last_name}
                                </div>
                                &nbsp;
                                { this.state.profSave ?
                                <div className='icon-hint'>
                                    <i className="fas fa-bookmark icon-with-hint" id='saved' onClick={this.clickUnsave}></i>
                                    <div className='hint'>取消收藏</div>
                                </div> :
                                <div className='icon-hint'>
                                    <i className="far fa-bookmark icon-with-hint" id='unsaved' onClick={this.clickSave}></i>
                                    <div className='hint'>收藏导师</div>
                                </div> }
                            </div>
                            <div className='prof-detail-card'>
                                <div className='prof-detail-title'>{prof.title || '教授'}</div>
                                <div className='prof-detail-row'>
                                    <span className='prof-detail-label'>所属专业</span>
                                    <span className='prof-detail-value'>{prof.major_name || prof.subject || '暂无数据'}</span>
                                </div>
                                <div className='prof-detail-row'>
                                    <span className='prof-detail-label'>所属学院</span>
                                    <span className='prof-detail-value'>{prof.department_name || '暂无数据'}</span>
                                </div>
                                <div className='prof-detail-row'>
                                    <span className='prof-detail-label'>学术标识</span>
                                    <span className='prof-detail-value'>{prof.education || '暂无数据'}</span>
                                </div>
                                <div className='prof-detail-row'>
                                    <span className='prof-detail-label'>研究方向/基金来源</span>
                                    <span className='prof-detail-value'>{prof.research_interests || '暂无数据'}</span>
                                </div>
                                <div className='prof-detail-row'>
                                    <span className='prof-detail-label'>代表成果/期刊</span>
                                    <span className='prof-detail-value'>{prof.publications || '暂无数据'}</span>
                                </div>
                                <div className='prof-detail-row'>
                                    <span className='prof-detail-label'>学术简介</span>
                                    <span className='prof-detail-value'>{prof.bio || '暂无数据'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id='prof-show-other-stats'>
                        <div className='prof-show-other-stats' id='prof-review-index-prof-show-take-again'>
                            <div className='prof-review-index-prof-show-take-again-ratio'>{wouldTakeAgain}</div>
                            <div>愿意再选</div>
                        </div>
                        <div className='prof-show-other-stats' id='prof-review-index-prof-show-difficulty'>
                            <div className='prof-review-index-prof-show-take-again-ratio'>{avgDifficulty}</div>
                            <div>课程难度</div>
                        </div>
                    </div>
                    <div id='prof-show-radar-stats' style={{ width: '400px', height: '240px', marginTop: '20px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="subject" />
                                <PolarRadiusAxis angle={30} domain={[0, 5]} />
                                <Radar name="Prof" dataKey="A" stroke="#007BFF" fill="#007BFF" fillOpacity={0.6} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                    <button id='review-prof-button' onClick={this.clickRateProf}>评价导师 {prof.last_name}</button>
                    <div id='top-tags-label'>导师 {prof.last_name} 的热门标签</div>
                    <div id='top-tags'>
                        {
                            topTags.map((tag, index) => <div key={index} className='tag'>{tag}</div>)
                        }
                    </div>
                </div>
                <div id='prof-review-index-ratings-dropdown'>
                    <div id='prof-review-index-label'>{numReviews} 条学生评价</div>
                    <select id='courses-dropdown' name='klasses' onChange={this.update('selectedKlass')} defaultValue={'全部课程'}>
                        {
                            klasses.map((klass, index) =>
                                <option
                                    key={index}
                                    value={klass}>
                                    {klass}
                                </option>)
                        }
                    </select>
                </div>
                <ul>
                    {
                        filteredProfReviews.map((profReview, index) => 
                        <ProfReviewShow 
                        key={index} 
                        profReview={profReview} 
                        createLike={createLike}
                        deleteLike={deleteLike}
                        currentUser={currentUser}
                        prof={prof}
                        showLikes={true}
                        history={history}
                        likes={groupedLikes[profReview.id]}/>)
                    }
                </ul>
            </div>
        );
    };
};

export default ProfReviewIndex;