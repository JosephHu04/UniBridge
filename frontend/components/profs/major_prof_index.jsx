import React from 'react';
import { Link } from 'react-router-dom';

class MajorProfIndex extends React.Component {
  componentDidMount() {
    this.props.requestSchoolRatings(this.props.match.params.schoolId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.schoolId !== this.props.match.params.schoolId) {
      this.props.requestSchoolRatings(this.props.match.params.schoolId);
    }
  }

  render() {
    const schoolId = Number(this.props.match.params.schoolId);
    const majorName = decodeURIComponent(this.props.match.params.majorName || '');
    const school = this.props.school;
    const majorProfs = this.props.profs.filter(
      (prof) => prof.school_id === schoolId && prof.subject === majorName
    );

    return (
      <div className='page'>
        <div className='must-navigation'>
          <div className='must-navigation-title'>专业老师列表</div>
          <div className='school-rating-index-school-location'>
            {school?.name || '学校加载中'} / {majorName}
          </div>
          <div style={{ margin: '12px 0 18px' }}>
            <Link className='must-prof-link' to={`/schoolRatings/${schoolId}`}>
              返回学院导航
            </Link>
          </div>

          <div className='must-prof-list'>
            {majorProfs.length === 0 ? (
              <div className='must-empty'>该专业暂未录入老师数据</div>
            ) : (
              majorProfs.map((prof) => (
                <Link key={prof.id} className='must-prof-link' to={`/profs/${prof.id}`}>
                  {prof.last_name}{prof.first_name}
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default MajorProfIndex;
