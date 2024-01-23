'use client'
import { PastorData, webSocketContext } from "@/providers/webSocket"
import { useContext } from "react"

const NotifyPage = () => {
  const context = useContext(webSocketContext)

  function updateStatus(data: PastorData) {
    const json = JSON.stringify(data);
    context?.webSocket?.send(json);
  }

  return <div>
    <div className={"flex flex-col justify-center items-center"}>
      <h1 className="text-2xl">Current Status:</h1>
      <h3 className="text-xl font-bold">{context?.data.type}</h3>
    </div>
    <div className="flex flex-col gap-6 mt-12">
      <button onClick={() => updateStatus({ type: "NONE", time: new Date() })} className="text-white bg-neutral-600 px-6  py-3 rounded-xl">Reset</button>
      <button onClick={() => updateStatus({ type: "ON THE WAY", time: new Date() })} className="text-white bg-indigo-600 px-6  py-3 rounded-xl">On the Way</button>
      <button onClick={() => updateStatus({ type: "ARRIVED", time: new Date() })} className="text-white bg-green-700 px-6  py-3 rounded-xl">Arrived</button>
    </div>
  </div>
}

export default NotifyPage
