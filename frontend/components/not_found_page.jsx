import React from "react";

class NotFoundPage extends React.Component {
    render() {
        return (
            <div className="page">
                <div className="page-not-found-header">页面不存在</div>
                <div className="page-not-found-subtext">未找到你要访问的导师或学校，请返回首页重新搜索。</div>
            </div>
        )
    };
};

export default NotFoundPage;