import React from "react";
import "./Panels.css";

const Panels = ({ subject, handleChangeGrade, handleChangeUnit }) => {
	return (
		<div className='panels'>
			<div className='upper-part'>
				<h4>Subject {`${subject.subject}`}</h4>
			</div>
			<div className='lower-part'>
				<div className='section'>
					<p>Grade:</p>
					<select
						value={`${subject.grade}`}
						onChange={(event) => {
							handleChangeGrade(
								parseInt(subject.subject),
								event.target.value
							);
						}}>
						<option disabled='disabled' hidden='hidden' value=''>
							Select Grade
						</option>
						<option value={"1.0"}>1.0</option>
						<option value={"1.25"}>1.25</option>
						<option value={"1.50"}>1.50</option>
						<option value={"1.75"}>1.75</option>
						<option value={"2.0"}>2.0</option>
						<option value={"2.25"}>2.25</option>
						<option value={"2.50"}>2.50</option>
						<option value={"2.75"}>2.75</option>
						<option value={"3.0"}>3.0</option>
					</select>
				</div>
				<div className='section'>
					<p>Units:</p>
					<select
						value={`${subject.unit}`}
						onChange={(event) => {
							handleChangeUnit(
								parseInt(subject.subject),
								event.target.value
							);
						}}>
						<option disabled='disabled' hidden='hidden' value=''>
							Select Unit
						</option>
						<option value={1}>1</option>
						<option value={2}>2</option>
						<option value={3}>3</option>
						<option value={4}>4</option>
						<option value={5}>5</option>
						<option value={6}>6</option>
					</select>
				</div>
			</div>
		</div>
	);
};

export default Panels;
