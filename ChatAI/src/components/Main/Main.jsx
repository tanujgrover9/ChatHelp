import { useContext, useCallback } from "react";
import "./main.css";
import { Context } from "../../context/context";
import { assets } from "../../assets/assets";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    stopProcessing,
    newChat
  } = useContext(Context);

  const handleSend = useCallback(() => {
    if (input.trim()) {
      onSent(input);
    }
  }, [input, onSent]);

  const handleStop = useCallback(() => {
    stopProcessing();
  }, [stopProcessing]);

  return (
    <div className="main">
      <img className="bg-img" src={assets.orbital}></img>
      <header className="nav">
        <p className="home" onClick={() => newChat()}>
          Chathelp<span className="dot">...</span>
        </p>
        <img src={assets.user_icon} alt="User Icon" />
      </header>
      <main className="main-container">
        {!showResult ? (
          <>
            <section className="greet">
              <p>
                <span>Hello, Dev</span>
              </p>
              <p>
                Welcome to Chathelp<span className="dot">...</span>
              </p>
            </section>
            <div className="cards">
              <div className="card c">
                 <p>
                  Guide
                </p>
                <img src={assets.compass_icon} alt="" />

              </div>
              <div className="card c">
                 <p>
                  Help
                </p>
                <img src={assets.edit} alt="" />

              </div>
              <div className="card">
                 <p>
                  Education
                </p>
                <img src={assets.lightbulb} alt="" />

              </div>
              <div className="card">
                 <p>
                 Code
                </p>
                <img src={assets.web} alt="" />

              </div>
            </div>

          </>
        ) : (
          <section className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="User Icon" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini Icon" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }} />
              )}
            </div>
          </section>
        )}

        <footer className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter prompt"
            />
            <div className="icons">
              <img src={assets.gallery_icon} alt="Gallery Icon" />
              <img src={assets.mic_icon} alt="Mic Icon" />
              {input && (
                <img
                  onClick={handleSend}
                  src={assets.send_icon}
                  alt="Send Icon"
                />
              )}
              <img onClick={handleStop} src={assets.stop} alt="Stop Icon" />
            </div>
          </div>
          <div className="bottom-info">
            <p>
              By:{" "}
              <span className="by">Anshuman Singh</span>
            </p>
            <p><span className="by">Note</span> If you stop the response in middle then add the next prompt twice</p>
    
            <p></p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Main;
