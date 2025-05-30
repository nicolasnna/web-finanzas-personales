import { useEffect, useState } from "react"

type NumberWithPosition = {
  id: number,
  value: number,
  top: number,
  left: number,
  rotate: number,
  size: number
}

const BackgroundNumbers = () => {
  const [numbers, setNumbers] = useState<NumberWithPosition[]>([])

  const generateRandomNumberWithPosition  = () => ({
    id: Math.random(),
    value: Math.floor(Math.random() * 100),
    top: Math.random() * 150,
    left: Math.random() * 100,
    rotate: Math.floor(Math.random() * 90)-45,
    size: Math.floor(Math.random() * 8) + 22
  })

  useEffect(() => {
    const totalNumbers = 75
    const initialNumbers = Array.from({ length: totalNumbers }, () => generateRandomNumberWithPosition ())
    setNumbers(initialNumbers)

    const interval = setInterval(() => {
      const numbers = Array.from({ length: totalNumbers }, () => generateRandomNumberWithPosition ())
      setNumbers(numbers)
    }, 30*1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-0 h- w-full overflow-hidden">
      {numbers.map(({ id, value, top, left, rotate, size}) => (
        <div
          key={id} 
          className="absolute animate-moveRandom opacity-25"
          style={{
            top: `${top}vh`, // Mantener la posición inicial
            left: `${left}vw`, // Mantener la posición inicial
            animationDuration: `${Math.random() * 20 + 10}s`, // Duración aleatoria
            animationDelay: `${Math.random() * 1}s`, // Retraso inicial aleatorio
            rotate: `${rotate}deg`,
            fontSize: `${size}px`,
            userSelect: "none",
          }}
        >
          {value}
        </div>
      ))}
    </div>
  )
}

export default BackgroundNumbers