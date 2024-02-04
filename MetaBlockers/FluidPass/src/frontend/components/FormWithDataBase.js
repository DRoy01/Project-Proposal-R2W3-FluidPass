import { useState } from "react";
import connectWallet from "../../ConnectWallet";
import onlineConnected from "../img/onlineConnected.png";

export default function FormWithDataBase() {
  const [isConnected, setIsConnected] = useState(false);

  const connect = async () => {
    const connected = await connectWallet();
    if (connected) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  };
  function Submit(e) {
    e.preventDefault();
    const formEle = document.querySelector("form");
    const formDatab = new FormData(formEle);
    fetch(
      "https://script.google.com/macros/s/AKfycbwTajVy00E45EVwQH5SEOXAJUZFPZ-axFgJ0hqrMyu87GBYXs1a7_0XNAxlpocXAZrGzA/exec",
      {
        method: "POST",
        body: formDatab,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <section className="formWithDataBase">

        <section className="part1RegisterPage">

      <h2 className="headingTextForRegisterPage">
        Showcase your events in FluidPass Network
      </h2>
      {isConnected ? <></> :
        <>
      <h3 className="paragraph1TextForRegisterPage">
        Watch the video and connect your wallet to submit the form.
      </h3>
      <iframe width="980" height="430" src="https://www.youtube.com/embed/4KLNw7OUTSk?si=FilB5NnTMf-mqu5a" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </>
      }
        </section>
        <section className="part2RegisterPage">
      {isConnected ?
      <button className="custom-btn btn-16 buttonContainer marBtn" disable>
      <img className="OnlineImg" src={onlineConnected}
alt="Successful, walled connected" />
      <span>Wallet Connected</span>
    </button>: 
      <button className="custom-btn btn-16 buttonContainer marBtn" onClick={connect}>Connect Wallet</button>}
	  {isConnected ? <div>
      <h2 className="paragraph2TextForRegisterPage">Fill the details and submit the form.</h2>
        <form className="form" onSubmit={(e) => Submit(e)}>
          <input placeholder="Your Name" name="Name" type="text" />
          <input placeholder="Your Email" name="Email" type="text" />
          <input placeholder="+91 XXXXXXXXXX" name="Phone" type="text" />
          <input
            placeholder="Need to register event"
            name="Subject"
            type="text"
          />
          <input placeholder="Your Message" name="Message" type="text" />
          <input name="Name" type="submit" />
        </form>
      </div> : null}
      </section>
    </section>
  );
}
