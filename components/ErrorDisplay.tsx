/**
 * ErrorDisplay component for showing error messages
 */

interface ErrorDisplayProps {
  error: string
}

export const ErrorDisplay = ({ error }: ErrorDisplayProps) => {
  if (!error) {
    return null
  }

  return (
    <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
      {error}
    </div>
  )
}
