### 可编辑表格
简单的可编辑表格配置
```jsx
import React, { Component } from 'react'
import EditTable from 'igroot-edit-table';

class Example extends Component {
    state = {
        dataSource: [{
            input: '1',
            select: '1',
            num: '1',
            checkbox: true,
            text: 'dadwadw'
        }]
    }
    render() {
        return (
            <EditTable
                columns={[
                    {
                        title: '输入框',
                        dataIndex: 'input',
                        type: 'input',
                        require: true
                    },
                    {
                        title: '下拉框',
                        dataIndex: 'select',
                        type: 'select',
                        selectOption: [
                            {
                                label: '测试',
                                value: '1'
                            }
                        ],
                        width: 200
                    },
                    {
                        title: '数字输入框',
                        dataIndex: 'num',
                        type: 'num'
                    },
                    {
                        title: '多选框',
                        dataIndex: 'checkbox',
                        type: 'checkbox'
                    },
                    {
                        title: '纯文本',
                        dataIndex: 'text',
                    }
                ]}
                dataModule={{
                    input: '1',
                    select: '1',
                    num: '1',
                    checkbox: true,
                    text: 'dadwadw'
                }}
                dataSource={this.state.dataSource}
                onChange={(dataSource) => { this.setState({ dataSource }) }}
            />
        )
    }
}

ReactDOM.render(<Example />, mountNode)
```
### props
| props      | 类型        | 说明                |
| ---------- | --------- | ----------------- |
| dataSource | array     | 表格数据源             |
| columns    | array     | 表头配置              |
| onChange   | functions | 必填项，会抛出一个更新完之后的数据 |
| dataModule | object    | 新增行的行数据           |
| remove     | boolean   | 是否可以删除行           |
| add        | boolean   | 是否可以增加行           |
| handle     | object    | 自定义操作             |

### 支持类型

渲染的表单类型声明集成到了columns 里面进行处理

| key          | 类型      | 说明                                |
| ------------ | ------- | --------------------------------- |
| type         | string  | 声明表单类型（input/num/select/checkout） |
| selectOption | array   | select的下拉框列表，只接受 label和value形式    |
| require      | boolean | 是否为必填                             |

