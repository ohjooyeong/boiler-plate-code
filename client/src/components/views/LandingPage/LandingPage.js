import React, { useEffect } from 'react';
import axios from 'axios';

function LandingPage() {
    useEffect(() => {
        // 클라이언트가 서버로 request를 요청하는 부분
        axios.get('api/hello').then((response) => {
            console.log(response.data, response);
        });
    }, []);

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
        </div>
    );
}

export default LandingPage;
