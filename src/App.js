import React from "react";
import "./styles.css";
import toast, { useToaster } from "react-hot-toast";

const Notifications = () => {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause, calculateOffset, updateHeight } = handlers;
  return (
    <div
      style={{
        position: "fixed",
        top: 8,
        left: 8
      }}
      onMouseEnter={startPause}
      onMouseLeave={endPause}
    >
      {toasts.map((toast) => {
        const offset = calculateOffset(toast.id, {
          reverseOrder: false,
          margin: 8
        });
        const ref = (el) => {
          if (el && !toast.height) {
            const height = el.getBoundingClientRect().height;
            updateHeight(toast.id, height);
          }
        };
        return (
          <div
            key={toast.id}
            ref={ref}
            style={{
              position: "absolute",
              width: "200px",
              background: "papayawhip",
              transition: "all 0.5s ease-out",
              opacity: toast.visible ? 1 : 0,
              transform: `translateY(${offset}px)`
            }}
          >
            {toast.message}
          </div>
        );
      })}
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <Notifications />
      <button onClick={() => toast("Hello World!")}>Add Toast</button>
    </div>
  );
}
