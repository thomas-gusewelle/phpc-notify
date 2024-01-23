'use client'
import { webSocketContext } from "@/providers/webSocket";
import { useContext, useEffect, useState } from "react";

const StatusPage = () => {
  const context = useContext(webSocketContext);
  const [time, setTime] = useState("")

  useEffect(() => {
    const UpdateTime = () => {
      setTime(new Date().toLocaleTimeString())
    }
    setInterval(UpdateTime)
  }, [])
  //
  //
  //  useEffect(() => {
  //    console.log(context?.data);
  //
  //  }, [context?.data])
  // 
  // if (!context) {
  //   return <></>
  // }
  //
  // if (context.data.type = "NONE") {
  // }
  //
  //

  function formatTime(d: Date | undefined) {
    if (d == undefined) {
      return 
    }
    return d.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
  }


  return <div className="min-h-screen flex items-center justify-center">

    {context?.data.type == "NONE" ?
      <h1 className="text-8xl font-bold">{time}</h1>
      :
      <div className="flex flex-col gap-36">
        <div className="flex flex-col items-center justify center gap-3">
          <h3 className="text-2xl">{context?.data.type == "ON THE WAY" ? "Preacher is:" : "Preacher"}</h3>
          <h1 className="text-8xl font-bold">{context?.data.type}</h1>
          <p className="text-2xl font-semibold">{`at: ${formatTime(context?.data.time)}`}</p>
        </div>
        <h1 className="text-3xl font-bold text-center">{time}</h1>
      </div>

    }
  </div>
}

export default StatusPage;
