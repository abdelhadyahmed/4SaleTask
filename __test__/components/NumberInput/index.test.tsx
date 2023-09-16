import React from "react";
import {render,screen} from "@testing-library/react";
import NumberInput from "@/components/NumberInput";
import "@testing-library/jest-dom";

const mockOnChange = jest.fn();
let inputElement:any;

const defaultProps = {
    value: 3,
    placeholder: '0.0',
    min: 1,
    max: 100,
    step: 1,
    onChange: mockOnChange,
};


beforeEach(()=>{
    render(<NumberInput {...defaultProps} />);
    inputElement = screen.getByRole('spinbutton');
})

it('NumberInput component to be rendered',()=>{
    expect(inputElement).toBeInTheDocument();
})

it('NumberInput to have custome value',()=>{
    expect(inputElement).toHaveValue(3);
})

it('NumberInput inputHtml to have custome default type of number',()=>{
    expect(inputElement).toHaveAttribute('type', 'number');
})

it('NumberInput to have custome min',()=>{
    expect(inputElement).toHaveAttribute('min', "1");
})

it('NumberInput to have custome max',()=>{
    expect(inputElement).toHaveAttribute('max', "100");
})

it('NumberInput to have custome step while scroll on this field',()=>{
    expect(inputElement).toHaveAttribute('step', "1");
})

it('NumberInput to have custome placeholder',()=>{
    expect(inputElement).toHaveAttribute('placeholder', "0.0");
})

