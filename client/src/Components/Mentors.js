import React, { useEffect, useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
} from "react-router-dom";
// import Questions from "../mockData/Questions.json";

import "../App.css";
import "../grid.css";

export default function Mentors(props) {
	// const [fetchedQuestions,setfetchedQuestions]=useState(props.questions);
	const [newQuizzQuestions, setNewQuizzQuestions]=useState([]);
	const [refreshQuestions, setRefreshQuestions]=useState(false);

	const [newQuizz,setNewQuizz]=useState(	{

		name: "",
		publiShingDate: "",
		questions_id: [],
	});



	useEffect(() => {



		const makeQuestions=()=>{
			let newQuizQuestions = [];
			newQuizQuestions = newQuizz.questions_id.map((selId)=>{

				let found = (props.questions.find((question)=>question._id==selId));
				newQuizQuestions.push(found);
				setNewQuizzQuestions(newQuizQuestions);
			}
			);

		};
		makeQuestions();
	},[newQuizz.questions_id]);



	const addQuestion =(e)=>{
		console.log(e.target.value);
		setNewQuizz({ ...newQuizz,
			questions_id:[...newQuizz.questions_id,e.target.value],
		},
		);

	};
	const submitNewQ =()=>{
		if(newQuizz.name.length<8){

			alert("Quiz name should have at least 8 sybols");

		} else if(newQuizzQuestions.length<5){

			alert("Quizz  should have at least 5 questions");

		} else{
			sendQuiz();
		}
	};
	const sendQuiz =()=>{
		alert("done");
		fetch("http://localhost:3100/api/quiz", { method:"POST",headers: { "Content-type": "application/json" },
			body: JSON.stringify(newQuizz) })
			.then((response) => response.json())
			.then((data) =>console.log(data))
			.catch((err) => console.error(err));



	};
	const newQuizName =(e)=>{

		setNewQuizz({ ...newQuizz,
			name:e.target.value,
		},
		);


	};

	const removeQuestion =(e)=>{
		console.log(newQuizz.questions_id);

		let filterIdArr=newQuizz.questions_id.filter((boo) => {

			return(boo!= e.target.value);

		});
		console.log(filterIdArr);
		setNewQuizz({ ...newQuizz,
			questions_id:filterIdArr,
		},
		setRefreshQuestions(!refreshQuestions)
		);

		setNewQuizzQuestions(newQuizzQuestions.filter((obj) => obj._id != e.target.value));
		// e.target.checked="false";
	};
	if(props.questions){
		return(<div className='row'>
			<div className='col-9 cardBlock'>
				{props.questions.map((quest)=>
					<div className='col-3 card'>

						<button id={quest._id} value={quest._id} onClick={addQuestion}>add to quiz</button>

						<div className="quizzQuestion">{quest.question}</div>

						<div className='answers'>
							{Object.entries(quest.answers).map(([key, value]) =>{

								return(
									<div>


										<div className='col-6 answer'>{value}</div>

									</div>);

							}
			  )}</div>


			  </div>
				)
				}</div>

			<div className='col-3 newQuiz'><h1>New quiz</h1>
				<input type='text' onKeyUp={newQuizName} placeholder={"new quiz name"} />
				{newQuizzQuestions.map((quest)=>
					<div className='col-12 card' key={quest.question}>
 	<button key={quest._id+quest.question} type="checkbox" checked='checked' id="horns" key={quest._id+quest.question} value={quest._id} onClick={removeQuestion} >x</button>
						<label htmlFor={quest._id+quest.question}>remove from quizz</label>
						<div>{quest.question}</div>

						<div className='answers'>
							{Object.entries(quest.answers).map(([key, value]) =>{
							// use keyName to get current key's name
								return(
									<div>


										<div className='col-6'>{value}</div>

									</div>);

							}
			  )}</div>


			  </div>
				)
				}<button onClick={submitNewQ}>submit new quizz</button></div>

		</div>
		);
	} else{
		return(<div>no questions loaded</div>);
	}


}