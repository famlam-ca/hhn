export const LoadingSkeletong = () => {
  return (
    <div className="flex h-[calc(100vh-3rem)] flex-col items-center justify-center space-y-4">
      <div className="flex space-x-2">
        <div className="h-8 w-8 animate-bounce rounded-full bg-text [animation-delay:-0.3s]" />
        <div className="h-8 w-8 animate-bounce rounded-full bg-text [animation-delay:-0.15s]" />
        <div className="h-8 w-8 animate-bounce rounded-full bg-text" />
      </div>
      <div className="flex flex-col text-center sm:flex-row">
        <p className="text-4xl">Loading data...</p>
        <p className="ml-0 text-4xl sm:ml-2">Please wait!</p>
      </div>
    </div>
  )
}
