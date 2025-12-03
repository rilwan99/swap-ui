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
    <div className="mb-6 p-4 bg-destructive/10 border-2 border-destructive/30 rounded-lg text-destructive text-sm font-medium backdrop-blur-sm animate-in fade-in slide-in-from-top-2 duration-300">
      {error}
    </div>
  )
}
