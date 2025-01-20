import Navbar from "./Navbar"
import '../css/home.css'
import { NavLink } from "react-router-dom"

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="slider-area">
        <div className="slider-active">
          <div className="single-slider slider-height d-flex align-items-center" style={{ backgroundImage: `url(/images/hero.jpg)` }}>
            <div className="container">
              <div className="row">
                <div className="col-xl-6 col-lg-9 col-md-10">
                  <div className="hero__caption">
                    <h1 className="">Find the most exciting startup jobs</h1>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-8">
                  <div className="find-job">
                    <NavLink to="/jobs" className="btn btn-primary mt-2" style={{width:"100px"}}> Find Jobs</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home

