import { LOGIN_USER } from '../_actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            // console.log({ ...state });
            console.log(action);
            return { ...state, loginSuccess: action.payload }; // store로 데이터를 보냄
            break;

        default:
            return state;
    }
}
