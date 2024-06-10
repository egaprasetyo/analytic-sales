import { useEffect } from 'react'
import SalesChart from './components/SalesChart'
import SalesTable from './components/SalesTable'

function App() {

  useEffect(() => {
    document.title = 'Sales Analytics Dashboard'
  }, [])

  return (
    <main className='min-h-screen px-10 py-20 sm:px-20 md:px-40 bg-[#F1F5F9] flex flex-col gap-8'>
      <h1 className='mb-5 text-3xl font-bold text-center text-gray-800'>Sales Analytics Dashboard</h1>
      <SalesChart />
      <SalesTable />
    </main>
  )
}

export default App
