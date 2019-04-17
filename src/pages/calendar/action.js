import request from '../../utils/request';

const listData = res => ({
    type: 'LIST_DATA',
    payload: res
});

export const getCalendarList = (params, fn) => async (dispatch) => {
    try {
        const result = await request('/api/change/list', {
            method: 'GET',
            data: params
        });
        await dispatch(listData(result.data));
        fn();
    } catch (error) {

    }
}
