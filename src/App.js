import { useEffect, useState } from "react";
import "./App.css";
import Panels from "./Panels";

function App() {
	const [isStarted, setStarted] = useState(true);
	const [isModalOpen, setModalOpen] = useState(false);

	const [numberOfSubjects, setNumberOfSubjects] = useState(0);
	const [arrayOfSubjects, setArrayOfSubjects] = useState([]);
	const [isButtonEnable, setButtonEnable] = useState(false);

	const [gwa, setGWA] = useState(0);

	function handleOK() {
		if (numberOfSubjects === 0) {
			setStarted(false);
			setModalOpen(true);
			return alert("Error detected, Please try again!");
		}
		let subjects = [];
		for (let a = 0; a < parseInt(numberOfSubjects); a++) {
			subjects.push({
				subject: a + 1,
				grade: "",
				unit: 3,
			});
		}

		setArrayOfSubjects(subjects);
	}

	function back() {
		setArrayOfSubjects([]);
		setModalOpen(true);
		setStarted(false);
		setNumberOfSubjects(0);
		setGWA(0);
	}

	function handleChangeGrade(index, newGrade) {
		setArrayOfSubjects(
			arrayOfSubjects.map((item) =>
				item.subject === index ? { ...item, grade: newGrade } : item
			)
		);
	}

	function handleChangeUnit(index, newUnit) {
		setArrayOfSubjects(
			arrayOfSubjects.map((item) =>
				item.subject === index ? { ...item, unit: newUnit } : item
			)
		);
	}

	function handleFindGWA() {
		let holdGrade = 0;
		let holdUnit = 0;
		let product = 0;

		for (let a = 0; a < numberOfSubjects; a++) {
			holdGrade = parseFloat(arrayOfSubjects[a].grade);
			holdUnit += parseInt(arrayOfSubjects[a].unit);
			product += parseFloat(holdGrade * arrayOfSubjects[a].unit);
		}

		const holdgwa = parseFloat(product) / holdUnit;

		let convertGWA = String(holdgwa);

		let convertedGWA = convertGWA.split(".");

		if (convertedGWA.length > 1) {
			setGWA(parseFloat(holdgwa));
		} else {
			let convertToFloat = holdgwa + ".0";
			setGWA(convertToFloat);
		}
	}

	useEffect(() => {
		let holdGrade = "";
		try {
			for (let a = 0; a < numberOfSubjects; a++) {
				holdGrade = arrayOfSubjects[a].grade;
				if (holdGrade === "") {
					return setButtonEnable(false);
				} else {
					setButtonEnable(true);
				}
			}
		} catch (error) {}
	});

	return (
		<div className='app-container'>
			<div className='get-started-container'>
				{isStarted && (
					<div className='welcome-parent-container'>
						<div className='welcome-container'>
							<h3>Want to calculate your GPA? </h3>
							<button
								onClick={() => {
									setStarted(false);
									setModalOpen(true);
								}}>
								Get Started
							</button>
						</div>
					</div>
				)}
				{isModalOpen && (
					<div className='modal-container'>
						<div
							className='overlay-style'
							onClick={(e) => {
								setStarted(true);
								setModalOpen(false);
							}}></div>
						<form
							className='modal-style'
							onSubmit={(e) => {
								setStarted(false);
								setModalOpen(false);
								handleOK();
								e.preventDefault();
							}}>
							<input
								autoFocus
								type='number'
								placeholder='Enter number of subjects'
								onChange={(e) =>
									setNumberOfSubjects(parseInt(e.target.value))
								}
							/>
							<button
								onClick={(e) => {
									setStarted(false);
									setModalOpen(false);
									handleOK();
									e.preventDefault();
								}}>
								OK
							</button>
						</form>
					</div>
				)}
			</div>

			{numberOfSubjects !== 0 && arrayOfSubjects.length !== 0 && (
				<div className='panel-container'>
					<div className='panel-header'>
						<h3>Enter your grades and subject units</h3>
						<button onClick={back}>Back</button>
					</div>
					{arrayOfSubjects.map((subject, index) => {
						return (
							<div key={index}>
								<Panels
									subject={subject}
									handleChangeGrade={handleChangeGrade}
									handleChangeUnit={handleChangeUnit}
								/>
							</div>
						);
					})}
					<div className='button-container'>
						<button
							style={
								isButtonEnable ? { opacity: "1" } : { opacity: "0.5" }
							}
							disabled={isButtonEnable ? "" : "disabled"}
							onClick={handleFindGWA}>
							Find GPA
						</button>

						<div className='result-container'>
							<p>Result</p>
							<h3>GPA: {gwa}</h3>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
