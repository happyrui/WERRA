import request from '../../utils/request';

const listData = res => ({
    type: 'LIST_DATA',
    payload: res
});

export const getTodoList = (params, fn) => async (dispatch) => {
    try {
        const result = await request('https://www.easy-mock.com/mock/5c24adb39a96a934e48de313/api/change/list', {
            method: 'GET',
            data: params
        });
        await dispatch(listData(result.data));
        fn();
    } catch (error) {

    }
}
