export function getTimeRange(interval) {
  const range = []
  // Convert start and end times to Date objects
  const start = new Date('2022-12-30T07:00:00')
  const end = new Date('2022-12-30T21:00:00')

  // Set the current time to the start time
  let currentTime = start

  // Loop through the range of times, adding each time to the array
  while (currentTime <= end) {
    range.push(currentTime)
    currentTime = new Date(currentTime.getTime() + interval * 60 * 1000)
  }

  return range.map(t => String(t).slice(16, 21))
}

// // Example usage:
// const interval = 30 // 30 minutes

// const timeRange = getTimeRange(interval)
// console.log(timeRange)
