
import React from 'react'
import { Progress } from "@/components/ui/progress"

const ProgressBar = () => {
   const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return <Progress value={progress} className="w-full bg-[#760BFF]" />
}

export default ProgressBar



export const ProgressBar2 =()=>{
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return <Progress value={progress} className="w-full bg-[#0B5EFF]" />

}

export const ProgressBar3 =()=>{
  const [progress, setProgress] = React.useState(13)

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return <Progress value={progress} className="w-full bg-[#FF6812]" />

}

