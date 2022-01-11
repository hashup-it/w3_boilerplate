/* eslint-disable react/require-default-props */
/* eslint-disable no-param-reassign */
import React, { memo } from 'react';
import Select from 'react-select';

const customStyles = ({ width }: { width?: string }) => {
	return {
		control: (provided: any) => {
			return {
				...provided,
				borderRadius: '8px',
				width: width && width,
				boxShadow: '0',
				cursor: 'pointer',
			};
		},
		menuList: (provided: any) => ({
			...provided,
			'&::-webkit-scrollbar-thumb': {
				display: 'none',
			},
			'&::-webkit-scrollbar': {
				display: 'none',
			},
		}),
	};
};

const SelectOverview = ({
	options,
	isDisabled,
	value,
	onChange,
	isMulti,
	onInputChange,
	inputValue,
	isSearchable,
	closeMenuOnSelect,
	menuPlacement,
	placeholder,
	isLoading,
	maxMenuHeight,
	width,
}: {
	options?: any;
	isDisabled?: boolean;
	value: any;
	onChange?: any;
	inputValue?: string;
	onInputChange?: (input: string) => void;
	isMulti?: boolean;
	isSearchable?: boolean;
	closeMenuOnSelect?: boolean;
	placeholder?: string;
	isLoading?: boolean;
	maxMenuHeight?: number;
	menuPlacement?: 'auto' | 'bottom' | 'top';
	width?: string;
}) => {
	const onChangeInputElement = (text: string, { action }: any) => {
		if (action === 'input-change' && onInputChange) {
			onInputChange(text);
		}
	};
	return (
		<Select
			styles={customStyles({ width })}
			placeholder={placeholder}
			isSearchable={isSearchable}
			isMulti={isMulti}
			onInputChange={onChangeInputElement}
			inputValue={inputValue}
			isLoading={isLoading}
			closeMenuOnSelect={closeMenuOnSelect}
			options={options}
			menuPlacement={menuPlacement || 'auto'}
			isDisabled={isDisabled}
			onChange={onChange}
			value={value}
			maxMenuHeight={maxMenuHeight}
			components={{
				IndicatorSeparator: () => null,
			}}
		/>
	);
};

export default memo(SelectOverview);
