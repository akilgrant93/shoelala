import { useRouter } from 'next/router'
import {useState, useEffect} from 'react'

const Shoe = () => {
  const [shoe, setShoe] = useState([])
  const router = useRouter()
  useEffect(() => {
    setShoe(router.query.id)
  }, [])

  return <p>Shoe: {shoe}</p>
}

export default Shoe
