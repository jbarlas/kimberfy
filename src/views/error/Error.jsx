import React from 'react'
import { useRouteError } from 'react-router-dom'

export default function Error() {
    const error = useRouteError()
    console.log("Error:", error)
  return (
    <div>Oops! Please refresh and try again!</div>
  )
}
