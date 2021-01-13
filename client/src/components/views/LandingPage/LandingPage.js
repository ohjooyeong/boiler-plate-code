import React, { useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

function LandingPage(props) {
    useEffect(() => {
        // 클라이언트가 서버로 request를 요청하는 부분
        axios.get('api/hello').then((response) => {
            console.log(response.data, response);
        });
    }, []);

    const onClickHandler = () => {
        axios.get(`/api/users/logout`).then((response) => {
            if (response.data.success) {
                props.history.push('/login');
            } else {
                alert('로그아웃 하는데 실패하셨습니다.');
            }
        });
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100vh',
            }}
        >
            <h2>시작 페이지</h2>
            <button onClick={onClickHandler}>로그아웃</button>
        </div>
    );
}

export default withRouter(LandingPage);
