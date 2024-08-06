/* eslint-disable react/no-danger-with-children */
import "./main.css";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { Context } from "../../context/context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p>Chathelp<span className="dot">...</span></p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev</span>
              </p>
              <p>Welcome to Chathelp<span className="dot">...</span></p>
            </div>
            <div className="cards">
              <div className="card">
                {/* <p>
                  Suggest some beautiful places to see on an upcoming road trip
                </p> */}
                <img src={assets.img1}></img>
                {/* <img src={assets.compass_icon} alt="" /> */}
              </div>
              {/* <div className="card">
              <img src={assets.img2}></img>

                <p>Which would be the best site for tracking</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
              <img src={assets.img3}></img>

                <p>Suggest some good food that should be spicy</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
              <img src={assets.img4}></img>

                <p>Summarize this concept: urban planning</p>
                <img src={assets.code_icon} alt="" />
              </div> */}
            </div>
          </>
        ) : (
          <div className="result">
            {/* Display result data here */}
            <div className="result-title">
              <img src={assets.user_icon} alt=""></img>
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon}></img>
              {loading ? (
                <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
             {input ? <img
                onClick={() => onSent(input)}
                src={assets.send_icon}
                alt=""
              />:null}
            </div>
          </div>
          <div className="bottom-info">
            <p>
              ChatHelp may display inaccurate info, so double-check its result
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
