import * as React from 'react'
import EditTable, { IEditColumnProps } from './../../src/'
import { Button, Card, Input, Form, Select, DatePicker } from 'igroot'
import { FormComponentProps } from 'igroot/lib/form'
import * as moment from 'moment'
import './index.less'
interface IUser {
	key: number
	name: string
	cname: string
	date: moment.Moment | undefined
}

const columns: IEditColumnProps<IUser>[] = [
	{
		title: 'name',
		dataIndex: 'name',
		width: 800,
		renderForm: (value, row, index, onChange, formValue) =>
			<Input value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
				if (formValue) {
					formValue[index].cname = '可编辑表格'
				}
				onChange(e.target.value)
			}
			} />,
	},

	{
		title: '可受控的表单项目cname',
		dataIndex: 'cname',
		initValue: '默认值',
		renderForm: (value, row, index, onChange) =>
			<Input value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)} />,
	},
	{
		title: '下拉表单',
		dataIndex: 'options',
		initValue: '2',
		renderForm: (value, row, index, onChange) => <Select value={value} onChange={onChange}>
			<Select.Option key="1">第一</Select.Option>
			<Select.Option key="2">第二</Select.Option>
			<Select.Option key="3">第三</Select.Option>
			<Select.Option key="4">第四</Select.Option>
			<Select.Option key="5">第五</Select.Option>
			<Select.Option key="6">第六</Select.Option>
		</Select>
	},
	{
		title: '日期控件',
		dataIndex: 'date',
		renderForm: (value, row, index, onChange) => <DatePicker value={value} onChange={onChange} />
	},
	{
		title: '根据表单项生成的展示数据showDate',
		dataIndex: 'showDate',
		render: (value, row) => {
			if (row.date) {
				return row.date.format()
			} else {
				return '暂未选择'
			}
		}
	},
]

class App extends React.Component<FormComponentProps> {
	public test = () => {
		const { getFieldsValue } = this.props.form
		console.log(getFieldsValue())
	}
	public componentDidMount() {

		const { setFieldsValue } = this.props.form
		setFieldsValue({
			demos: [
				{ cname: 'setFieldsValuesh设置的值', name: 'igroot-edit-table' },
				{ cname: 'setFieldsValuesh设置的值', name: 'igroot-edit-table' },
				{ cname: 'setFieldsValuesh设置的值', name: 'igroot-edit-table' }
			]
		})
	}
	public render() {
		const { getFieldDecorator } = this.props.form
		return (
			<Card title="可编辑表格示例">
				<Form>
					{getFieldDecorator('demos')(
						<EditTable<IUser>
							columns={columns}
							disableEdit
						/>
					)}
				</Form>
				<Button style={{ marginTop: 5 }} onClick={this.test}>获取表单值</Button>
			</Card>
		)
	}
}

export default Form.create()(App)
