import * as  React from 'react'
import { Table, Button } from 'igroot'
import { TableProps, ColumnProps } from 'igroot/lib/table/';
interface onChange {
	(value: any): void
}
interface EditRender<T> {
	(text: any, record: T, index: number, onChange: onChange, formValue: formValue): React.ReactNode
}
interface EditColumnProps<T> extends ColumnProps<T> {
	renderForm?: EditRender<T>
	initValue?: any
}
type formValue = any[] | undefined
interface EditTableProps<T> extends TableProps<T> {
	value?: formValue
	onChange?: onChange
	columns?: EditColumnProps<T>[];
}
interface resolveColumns {
	<T>(columns: EditColumnProps<T>[] | undefined, value: formValue, onChange: onChange | undefined): EditColumnProps<T>[]
}


function createHandleColumn<T>(formValue: formValue, onChange: onChange | undefined): ColumnProps<T> {
	const handleRemove = (index: number) => {
		if (formValue) {
			formValue.splice(index, 1)
			onChange && onChange(formValue)
		}
	}
	const handleColumn = {
		title: "操作",
		dataIndex: "handle",
		width: 80,
		render: (value: any, row: T, index: number) =>
			<div style={{ textAlign: "center" }}>
				<Button type="danger" size="small" onClick={() => handleRemove(index)} >删除</Button>
			</div>
	}
	return handleColumn
}

const resolveColumns: resolveColumns = function <T>(columns: EditColumnProps<T>[] | undefined, formValue: any[] | undefined, onChange: onChange | undefined) {
	if (Array.isArray(columns)) {
		return columns.map((item: EditColumnProps<T>) => {
			const { key, dataIndex, renderForm } = item
			if (renderForm) {
				const _dataIndex = dataIndex || key
				const _render = (value: any, row: T, index: number) => {
					const callBack = (cbValue: any) => {
						if (formValue) {
							const data = formValue[index]
							if (_dataIndex) {
								data[_dataIndex] = cbValue
							}
							formValue[index] = data
							onChange && onChange(formValue)
						}
					}
					const Node = renderForm(value, row, index, callBack, formValue)
					if (Node) {
						return Node
					}
				}
				item.render = _render
			}
			return item
		})
	}
	return []
}

const createAddButton = (formValue: formValue, onChange: onChange | undefined, initValue: any) => {
	const handleAdd = () => {
		const _initValue = JSON.parse(JSON.stringify(initValue))
		if (formValue) {
			formValue.push(_initValue)
			onChange && onChange(formValue)
		} else {
			onChange && onChange([_initValue])
		}
	}
	return <Button onClick={handleAdd}>新加列</Button>
}

function createInitValue<T>(columns: EditColumnProps<T>[] | undefined) {
	const _initValue: any = {}
	if (columns) {
		columns.forEach((item: EditColumnProps<T>) => {
			const { key, dataIndex, initValue } = item
			const _dataIndex = dataIndex || key
			if (_dataIndex) {
				_initValue[_dataIndex] = initValue ? initValue : undefined
			}
		});
	}
	return _initValue
}

function EditTable<T>(editTableProps: EditTableProps<T>) {
	const { value: formValue, onChange, columns } = editTableProps
	const _columns = resolveColumns<T>(columns, formValue, onChange)
	const handleColumn = createHandleColumn<T>(formValue, onChange)
	const initValue = createInitValue<T>(columns)
	const AddButton = createAddButton(formValue, onChange, initValue)
	if (!Array.isArray(formValue)) {
		onChange && onChange([])
		return <div>表单数据格式必须为数组。</div>
	}
	return <Table bordered size="small" title={() => AddButton} {...editTableProps} columns={[handleColumn, ..._columns]} dataSource={formValue} pagination={false} />
}

export {
	EditColumnProps
}

export default EditTable
