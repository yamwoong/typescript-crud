import type React from "react"

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-600 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <img src="/images/logo.png" alt="Pine Needles" className="h-8 mb-2" />
            <p className="text-sm">© {new Date().getFullYear()} Pine Needles. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-200 transition-colors">
              About
            </a>
            <a href="#" className="hover:text-blue-200 transition-colors">
              Contact
            </a>
            <a href="#" className="hover:text-blue-200 transition-colors">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
