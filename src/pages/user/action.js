import request from '../../utils/request';

const user = res => ({
    type: 'USER_INFO',
    payload: res
});

export const getUserInfo = (params, fn) => async (dispatch) => {
    try {
        const result = await request('/api/change/user', {
            method: 'GET',
            data: params
        });
        await dispatch(user(result.data));
        fn();
    } catch (error) {
        
    }
}
