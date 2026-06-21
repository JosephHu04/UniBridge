import React from 'react';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div id='footer'>
                <div id='footer-text'>
                    <div>UniBridge — 全球留学生真实就读体验选导平台</div>
                    <div>致力于打破信息差，为研究生申请者提供透明的导师与院校参考</div>
                </div>
            </div>
        )
    }
};

export default Footer;