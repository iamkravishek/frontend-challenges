import './App.css'
import FeedsPage from './features/feed/components/FeedsPage'
import Footer from './shared/components/Footer'
import Header from './shared/components/Header'

function App() {

  return (
            <section className="w-full h-full bg-gray-100">
            <Header name='Infinite Scroll (Intersection Observer)'></Header>
                <FeedsPage />
            <Footer></Footer>
        </section>

  )
}

export default App
