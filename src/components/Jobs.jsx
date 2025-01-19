import { useEffect, useState } from "react"
import JobAllSection from "./JobAllSection"
import JobSideBar from "./JobSideBar"
import Navbar from "./Navbar"
import Cookies from "js-cookie"
import ScrollToTop from "./ScrollToTop"

const Jobs = () => {
  const [allValues, setValues] = useState({
    jobsArr: [],
    empType: [],
    minPackage: "",
    serachIn: ""
  })
  const [loading, setLoading] = useState(false)

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
          setLoading(false);
          setValues({ ...allValues, jobsArr: data.jobs });
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

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <div className="container mt-3">
        <div className="row">
          <div className="col-4 p-3">
            <JobSideBar changeEmpType={setValues} values={allValues} />
          </div>
          <div className="col-8 p-3">
            <input onKeyUp={getUserIn} type="search" className='form-control w-100 mb-3' placeholder='Please enter you job' />
            {loading ?
              <div className='d-flex justify-content-center align-items-center h-75'>
                <div className='loader'></div>
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
