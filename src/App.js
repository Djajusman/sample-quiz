import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [step, setStep] = useState(0);
  const [isPrev, setIsPrev] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [checked, setChecked] = useState(false);
  const [question, setQUestion] = useState([
    {
      number: "Question 1",
      option: ["Opsi 1", "Opsi 2", "Opsi 3"],
      answer: null,
    },
    {
      number: "Question 2",
      option: ["Opsi 1", "Opsi 2", "Opsi 3"],
      answer: null,
    },
    {
      number: "Question 3",
      option: ["Opsi 1", "Opsi 2", "Opsi 3"],
      answer: null,
    },
    {
      number: "Question 4",
      option: ["Opsi 1", "Opsi 2", "Opsi 3"],
      answer: null,
    },
  ]);

  useEffect(() => {
    setChecked(null);
  }, [step]);

  const renderSoal = () => {
    return (
      <div>
        <div>{question[step].number}</div>
        <div
          className="soal-wrapper"
          style={{
            backgroundColor:
              isPrev && question[step].answer && isNext ? "#cacaca" : null,
            pointerEvents:
              question[step].answer && isPrev && isNext ? "none" : null,
          }}
        >
          {renderQuestion()}
        </div>
        <div
          style={{ display: "flex", justifyContent: "end", marginTop: "5px" }}
        >
          <button
            style={{ marginRight: "5px" }}
            onClick={onClickPrev}
            disabled={step === 0 ? true : false}
          >
            Prev
          </button>
          <button
            onClick={onClickNext}
            disabled={!checked && !question[step].answer}
          >
            {step === question.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    );
  };

  const renderQuestion = () => {
    return question[step].option.map((el, index) => {
      return (
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="radio"
            id={`${el} ${question[step].number}`}
            name={question[step].number}
            value={`${el} ${question[step].number}`}
            checked={
              `${el} ${question[step].number}` === question[step].answer
                ? "checked"
                : null
            }
            onChange={onChangeAnswer}
          />
          <label
            for={`${el} ${question[step].number}`}
            style={{ marginLeft: "2px" }}
          >
            {el}
          </label>
        </div>
      );
    });
  };

  const onClickNext = async (e) => {
    if (!question[step].answer) {
      await setQUestion([
        ...question.slice(0, step),
        {
          ...question[step],
          answer: checked,
        },
        ...question.slice(step + 1),
      ]);
    }

    if (step === question.length - 1) {
      return;
    }

    setStep(step + 1);
  };

  const onClickPrev = () => {
    if (step <= 0) {
      return;
    }

    setIsNext(true);
    setIsPrev(true);
    setStep(step - 1);
  };

  const onChangeAnswer = (e) => {
    setChecked(e.target.value);
    // setQUestion([
    //   ...question.slice(0, step),
    //   {
    //     ...question[step],
    //     answer: e.target.value,
    //   },
    //   ...question.slice(step + 1),
    // ]);
  };
  console.log(question);
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "2%" }}>
      {renderSoal()}
    </div>
  );
}

export default App;
