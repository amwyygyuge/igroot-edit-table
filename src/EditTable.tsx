import * as  React from 'react'
import { Table, Button } from 'igroot'
import { TableProps, ColumnProps } from 'igroot/lib/table/'
type onChange = (value: any) => void
type editRender<T> = (text: any, record: T, index: number, onChange: onChange, formValue: formValue) => React.ReactNode
interface IEditColumnProps<T> extends ColumnProps<T> {
	renderForm?: editRender<T>
	initValue?: any
}
type formValue = any[] | undefined

interface IEditTableProps<T> extends TableProps<T> {
	value?: formValue
	onChange?: onChange
	columns?: IEditColumnProps<T>[],
	disableEdit?: boolean
}
type IResolveColumns = <T>(
	columns: IEditColumnProps<T>[] | undefined,
	value: formValue,
	onChange: onChange | undefined
)
	=> IEditColumnProps<T>[]

function createHandleColumn<T>(IFormValue: formValue, change: onChange | undefined): ColumnProps<T> {
	const handleRemove = (index: number) => {
		if (IFormValue) {
			IFormValue.splice(index, 1)
			if (change) {
				change(IFormValue)
			}
		}
	}
	const handleColumn = {
		dataIndex: 'handle',
		title: '操作',
		width: 80,
		render: (value: any, row: T, index: number) =>
			<div style={{ textAlign: 'center' }}>
				<Button type="danger" size="small" onClick={() => handleRemove(index)} >删除</Button>
			</div>
	}
	return handleColumn
}

const resolveColumns: IResolveColumns =
	function <T>(
		columns: IEditColumnProps<T>[] | undefined, IFormValue: any[] | undefined, change: onChange | undefined) {
		if (Array.isArray(columns)) {
			return columns.map((item: IEditColumnProps<T>) => {
				const { key, dataIndex, renderForm } = item
				if (renderForm) {
					const DataIndex = dataIndex || key
					const Render = (value: any, row: T, index: number) => {
						const callBack = (cbValue: any) => {
							if (IFormValue) {
								const data = IFormValue[index]
								if (DataIndex) {
									data[DataIndex] = cbValue
								}
								IFormValue[index] = data
								if (change) {
									change(IFormValue)
								}
							}
						}
						const Node = renderForm(value, row, index, callBack, IFormValue)
						if (Node) {
							return Node
						}
					}
					item.render = Render
				}
				return item
			})
		}
		return []
	}

const createAddButton = (IFormValue: formValue, change: onChange | undefined, initValue: any) => {
	const handleAdd = () => {
		const InitValue = JSON.parse(JSON.stringify(initValue))
		if (IFormValue) {
			IFormValue.push(InitValue)
			if (change) {
				change(IFormValue)
			}
		} else {
			if (change) {
				change(IFormValue)
			}
		}
	}
	return <Button onClick={handleAdd}>新加列</Button>
}

function createInitValue<T>(columns: IEditColumnProps<T>[] | undefined) {
	const InitValue: any = {}
	if (columns) {
		columns.forEach((item: IEditColumnProps<T>) => {
			const { key, dataIndex, initValue } = item
			const DataIndex = dataIndex || key
			if (DataIndex) {
				InitValue[DataIndex] = initValue ? initValue : undefined
			}
		})
	}
	return InitValue
}

const EditTable = function <T>(editTableProps: IEditTableProps<T>) {
	const { value: FormValue, onChange: change, columns, disableEdit = false } = editTableProps
	const Columns = resolveColumns<T>(columns, FormValue, change)
	const handleColumn = createHandleColumn<T>(FormValue, change)
	const initValue = createInitValue<T>(columns)
	const AddButton = createAddButton(FormValue, change, initValue)
	if (!Array.isArray(FormValue)) {
		if (change) {
			change([])
		}
		return <div>表单数据格式必须为数组。</div>
	}
	const RealColumns = disableEdit ? [...Columns] : [handleColumn, ...Columns]
	const title = disableEdit ? undefined : () => AddButton
	return <Table bordered size="small"
		title={title}
		{...editTableProps}
		columns={RealColumns}
		dataSource={FormValue} pagination={false} />
}

export {
	IEditColumnProps
}
export default EditTable
