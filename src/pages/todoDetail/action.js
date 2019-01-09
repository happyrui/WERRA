import request from '../../utils/request';

const detailData = res => ({
    type: 'DETAIL_DATA',
    payload: res
});

export const getTodoDetail = (params, fn) => async (dispatch) => {
    try {
        const result = await request('/api/change/detail', {
            method: 'GET',
            data: params
        });
        await dispatch(detailData(result.data));
        fn();
    } catch (error) {
        
    }
}
