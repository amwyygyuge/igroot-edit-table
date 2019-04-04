import React, { Component } from 'react'
import { Button, Input, Table, Select, message, InputNumber, Checkbox } from 'igroot'
const Option = Select.Option,
	errorStatus = { borderColor: '#f04134' }
/**
 * 
 * @prop dataSource 数据源
 * @prop columns 列
 * @prop onChange 触发回调
 * @prop dataModule 添加的数据格式
 * @prop handle 自定义的操作
 * @class EditTable
 * @extends {Component}
 */
class EditTable extends Component {
	renderInput = (index, name, text, require, props = {}, row) => {
		return (
			<div className={require === true ? text === '' ? 'has-error' : null : null}>
				<Input
					{...props}
					value={text}
					className='has-error'
					onChange={value => {
						this.handleChange(name, index, value.target.value)
					}}
				/>
			</div>
		)
	}

	renderCheckbox = (index, name, text, props = {}, row) => {
		return (
			<Checkbox
				{...props}
				checked={text === 1 ? true : false}
				onChange={e => {
					this.handleChange(name, index, text === 1 ? 0 : 1)
				}}
			/>
		)
	}
	renderNumberInput = (index, name, text, require, props = {}) => {
		return (
			<div className={require === true ? text === '' ? 'has-error' : null : null}>
				<InputNumber
					{...props}
					value={text}
					className='has-error'
					style={{ width: '100%' }}
					onChange={value => this.handleChange(name, index, value)}
				/>
			</div>
		)
	}
	renderSelect = (index, name, text, options, require, props = {}, optionConfig) => {
		if (optionConfig) {
			options.map(option => {
				option.disabled = false
				return option
			})
			optionConfig.forEach(item => {
				const a = options.find(option => option.value === parseInt(item, 0) || option.value === item)
				if (a) {
					a.disabled = true
				}
			})
		}
		return (
			<div className={require === true ? text === '' || text === undefined ? 'has-error' : null : null}>
				<Select
					{...props}
					value={text}
					style={{ width: '100%' }}
					onChange={value => {
						this.handleChange(name, index, value)
						if (props.onChange) {
							props.onChange(value, optionConfig, name)
						}
					}}
				>
					{options.map(item => (
						<Option disabled={item.disabled} value={`${item.value}`} key={`${item.value}`}>
							{item.label}
						</Option>
					))}
				</Select>
			</div>
		)
	}
	// 删除行
	handleDetlete = index => {
		const dataSource = this.props.dataSource
		if (dataSource.length === 1) {
			message.error('数据不能少于一列')
		} else {
			dataSource.splice(index, 1)
			this.setState({ dataSource })
			this.props.onChange(dataSource)
		}
	}
	// 提交变更
	handleChange(key, index, value) {
		const { dataSource } = this.props
		dataSource[index][key] = value
		this.props.onChange(dataSource)
	}
	// 新增行
	handleAdd = () => {
		const { dataSource, dataModule } = this.props
		if (dataModule) {
			dataSource.push(Object.assign({}, dataModule))
		} else {
			const newRow = Object.assign({}, dataSource[0])
			for (let item in newRow) {
				newRow[item] = ''
			}
			dataSource.push(newRow)
		}
		this.props.onChange(dataSource)
	}

	render() {
		const { columns, onHandle, title, dataSource, handle, remove, add } = this.props
		const state_columns = columns.map(item => {
			const { dataIndex, require, props, optionConfig, type, selectOption, render } = item
			if (!render) {
				switch (type) {
					case 'select':
						item.render = (text, row, index) =>
							this.renderSelect(index, dataIndex, text, selectOption, require, props, optionConfig)
						break
					case 'num':
						item.render = (text, row, index) =>
							this.renderNumberInput(index, dataIndex, text, require, props)
						break
					case 'checkbox':
						item.render = (text, row, index) => this.renderCheckbox(index, dataIndex, text, props, row)
						break
					case 'input':
						item.render = (text, row, index) => this.renderInput(index, dataIndex, text, require, props)
						break
					default:
						item.render = text => text
						break
				}
			}
			return item
		})
		if (remove !== false || handle) {
			state_columns.push({
				title: '操作',
				dataIndex: 'handle',
				width: handle ? handle.width : 60,
				render: (text, row, index) => (
					<div style={{ textAlign: 'center' }}>
						{handle ? (
							<a
								style={{ marginRight: '8px' }}
								onClick={e => (handle.function ? handle.function(row) : null)}
							>
								{handle.element}
							</a>
						) : null}
						{remove === false ? null : <a onClick={() => this.handleDetlete(index)}>删除</a>}
					</div>
				)
			})
		}

		return (
			<div>
				{add === false ? null : (
					<Button onClick={this.handleAdd} style={{ marginBottom: 4 }}>
						添加
					</Button>
				)}
				<Table
					title={title}
					pagination={false}
					className='table'
					bordered
					{...this.props}
					columns={state_columns}
					dataSource={dataSource}
				/>
			</div>
		)
	}
}

export default EditTable
