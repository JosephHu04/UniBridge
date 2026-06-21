import React from 'react';
import {Link} from 'react-router-dom';
import SchoolShow from './school_show';

class SchoolIndex extends React.Component {
    constructor(props) {
        super(props)

    }

    update(field) {
        return e => {
            return this.setState({
                [field]: e.currentTarget.value,
            })
        }
    }

    componentDidMount() {
        this.props.requestSchoolsWithRatings(this.props.match.params.query);
    };

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.query !== this.props.match.params.query) {
            this.props.requestSchoolsWithRatings(this.props.match.params.query);
        }
    }

    groupRatings(schoolRatings) {
        let groupedRatings = {};
        for (let i = 0; i < schoolRatings.length; i++) {
            if (!groupedRatings[schoolRatings[i].school_id]) {
                groupedRatings[schoolRatings[i].school_id] = []
            }
            groupedRatings[schoolRatings[i].school_id].push(schoolRatings[i])
        }
        return groupedRatings
    }

    render() {
        const { schools, history, schoolRatings } = this.props;
        let numSchools = schools.length;
        if (numSchools === 0) {
            return (
                <div className='page'>
                    <div className='no-search-results'>未找到名称包含 <strong>“{this.props.match.params.query}”</strong> 的学校。</div>
                    <div className='no-search-results-subtext'>请检查拼写，或尝试其他关键词。</div>
                    <div id='add-prof'>
                        <div>找不到你要找的学校？</div>
                        <Link to='/schools/new' id='add-prof-link'>添加学校</Link>
                    </div>
                </div>
            )
        }

        let groupedRatings = this.groupRatings(schoolRatings)

        return (
            <div className='page'>
                <div className='search-header'>找到 {numSchools} 所名称包含 <strong>“{this.props.match.params.query}”</strong> 的学校。</div>
                <ul>
                    {
                        schools.map((school) =>
                            <SchoolShow
                            key={school.id}
                            school={school}
                            history={history}
                            schoolRatings={groupedRatings[school.id]}/>
                        )
                    }
                </ul>
                <div id='add-prof'>
                    <div>找不到你要找的学校？</div>
                    <Link to='/schools/new' id='add-prof-link'>添加学校</Link>
                </div>
            </div>
        )
    }
}

export default SchoolIndex