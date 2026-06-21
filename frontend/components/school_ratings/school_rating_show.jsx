import React from 'react';
import SchoolRatingLikes from '../school_rating_likes/school_rating_likes';

class SchoolRatingShow extends React.Component {
    constructor(props) {
        super(props);
    }

    getCategoryRatings(schoolRating) {
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
        let categories = Object.keys(schoolRating)
        const ratingCategories = categories.slice(0, -4);
        let nums = Object.values(schoolRating)
        let ratings = [];

        for (let i = 0; i < ratingCategories.length; i++) {
            ratings.push({name: categoryLabels[ratingCategories[i]] || ratingCategories[i], num: nums[i]})
        }

        return ratings
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

    render() {
        const {schoolRating, history, schoolRatingLikes} = this.props;

        let categoryRatings = this.getCategoryRatings(schoolRating)

        return (
            <div className='school-rating-index-school-summary'>
                <div className='top-profs'>
                    <div className='top-profs-header'>
                        <div className='school-rating-show-header'>评分</div>
                    </div>
                    <div className='top-profs-header'>
                        <div className='school-rating-show-date'>{schoolRating.updatedOn}</div>
                    </div>
                    <div className='school-rating-index-avg-rating-each-category'>
                            {categoryRatings.map((rating) => 
                            <div className='school-rating-index-avg-prof-ratings' key={rating.name}>
                                <div 
                                    className='school-rating-index-avg-prof-rating-num'
                                    style={{backgroundColor: this.getBackgroundColor(rating.num)}}>
                                    {rating.num ? rating.num : 'N/A'}
                                </div>
                                <div className='school-rating-index-avg-prof-rating-label'>{rating.name}</div>
                            </div>)}
                    </div>
                </div>
                <div className='top-profs'>
                    <div className='top-profs-header'>
                        <div className='school-rating-show-header'>评论</div>
                    </div>
                    <div className='school-rating-show-comment'>{schoolRating.comment}</div>
                    <SchoolRatingLikes
                        createSchoolRatingLike={this.props.createSchoolRatingLike}
                        deleteSchoolRatingLike={this.props.deleteSchoolRatingLike}
                        currentUser={this.props.currentUser}
                        schoolRating={schoolRating}
                        history={history}
                        schoolRatingLikes={schoolRatingLikes}/>
                </div>
            </div>
        )
    }
}

export default SchoolRatingShow