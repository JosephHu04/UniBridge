import React from 'react';
import {Link} from 'react-router-dom';
import SchoolRatingShow from './school_rating_show';
import LoadingSpinner from '../loading_spinner';

class SchoolRatingIndex extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedCollege: null,
            selectedMajor: null,
            avgRatings: null,
            overallRating: null,
        }

        this.clickRateSchool = this.clickRateSchool.bind(this)
        this.clickAllProfs = this.clickAllProfs.bind(this);
        this.clickCollege = this.clickCollege.bind(this);
        this.clickMajor = this.clickMajor.bind(this);
    }

    componentDidMount() {
        this.props.requestSchoolRatings(this.props.match.params.schoolId)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.schoolRatings !== this.props.schoolRatings && this.props.schoolRatings[0]) {
            const categories = Object.keys(this.props.schoolRatings[0]);
            const avgRatings = this.getAvgRatings(this.props.schoolRatings, categories);
            const overallRating = this.getOverallRating(avgRatings);
            this.setState({ avgRatings, overallRating });
        }

        if (this.props.school && prevProps.school !== this.props.school && !this.state.selectedCollege) {
            const structure = this.getCollegeStructure(this.props.school, this.props.profs);
            if (structure.length > 0) {
                this.setState({
                    selectedCollege: structure[0].name,
                    selectedMajor: structure[0].majors[0] || null,
                });
            }
        }
    }

    getCollegeStructure(school, profs) {
        if (!school) return [];

        // Group profs by department if available, otherwise fall back to subject
        const deptMap = {};
        profs.forEach(prof => {
            const key = prof.department_name || prof.subject || '其他';
            if (!deptMap[key]) deptMap[key] = new Set();
            deptMap[key].add(prof.subject || '全部');
        });

        const deptKeys = Object.keys(deptMap);
        if (deptKeys.length === 0) return [];

        // If only one department/group, use flat major list
        if (deptKeys.length === 1) {
            const subjects = [...deptMap[deptKeys[0]]];
            return [{ name: deptKeys[0], majors: subjects }];
        }

        return deptKeys.map(name => ({
            name,
            majors: [...deptMap[name]],
        }));
    }

    clickCollege(collegeName) {
        const structure = this.getCollegeStructure(this.props.school, this.props.profs);
        const selected = structure.find((college) => college.name === collegeName);
        this.setState({
            selectedCollege: collegeName,
            selectedMajor: selected?.majors?.[0] || null,
        });
    }

    clickMajor(majorName) {
        this.setState({ selectedMajor: majorName });
        if (!this.props.school?.id) return;
        const encodedMajor = encodeURIComponent(majorName);
        this.props.history.push(`/majorProfs/${this.props.school.id}/${encodedMajor}`);
    }

    getOverallRating(avgRatings) {
        let sum = 0
        for (let i = 0; i < avgRatings.length; i++) {
            sum += avgRatings[i].num
        }
        return sum / avgRatings.length
    }

    groupLikes(schoolRatings, likes) {
        let groupedLikes = {}
        for (let i = 0; i < schoolRatings.length; i++) {
            if (!groupedLikes[schoolRatings[i].id]) {
                groupedLikes[schoolRatings[i].id] = []
            }
        }
        for (let i = 0; i < likes.length; i++) {
            groupedLikes[likes[i].school_rating_id]?.push(likes[i])
        }
        return groupedLikes
    }

    clickRateSchool() {
        let path = `/schoolRatings/new/${this.props.school.id}`
        this.props.history.push(path)
    }

    getTopProfs(profs, groupedProfReviews) {
        let profsArray = [];
        let sum = 0
        for (let i = 0; i < profs.length; i++) {
            let profObject = {}
            profObject['id'] = profs[i].id;
            profObject["firstName"] = profs[i].first_name;
            profObject["lastName"] = profs[i].last_name;
            let numReviews = groupedProfReviews[profs[i]?.id]?.length
            profObject['numReviews'] = numReviews
            let avgQual = this.getAvgQual(groupedProfReviews[profs[i]?.id])
            profObject['avgQual'] = avgQual
            sum += avgQual
            profObject['score'] = numReviews * avgQual
            profsArray.push(profObject)
        }

        return [profsArray.sort((a, b) => (a.score < b.score) ? 1 : -1).slice(0, 3), sum / profs.length]
    }

    getAvgQual(profReviews) {
        let sum = 0
        for (let i = 0; i < profReviews?.length; i++) {
            sum += profReviews[i]?.quality
        }
        return sum / profReviews?.length;
    }

    groupReviews(profReviews) {
        let groupedReviews = {}
        for (let i = 0; i < profReviews.length; i++) {
            if (!groupedReviews[profReviews[i].prof_id]) {
                groupedReviews[profReviews[i].prof_id] = []   
            }
            groupedReviews[profReviews[i].prof_id].push(profReviews[i])
        }
        return groupedReviews
    }

    clickAllProfs() {
        let path = `/profs/${this.props.school.name}/ `
        this.props.history.push(path)
    }

    getBackgroundColor(qual) {
        if (qual < 3) {
            return 'rgb(255, 156, 156)'
        } else if (qual >= 4) {
            return '#68ffbe'
        } else {
            return 'rgb(255, 254, 104)'
        }
    }

    getAvgRatings(schoolRatings, categories) {
        const categoryLabels = {
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
        let numRatings = schoolRatings.length;
        const ratingCategories = categories.slice(0, -4);
        let avgRatings = [];

        for (let i = 0; i < ratingCategories.length; i++) {
            avgRatings.push({name: categoryLabels[ratingCategories[i]] || ratingCategories[i], num: 0})
        }

        for (let i = 0; i < avgRatings.length; i++) {
            for (let j = 0; j < numRatings; j++) {
                avgRatings[i].num += schoolRatings[j][ratingCategories[i]]
            }
            avgRatings[i].num /= numRatings
        }

        return avgRatings
    }

    render() {
        const {school, profs, profReviews, schoolRatings, schoolRatingLikes, createSchoolRatingLike, deleteSchoolRatingLike, currentUser, history} = this.props;

        if (!school || !profs || !profReviews) return <LoadingSpinner text="加载院校信息..." />

        let groupedReviews = this.groupReviews(profReviews);
        let topProfs = this.getTopProfs(profs, groupedReviews);
        let groupedLikes = this.groupLikes(schoolRatings, schoolRatingLikes)
        const collegeStructure = this.getCollegeStructure(school, profs);
        const selectedCollegeObj = collegeStructure.find((item) => item.name === this.state.selectedCollege) || collegeStructure[0];
        const selectedMajor = this.state.selectedMajor || selectedCollegeObj?.majors?.[0] || null;
        
        return (
            <div className='page'>
                <div className='school-rating-index-header'>{school.name}</div>
                <div className='school-rating-index-school-location'>{school.city}, {school.state}</div>
                <a 
                    href={`${school.website}`} 
                    target="_blank" rel="noreferrer noopener"
                    className='school-website'>
                    学校官网 <i className="fas fa-external-link-alt"></i>
                </a>
                <button id='review-prof-button' 
                onClick={this.clickRateSchool}
                >评价这所学校</button>

                <div className='must-navigation'>
                    <div className='must-navigation-title'>学院导航</div>
                    <div className='must-college-grid'>
                        {collegeStructure.map((college) => (
                            <button
                                key={college.name}
                                className={college.name === selectedCollegeObj?.name ? 'must-chip active' : 'must-chip'}
                                onClick={() => this.clickCollege(college.name)}>
                                {college.name}
                            </button>
                        ))}
                    </div>

                    <div className='must-navigation-title'>专业列表</div>
                    <div className='must-major-grid'>
                        {(selectedCollegeObj?.majors || []).map((major) => (
                            <button
                                key={major}
                                className={major === selectedMajor ? 'must-chip active' : 'must-chip'}
                                onClick={() => this.clickMajor(major)}>
                                {major}
                            </button>
                        ))}
                    </div>

                    <div className='must-empty'>点击上方专业即可跳转查看该专业所有老师</div>
                </div>

                <div className='school-rating-index-school-summary'>
                    <div className='top-profs' id='top-profs'>
                        <div className='top-profs-header'>
                            <div className='top-profs-label'>热门导师</div>
                            <button 
                                className='school-rating-index-all-profs'
                                onClick={this.clickAllProfs}>
                                查看全部导师
                            </button>
                        </div>
                        <ul className='top-profs-ul'>
                            {topProfs[0].map((prof) => <li key={prof.id} className='top-profs-li'>
                                <div className='top-prof-name-num-reviews'>
                                    <Link 
                                        className='top-prof-name'
                                        to={`/profs/${prof.id}`}>{prof.lastName}, {prof.firstName}</Link>
                                    <div className='top-profs-num-reviews'>{prof.numReviews} 条评价</div>
                                </div>
                                <div 
                                    className='top-prof-avg-qual'
                                    style={{backgroundColor: this.getBackgroundColor(prof.avgQual)}}>{!prof?.avgQual ? 'N/A' : prof.avgQual.toFixed(1)}</div>
                            </li>)}
                        </ul>
                        <div className='school-rating-index-avg-prof-rating'>
                            <div className='school-rating-index-avg-prof-rating-num'>{topProfs[1] ? topProfs[1].toFixed(2) : 'N/A'}</div>
                            <div className='school-rating-index-avg-prof-rating-label'>导师平均评分</div>
                        </div>
                    </div>
                    <div className='top-profs'>
                        <div className='top-profs-header'>
                            <div className='top-profs-label'>学校综合表现</div>
                        </div>
                        <div className='school-rating-index-avg-prof-rating'>
                            <div className='top-prof-avg-qual'>{this.state.overallRating ? this.state.overallRating.toFixed(2) : 'N/A'}</div>
                            <div className='school-rating-index-avg-prof-rating-label'>学校综合评分</div>
                        </div>
                        <div className='school-rating-index-avg-rating-each-category'>
                            {this.state.avgRatings?.map((rating) => 
                            <div className='school-rating-index-avg-prof-ratings' key={rating.name}>
                                <div 
                                    className='school-rating-index-avg-prof-rating-num'
                                    style={{backgroundColor: this.getBackgroundColor(rating.num)}}>
                                    {rating.num ? rating.num.toFixed(1) : 'N/A'}
                                </div>
                                <div className='school-rating-index-avg-prof-rating-label'>{rating.name}</div>
                            </div>)}
                        </div>
                    </div>
                </div>
                <div id='prof-review-index-label'>{schoolRatings.length} 条学校评价</div>
                <ul>
                    {schoolRatings.map((schoolRating, index) => 
                    <SchoolRatingShow
                        key={index}
                        schoolRating={schoolRating}
                        schoolRatingLikes={groupedLikes[schoolRating.id]}
                        createSchoolRatingLike={createSchoolRatingLike}
                        deleteSchoolRatingLike={deleteSchoolRatingLike}
                        currentUser={currentUser}
                        history={history}/>)}
                </ul>
            </div>
        )
    }
}

export default SchoolRatingIndex;
