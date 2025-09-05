export default function Testimonials() {
  const testimonials = [
    {
      name: "Maria Rodriguez",
      restaurant: "Casa Elena - Springfield, MA",
      quote: "MenuSparks saved me 6 hours every week and increased our special sales by 40%. The creative recipes have transformed how we use our inventory.",
      avatar: "👩‍🍳"
    },
    {
      name: "James Chen", 
      restaurant: "Pacific Fusion - San Francisco, CA",
      quote: "Finally, someone who understands restaurant operations. The specials work with our equipment and our customers love the variety. Game changer.",
      avatar: "👨‍🍳"
    },
    {
      name: "Tony Martinelli",
      restaurant: "Tony's Italian Kitchen - Boston, MA", 
      quote: "These aren&apos;t just recipes - they&apos;re business solutions. Every special comes with detailed instructions and scaling guides. Our customers love the variety and creativity.",
      avatar: "👨‍🍳"
    },
    {
      name: "Sarah Williams",
      restaurant: "The Garden Bistro - Hartford, CT",
      quote: "The social media content alone is worth the subscription. Our Instagram engagement tripled and we&apos;re seeing new customers from the posts.",
      avatar: "👩‍🍳"
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Restaurant Owners Love MenuSparks
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hundreds of restaurant owners have already eliminated special stress 
            while boosting their creativity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
              <div className="flex items-start mb-4">
                <div className="text-4xl mr-4">{testimonial.avatar}</div>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-blue-600 text-sm">{testimonial.restaurant}</p>
                </div>
              </div>
              
              <blockquote className="text-gray-700 italic mb-4">
                &quot;{testimonial.quote}&quot;
              </blockquote>

              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-xl p-8 shadow-lg border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">6 hours</div>
              <div className="text-gray-600">Average weekly time saved</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">35%</div>
              <div className="text-gray-600">Customer satisfaction increase</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">48 hours</div>
              <div className="text-gray-600">Typical delivery time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}