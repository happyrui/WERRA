import React, { PureComponent } from 'react';
import TodoDetailConnect from '../../pages/todoDetail/TodoDetailConnect';

/**
 *  Context 通过组件树提供了一个传递数据的方法，从而避免了在每一个层级手动的传递 props 属性
 *  但最好是 父子孙组件 都在 一个文件夹下 防止 像上文那样，在Components中引入pages中的文件，这种做法不可取
 *  所以 Context 如果不在业务组件中使用到，那最好是在全局，如登陆，menu等中使用
 *  const {Provider, Consumer} = React.createContext(defaultValue);
 *  Provider(生产者): 和他的名字一样。用于生产共享数据的地方
 *  Consumer(消费者):这个可以理解为消费者。 他是专门消费供应商(Provider 上面提到的)产生数据。Consumer需要嵌套在生产者下面。
 *    才能通过回调的方式拿到共享的数据源。当然也可以单独使用，那就只能消费到上文提到的defaultValue
 *  也就是说 在父组件中需要使用 Provider 包裹 子组件，但子组件不需要 props传值
 *  然后在子组件中，使用Consumer包裹，通过回调的方式 拿到数据。还可以逐次向下传递
 * 
 * 每当 Provider(提供者) 的 value 属性发生变化时，所有作为 Provider(提供者) 后代的 consumer(使用者) 组件 都将重新渲染。 
 * 从Provider 到其后代使用者的传播不受 shouldComponentUpdate 方法的约束，
 * 因此即使祖先组件退出更新，也会更新 consumer(使用者) 
 * 
 * 使用静态类型定义 contextType 属性， 可以用this.context 使用该 Context 类型 的最近的当前值，可以在任何生命周期方法中引用它，包括 render 函数
 */ 

export default class ConnectSon extends PureComponent {
    render() {
        return (
            <TodoDetailConnect.Consumer>
                {({name, age})=>
                    <span>{name}</span>
                }
            </TodoDetailConnect.Consumer>
        )
    }
}


