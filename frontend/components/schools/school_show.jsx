import React from 'react';

class SchoolShow extends React.Component {
    constructor(props) {
        super(props);

        this.clickSchool = this.clickSchool.bind(this);
    }

    clickSchool() {
        let path = `/schoolRatings/${this.props.school.id}`;
        this.props.history.push(path);    
    }

    getAvgQual(schoolRatings, numRatings) {
        let avgRatingSum = 0;
        for (let i = 0; i < numRatings; i++) {
            let ratingSum = 0;
            let values = Object.values(schoolRatings[i])
            for (let j = 1; j < 11; j++) {
                ratingSum += values[j]
            }
            avgRatingSum += (ratingSum / 10)
        }
        return avgRatingSum / numRatings
    }

    styleQuality(qual) {
        if (qual < 3) {
            return 'rgb(255, 156, 156)'
        } else if (qual >= 4) {
            return '#68ffbe'
        } else {
            return 'rgb(255, 254, 104)'
        }
    }

    render() {
        const {school, schoolRatings} = this.props;

        let numRatings = schoolRatings?.length
        let avgQual = this.getAvgQual(schoolRatings, numRatings)

        return (
            <div className='school-show' onClick={this.clickSchool}>
                <div className='school-show-rating-summary'>
                    <div id='school-show-quality-label'>综合评分</div>
                    <div id='school-show-quality' style={{backgroundColor: this.styleQuality(avgQual)}}>{!numRatings ? "N/A" : avgQual.toFixed(1)}</div>
                    <div id='school-show-num-ratings'>{numRatings} 条评价</div>
                </div>
                <div className='school-show-name'>
                    {school.name}
                    {school.qs_ranking && (
                        <span style={{
                            display: 'inline-block',
                            marginLeft: '8px',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            background: school.qs_ranking <= 50 ? '#fff3cd' : '#e9ecef',
                            color: school.qs_ranking <= 50 ? '#856404' : '#555',
                            fontSize: '12px',
                            fontWeight: '600',
                            verticalAlign: 'middle',
                        }}>
                            QS #{school.qs_ranking}
                        </span>
                    )}
                </div>
                <div className='school-show-location'>
                    {school.city}, {school.state}
                </div>
            </div>
        )
    }
}

export default SchoolShow