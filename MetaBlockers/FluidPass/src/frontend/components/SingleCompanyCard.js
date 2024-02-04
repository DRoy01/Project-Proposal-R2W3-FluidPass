import { Link } from "react-router-dom";
import { eventInfo } from "../utils/demoData";
import { useState } from "react";
import connectWallet from "../../ConnectWallet";
import createFlow from "../../CreateFlow";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import onlineConnected from "../img/onlineConnected.png";
import joinEventPng from "../img/joinEventPng.png";


const SingleCompanyCard = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const connect = async () => {
    const connected = await connectWallet();
    if (connected) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  };
  const joinEvent = async () => {
    const isStarted = await createFlow();
	// const isStarted = true;
    if (isStarted) {
      setIsJoined(true);
	  toast.success("Registration Successful, Money Is Streaming!")
    } else {
		toast.error("Failed to join the event")
      setIsJoined(false);
    }
  };

  const {
    imageUrl,
    companyName,
    country,
    date,
    description,
    location,
    name,
    price,
  } = eventInfo[0].eventInfo;

  return (
    <section className="singleCompanyCardContainer">
		<ToastContainer />
      <section className="card-custom singleCompanyCard">
        <img className="cardImg" src={imageUrl} alt="Image Event Page" />
        <h3>
          {name} by {companyName}
        </h3>
        <section className="cardFeaturedSection">
          <p>{date} </p>
          <p>{price} </p> 
          <p>{country} </p>
        </section>
        <p>{description}</p>
        <p>{location}</p>

        {isConnected ? (
          <section className="metamaskButtonContainer">
            {isJoined ? (
              <Link to="/booktickets" className="homeButton">
                <button className="custom-btn btn-16 buttonContainer">
                <img className="joinEvent" src={joinEventPng}
				alt="Join now! Event is live" />
                  <span>
                    Enter Into Event
                    </span>
                  </button>
              </Link>
            ) : (
              
              <button className="custom-btn btn-16" onClick={joinEvent}>
                Book Your Pass
              </button>
            )}
            <button className="custom-btn btn-16 buttonContainer" disable>
              <img className="OnlineImg" src={onlineConnected}
				alt="Successful, walled connected" />
              <span>Wallet Connected</span>
            </button>
          </section>
        ) : (
          <button className="custom-btn btn-16" onClick={connect}>
            Connect Wallet
          </button>
        )}
      </section>
      {isConnected ? (
        <section className="card-custom singleCompanyCardCenter">
          <div>
            <section className="cardFeaturedSection">
              <p>{date} </p>
              <p>{price} </p>
              <p>{country} </p>
            </section>
            <h2>Register For the Event {name}</h2>
            <div>
              <form className="form" onSubmit={(e) => Submit(e)}>
                <input placeholder="Your Name" name="Name" type="text" />
                <input placeholder="Your Email" name="Email" type="text" />
                <input placeholder="+91 XXXXXXXXXX" name="Phone" type="text" />
                <input placeholder="Need Help" name="Subject" type="text" />
                <input placeholder="Your Message" name="Message" type="text" />
                <input name="Name" type="submit" value="Book Your Pass"/>
              </form>
            </div>
          </div>
        </section>
      ) : null}
    </section>
  );
};

export default SingleCompanyCard;
