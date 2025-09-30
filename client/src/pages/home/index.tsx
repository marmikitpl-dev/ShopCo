import Hero from './sections/Hero'
import Brands from './sections/Brands'
import NewArrivals from './sections/NewArrivals'
import TopSelling from './sections/TopSelling'
import Newsletter from '../../components/Newsletter'
import Footer from '../../components/layout/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <Brands />
      <NewArrivals />
      <TopSelling />
      <Newsletter />
      <Footer />
    </main>
  )
}


