import { useEffect, useRef, useState } from 'react'

type AnimatedNumberProps = {
  value: number
  duration?: number
  formatter?: (_val: number) => React.ReactNode
}

export const AnimatedNumber = ({
  value,
  duration = 3000,
  formatter = (val) => val.toFixed(0),
}: AnimatedNumberProps) => {
  const [displayValue, setDisplayValue] = useState(0)
  const startValue = useRef(0)
  const startTime = useRef<number | null>(null)
  const raf = useRef<number>(0)

  useEffect(() => {
    startValue.current = displayValue
    startTime.current = null

    const animate = (time: number) => {
      if (!startTime.current) startTime.current = time
      const elapsed = time - startTime.current
      const progress = Math.min(elapsed / duration, 1)
      const current =
        startValue.current + (value - startValue.current) * progress
      setDisplayValue(current)
      if (progress < 1) raf.current = requestAnimationFrame(animate)
    }

    raf.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf.current!)
  }, [value, duration])

  return <>{formatter(displayValue)}</>
}
