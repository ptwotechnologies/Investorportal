import React from 'react'
import { Progress } from "@/components/ui/progress"

const ProgressBar = ({ percentage = 0 }) => {
  return <Progress value={percentage} className="w-full h-2 bg-white border border-gray-400" indicatorClassName="bg-[#760BFF]" />
}

export default ProgressBar

export const ProgressBar2 = ({ percentage = 0 }) => {
  return <Progress value={percentage} className="w-full h-2 bg-white border border-gray-400" indicatorClassName="bg-[#0B5EFF]" />
}

export const ProgressBar3 = ({ percentage = 0 }) => {
  return <Progress value={percentage} className="w-full h-2 bg-white border border-gray-400" indicatorClassName="bg-[#FF6812]" />
}
