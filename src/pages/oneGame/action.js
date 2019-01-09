import request from '../../utils/request';

const images = res => ({
    type: 'GET_IMAGES',
    payload: res
});

export const getImage = (params, fn) => async (dispatch) => {
    try {
        const result = await request('/api/change/images', {
            method: 'GET',
            data: params
        });
        await dispatch(images(result.data));
        fn();
    } catch (error) {
        
    }
}
