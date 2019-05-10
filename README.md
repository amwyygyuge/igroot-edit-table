# 可编辑表格

## 安装
npm
```
 npm install igroot-edit-table 
```
yarn
```
	yarn add igroot-edit-table
```

## 预览地址
https://playground-qguznsibkb.now.sh 

## 扩展的属性

使用 renderFrom 方式来渲染表单项目，此方法居于render扩展，给出一个回调和一个可编辑表格的表单值。
 ```typeScript
  (text: any, record: T, index: number, onChange: onChange, formValue: formValue): React.ReactNode;
 ```
 
 ### 配置示例
  ```typeScript
const columns: EditColumnProps<IUser>[] = [
	{
		title: "name",
		dataIndex: "name",
		renderForm: (value, row, index, onChange, formValue) => <Input value={value} onChange={e => {
			if (formValue) {
				formValue[index].cname = "可编辑表格"
			}
			onChange(e.target.value)
		}
		} />,
	},
	{
		title: "可受控的表单项目cname",
		dataIndex: "cname",
		initValue: "默认值",
		renderForm: (value, row, index, onChange) => <Input value={value} onChange={e => onChange(e.target.value)} />,
	},
	{
		title: "下拉表单",
		dataIndex: "options",
		initValue: "2",
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
		title: "日期控件",
		dataIndex: "date",
		renderForm: (value, row, index, onChange) => <DatePicker value={value} onChange={onChange} />
	},
	{
		title: "根据表单项生成的展示数据showDate",
		dataIndex: "showDate",
		render: (value, row) => {
			if (row.date) {
				return row.date.format()
			} else {
				return "暂未选择"
			}
		}
	},
]
  ```

  ## 完整示例
   ```typeScript
   import * as React from 'react'
import EditTable, { EditColumnProps } from 'igroot-edit-table'
import { Button, Card, Input, Form, Select, DatePicker } from 'igroot'
import { FormComponentProps } from 'igroot/lib/form';
import * as moment from 'moment';
import './index.less'
interface IUser {
	key: number
	name: string
	cname: string
	date: moment.Moment | undefined
}
const columns: EditColumnProps<IUser>[] = [
	{
		title: "name",
		dataIndex: "name",
		renderForm: (value, row, index, onChange, formValue) => <Input value={value} onChange={e => {
			if (formValue) {
				formValue[index].cname = "可编辑表格"
			}
			onChange(e.target.value)
		}
		} />,
	},
	{
		title: "可受控的表单项目cname",
		dataIndex: "cname",
		initValue: "默认值",
		renderForm: (value, row, index, onChange) => <Input value={value} onChange={e => onChange(e.target.value)} />,
	},
	{
		title: "下拉表单",
		dataIndex: "options",
		initValue: "2",
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
		title: "日期控件",
		dataIndex: "date",
		renderForm: (value, row, index, onChange) => <DatePicker value={value} onChange={onChange} />
	},
	{
		title: "根据表单项生成的展示数据showDate",
		dataIndex: "showDate",
		render: (value, row) => {
			if (row.date) {
				return row.date.format()
			} else {
				return "暂未选择"
			}
		}
	},
]

class App extends React.Component<FormComponentProps> {
	public test = () => {
		const { getFieldsValue } = this.props.form
		console.log(getFieldsValue());
	}
	componentDidMount() {

		const { setFieldsValue } = this.props.form
		setFieldsValue({
			demos: [
				{ cname: "setFieldsValuesh设置的值", name: "igroot-edit-table" },
				{ cname: "setFieldsValuesh设置的值", name: "igroot-edit-table" },
				{ cname: "setFieldsValuesh设置的值", name: "igroot-edit-table" }
			]
		})
	}
	render() {
		const { getFieldDecorator } = this.props.form
		return (
			<Card title='可编辑表格示例'>
				<Form>
					{getFieldDecorator("demos")(
						<EditTable<IUser>
							columns={columns}
						/>
					)}
				</Form>
				<Button style={{ marginTop: 5 }} onClick={this.test}>获取表单值</Button>
			</Card>
		)
	}
}

export default Form.create()(App)

   ```

  