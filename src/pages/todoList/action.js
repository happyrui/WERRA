import request from '../../utils/request';

const listData = res => ({
    type: 'LIST_DATA',
    payload: res
});

// 获取列表
export const getTodoList = (params, fn) => async (dispatch) => {
    try {
        const result = await request('/node/todo', {
            method: 'GET',
            data: params
        });
        await dispatch(listData(result));
        fn();
    } catch (error) {

    }
}
// 查一个
export const findOne = (params, fn) => async (dispatch) => {
    try {
        const result = await request('/node/todo/findOne', {
            method: 'POST',
            data: params
        });
        fn(result);
    } catch (error) {

    }
}
// 新建
export const create = (params, fn) => async (dispatch) => {
    console.log(params);
    try {
        const result = await request('/node/todo/create', {
            method: 'POST',
            data: params
        });
        fn(result);
    } catch (error) {

    }
}
// 更新
export const update = (params, fn) => async (dispatch) => {
    try {
        const result = await request('/node/todo/update', {
            method: 'POST',
            data: params
        });
        fn(result);
    } catch (error) {

    }
}
// 删除
export const deleteOne = (params, fn) => async (dispatch) => {
    try {
        const result = await request('/node/todo/delete', {
            method: 'POST',
            data: params
        });
        fn(result);
    } catch (error) {

    }
}
// 标记已完成
export const finish = (params, fn) => async (dispatch) => {
    try {
        const result = await request('/node/todo/finish', {
            method: 'POST',
            data: params
        });
        fn(result);
    } catch (error) {

    }
}