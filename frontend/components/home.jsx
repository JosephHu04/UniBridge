import React from "react";
import {Link} from 'react-router-dom';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.clickRegion = this.clickRegion.bind(this);
    }

    clickRegion(regionName, active) {
        return (e) => {
            e.preventDefault();
            if (active) {
                this.props.history.push(`/schools/${regionName}`);
            } else {
                alert("该地区板块正在搭建中，敬请期待！");
            }
        };
    }

    render() {
        const regions = [
          { name: "澳门", active: true },
          { name: "香港", active: true },
          { name: "台湾", active: true },
          { name: "亚洲", active: true },
          { name: "澳洲", active: true },
          { name: "欧洲", active: true },
          { name: "北美", active: true },
          { name: "南美", active: true },
        ];

        return (
            <div id='home' style={{ minHeight: '80vh', backgroundColor: '#f9f9f9', padding: '80px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxSizing: 'border-box' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '20px', color: '#111', textAlign: 'center' }}>
                    全球留学生真实就读体验选导平台
                </h1>
                <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '50px', textAlign: 'center' }}>
                    打破信息差，拒绝水军验证体系，寻找最适合你的研究生导师
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px', maxWidth: '1000px' }}>
                    {regions.map((region, idx) => (
                        <div 
                            key={idx}
                            onClick={this.clickRegion(region.name, region.active)}
                            style={{
                                width: '280px',
                                height: '160px',
                                borderRadius: '16px',
                                backgroundColor: region.active ? '#007BFF' : '#E9ECEF',
                                color: region.active ? '#FFFFFF' : '#A4A4A4',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2.2rem',
                                fontWeight: 'bold',
                                cursor: region.active ? 'pointer' : 'not-allowed',
                                boxShadow: region.active ? '0 8px 15px rgba(0, 123, 255, 0.2)' : 'none',
                                transition: 'all 0.2s ease-in-out'
                            }}
                            onMouseEnter={e => { if(region.active) e.currentTarget.style.transform = 'translateY(-5px)' }}
                            onMouseLeave={e => { if(region.active) e.currentTarget.style.transform = 'translateY(0)' }}
                        >
                            {region.name}
                        </div>
                    ))}
                </div>

                <Link
                    to="/rankings"
                    style={{
                        marginTop: '50px',
                        padding: '16px 40px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                        color: '#FFD700',
                        textDecoration: 'none',
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                        transition: 'all 0.2s',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    🏆 QS 世界大学排名 2025
                </Link>
            </div>
        );
    }
}

export default Home;
