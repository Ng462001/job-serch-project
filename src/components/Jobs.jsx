import { useEffect, useState } from "react"
import JobAllSection from "./JobAllSection"
import JobSideBar from "./JobSideBar"
import Navbar from "./Navbar"
import Cookies from "js-cookie"
import ScrollToTop from "./ScrollToTop"
import "../css/jobs.css"

const Jobs = () => {
  const [allValues, setValues] = useState({
    jobsArr: [],
    empType: [],
    minPackage: "",
    serachIn: ""
  })
  const [loading, setLoading] = useState(false)
  const [emaptyData, setEmptyData] = useState(0)

  useEffect(() => {

    const token = Cookies.get("jwt-token");

    const fetchJobs = async () => {

      const { empType, minPackage, serachIn } = allValues;

      const api = `https://apis.ccbp.in/jobs?employment_type=${empType}&minimum_package=${minPackage}&search=${serachIn}`;

      const options = {
        method: "Get",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      try {
        setLoading(true);
        const response = await fetch(api, options);
        const data = await response.json();
        if (response.ok === true) {
          setEmptyData(data.jobs.length);
          setValues({ ...allValues, jobsArr: data.jobs });
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchJobs();

  }, [allValues.serachIn, allValues.empType, allValues.minPackage]);

  const getUserIn = (e) => {

    if (e.key === "Enter") {
      setValues({ ...allValues, serachIn: e.target.value });
    }
    if (e.target.value === "") {
      setValues({ ...allValues, serachIn: "" });
    }
  }

  const handleChangeEmpType = (e) => {
    const { value, checked } = e.target
    if (checked) {
      setValues({ ...allValues, empType: [...allValues.empType, value] })
    } else {
      setValues({ ...allValues, empType: allValues.empType.filter(eachType => eachType !== value) })
    }
  }

  const handleChangeSalary = (e) => {
    setValues({ ...allValues, minPackage: e.target.value });
  }

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <div className="container mt-3">
        <div className="row">
          <div className="col-12 col-lg-4 col-md-5 p-3">
            <JobSideBar changeEmpType={handleChangeEmpType} changeSalary={handleChangeSalary} />
          </div>
          <div className="col-12 col-lg-8 col-md-7 p-3">
            <input onKeyUp={getUserIn} type="search" className='form-control w-100 mb-3' placeholder='Please enter you job' />
            {loading ?
              <div className='d-flex justify-content-center align-items-center h-75'>
                <div className='loader'></div>
              </div>
              :
              emaptyData === 0 ?
                <div className='d-flex flex-column justify-content-center align-items-center h-75'>
                  <img src="/images/no-jobs-found.png" alt="images" className='w-50' />
                  <h2 className='text-primary fw-bold text'>No Jobs Found</h2>
                </div>
                :
                allValues.jobsArr.map(eachJob => <JobAllSection key={eachJob.id} jobsItem={eachJob} />)
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Jobs

