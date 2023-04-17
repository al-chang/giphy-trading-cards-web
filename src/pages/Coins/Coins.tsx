import { useEffect, useRef, useState } from "react";
import { collectCoins, getCoins } from "../../services/userService";

import "./index.css";

// Credit to https://medium.com/@victortoschi/how-to-create-a-slot-machine-animation-with-css-and-javascript-9073ab9db9ea
// For slot machine inspiration

const Coins = () => {
  const [canCollect, setCanCollect] = useState(false);
  const coinsCollectedRef = useRef(0);

  const slotOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const onCollect = async () => {
    const coins = await collectCoins();
    setCanCollect(false);
    coinsCollectedRef.current = coins;
  };

  function shuffle([...arr], i: number) {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    arr[arr.length - 1] = Math.floor(
      (coinsCollectedRef.current / Math.pow(10, i)) % 10
    );
    return arr;
  }

  async function spin() {
    init(false, 1, 2);

    const slotsContainers = document.querySelectorAll(".Coins__slot");

    for (const door of slotsContainers) {
      const boxes = door.querySelector(".Coins__slot_inner")!;
      const duration = parseInt(
        (boxes as HTMLElement).style.transitionDuration
      );
      (boxes as HTMLElement).style.transform = "translateY(0)";
      await new Promise((resolve) => setTimeout(resolve, duration * 100));
    }
  }

  const init = (firstInit: boolean, groups: number, duration: number) => {
    const slotsContainers = document.querySelectorAll(".Coins__slot");
    let i = 2;

    for (const slot of slotsContainers) {
      const slots = slot.querySelector(".Coins__slot_inner")!;
      const slotsClone = slots.cloneNode(false) as HTMLElement;
      const pool = ["1"];

      if (firstInit) {
        (slot as HTMLElement).dataset.spinned = "0";
      } else if ((slot as HTMLElement).dataset.spinned === "1") {
        return;
      }

      if (!firstInit) {
        const arr = [];
        for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
          arr.push(...slotOptions);
        }
        pool.push(...shuffle(arr, i));
        i -= 1;

        slotsClone.addEventListener(
          "transitionstart",
          function () {
            (slot as HTMLElement).dataset.spinned = "1";
          },
          { once: true }
        );
      }

      for (let i = pool.length - 1; i >= 0; i--) {
        const box = document.createElement("div");
        box.classList.add("Coins__slot_option");
        box.style.width = slot.clientWidth + "px";
        box.style.height = slot.clientHeight + "px";
        box.textContent = pool[i];
        slotsClone.appendChild(box);
      }
      slotsClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
      slotsClone.style.transform = `translateY(-${
        slot.clientHeight * (pool.length - 1)
      }px)`;
      slot.replaceChild(slotsClone, slots);
    }
  };

  // Determine if a user can collect coins
  useEffect(() => {
    const getData = async () => {
      const res = await getCoins();
      const lastCollected = new Date(res.lastCollected);
      const today = new Date();
      const canCollect =
        lastCollected.getDate() !== today.getDate() &&
        lastCollected.getMonth() !== today.getMonth() &&
        lastCollected.getFullYear() !== today.getFullYear();
      setCanCollect(canCollect);
    };
    getData();
  }, []);

  // Set up slots
  useEffect(() => {
    init(true, 1, 1);
  }, []);

  return (
    <>
      <div id="Coins__slots_container">
        <div className="Coins__slot">
          <div className="Coins__slot_inner">
            <div className="Coins__slot_option"></div>
          </div>
        </div>
        <div className="Coins__slot">
          <div className="Coins__slot_inner">
            <div className="Coins__slot_option"></div>
          </div>
        </div>
        <div className="Coins__slot">
          <div className="Coins__slot_inner">
            <div className="Coins__slot_option"></div>
          </div>
        </div>
      </div>
      <button
        onClick={async () => {
          await onCollect();
          spin();
        }}
      >
        Spin
      </button>
    </>
  );
};

export default Coins;
