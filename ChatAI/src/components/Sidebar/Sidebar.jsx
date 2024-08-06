import { useContext, useState } from "react";
import "./sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";
const Sidebar = () => {
  const [extend, setExtend] = useState(true);
  const { onSent, prevPrompts, setRecentPrompt ,newChat} = useContext(Context);
  
  const loadPrompt =async (prompt)=>{
    setRecentPrompt(prompt)
    await onSent(prompt)

  }

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => {
            setExtend((prev) => !prev);
          }}
          src={assets.menu_icon}
          alt=""
        ></img>
        <br />
        <div onClick={()=>newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extend ? <p>New Chat</p> : null}
        </div>
        {extend ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item,index)=>{
              return(
                <div onClick={()=>loadPrompt(item)} className="recent-entry" key={index}>
                <img src={assets.message_icon}></img>
                <p>{item.slice(0,18)}...</p>
              </div>

              )

            })}
           
          </div>
        ) : null}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extend ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extend ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extend ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
