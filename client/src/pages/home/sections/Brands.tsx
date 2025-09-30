import versaceLogo from '../../../assets/images/brands/Versace.png'
import zaraLogo from '../../../assets/images/brands/Zara.png'
import gucciLogo from '../../../assets/images/brands/Gucci.png'
import pradaLogo from '../../../assets/images/brands/Prada.png'
import calvinKleinLogo from '../../../assets/images/brands/CalvinKlein.png'

const Brands = () => {
  const brands = [
    { name: 'Versace', logo: versaceLogo },
    { name: 'Zara', logo: zaraLogo },
    { name: 'Gucci', logo: gucciLogo },
    { name: 'Prada', logo: pradaLogo },
    { name: 'Calvin Klein', logo: calvinKleinLogo },
  ]

  return (
    <section className="py-12 bg-black">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between gap-8">
          {brands.map((brand) => (
            <div key={brand.name} className="flex-1 flex justify-center">
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-6 object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity duration-200"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Brands