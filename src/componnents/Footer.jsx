import {FaGithub} from 'react-icons/fa'
const footerYear = new Date().getFullYear()
function footer() {
  return (
    <footer className='footer p-10 bg-gray-700 text-slate-200 text-primary-content footer-center ' >
    <FaGithub className='inline-block w-10 h-10'/>
    <div>
    <p> copyrigh &copy; {footerYear} all right reserved</p>
    </div>
    </footer>
  )
}

export default footer