import request from '../../utils/request';

const detailData = res => ({
    type: 'DETAIL_DATA',
    payload: res
});

export const getTodoDetail = (params, fn) => async (dispatch) => {
    try {
        const result = await request('https://www.easy-mock.com/mock/5c24adb39a96a934e48de313/api/change/detail', {
            method: 'GET',
            data: params
        });
        await dispatch(detailData(result.data));
        fn();
    } catch (error) {
        
    }
}
