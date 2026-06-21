import React from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../loading_spinner';

class RankingIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRegion: props.match.params.regionName || '全部',
        };
        this.clickRegion = this.clickRegion.bind(this);
    }

    componentDidMount() {
        this.props.requestRankings({ region: this.getRegionParam() });
    }

    componentDidUpdate(prevProps) {
        const region = this.props.match.params.regionName;
        if (prevProps.match.params.regionName !== region) {
            this.setState({ selectedRegion: region || '全部' });
            this.props.requestRankings({ region: this.getRegionParam(region) });
        }
    }

    getRegionParam(override) {
        const r = override || this.props.match.params.regionName;
        return r && r !== '全部' ? r : null;
    }

    clickRegion(regionName) {
        return (e) => {
            e.preventDefault();
            if (regionName === '全部') {
                this.props.history.push('/rankings');
            } else {
                this.props.history.push(`/rankings/${regionName}`);
            }
        };
    }

    getMedalStyle(rank) {
        if (rank === 1) return { background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: '#fff', fontWeight: 'bold' };
        if (rank === 2) return { background: 'linear-gradient(135deg, #C0C0C0, #A0A0A0)', color: '#fff', fontWeight: 'bold' };
        if (rank === 3) return { background: 'linear-gradient(135deg, #CD7F32, #B8860B)', color: '#fff', fontWeight: 'bold' };
        if (rank <= 10) return { background: '#e8f4fd', color: '#007BFF', fontWeight: 'bold' };
        if (rank <= 50) return { background: '#f0f8ff', color: '#0056b3' };
        return { background: '#f8f9fa', color: '#666' };
    }

    render() {
        const { rankings, loading } = this.props;
        const regions = ['全部', '澳门', '香港', '台湾', '亚洲', '澳洲', '欧洲', '北美', '南美'];

        if (loading || !rankings) {
            return <LoadingSpinner text="加载排名数据..." />;
        }

        return (
            <div className="page" style={{ padding: '30px', maxWidth: '1100px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '8px' }}>
                    QS 世界大学排名 2025
                </h1>
                <p style={{ color: '#666', marginBottom: '20px' }}>
                    数据来源：QS World University Rankings 2025 · 共 {rankings.length} 所院校
                </p>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '30px', flexWrap: 'wrap' }}>
                    {regions.map((r) => (
                        <button
                            key={r}
                            onClick={this.clickRegion(r)}
                            style={{
                                padding: '8px 18px',
                                borderRadius: '20px',
                                border: this.state.selectedRegion === r ? '2px solid #007BFF' : '1px solid #ddd',
                                background: this.state.selectedRegion === r ? '#007BFF' : '#fff',
                                color: this.state.selectedRegion === r ? '#fff' : '#333',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: this.state.selectedRegion === r ? '600' : '400',
                                transition: 'all 0.15s',
                            }}>
                            {r}
                        </button>
                    ))}
                </div>

                <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '80px 1fr 120px 100px',
                        padding: '14px 24px',
                        background: '#f8f9fa',
                        borderBottom: '2px solid #e9ecef',
                        fontWeight: '600',
                        fontSize: '13px',
                        color: '#555',
                    }}>
                        <div>排名</div>
                        <div>院校名称</div>
                        <div>地区</div>
                        <div>操作</div>
                    </div>

                    {rankings.map((school, idx) => (
                        <div
                            key={school.id}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '80px 1fr 120px 100px',
                                padding: '12px 24px',
                                borderBottom: idx < rankings.length - 1 ? '1px solid #f0f0f0' : 'none',
                                alignItems: 'center',
                                transition: 'background 0.1s',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#fafbfc'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                            <div>
                                <span style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '10px',
                                    fontSize: '15px',
                                    ...this.getMedalStyle(school.qs_ranking),
                                }}>
                                    {school.qs_ranking}
                                </span>
                            </div>
                            <div>
                                <div style={{ fontWeight: '600', color: '#111', fontSize: '15px' }}>
                                    {school.name}
                                </div>
                                <div style={{ color: '#888', fontSize: '12px', marginTop: '2px' }}>
                                    {school.city}, {school.state}
                                </div>
                            </div>
                            <div style={{ color: '#555', fontSize: '14px' }}>
                                {school.region_name || '-'}
                            </div>
                            <div>
                                <Link
                                    to={`/schoolRatings/${school.id}`}
                                    style={{
                                        padding: '6px 16px',
                                        borderRadius: '6px',
                                        background: '#007BFF',
                                        color: '#fff',
                                        textDecoration: 'none',
                                        fontSize: '13px',
                                        fontWeight: '500',
                                    }}>
                                    查看详情
                                </Link>
                            </div>
                        </div>
                    ))}

                    {rankings.length === 0 && (
                        <div style={{ padding: '60px', textAlign: 'center', color: '#999' }}>
                            该地区暂无排名数据
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default RankingIndex;
