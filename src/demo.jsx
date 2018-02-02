import React, { Component } from 'react'
import EditTable from './editTable';

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

export default Example